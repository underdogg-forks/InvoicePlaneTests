const {chromium} = require('playwright');
const fs = require('fs');
const path = require('path');

class DemoRecorder {
    constructor(baseUrl, options = {}) {
        this.baseUrl = baseUrl;
        this.discoveredRoutes = new Set();
        this.networkRequests = [];
        this.pageVisits = [];
        this.domain = new URL(baseUrl).hostname;
        this.startTime = new Date();
        this.outputDir = options.outputDir || './demo-recording';
        this.sessionName = options.sessionName || `demo-${new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-')}`;

        // Create output directory
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, {recursive: true});
        }
    }

    async startRecording() {
        console.log(`Starting demo recording session: ${this.sessionName}`);
        console.log(`Output will be saved to: ${path.join(this.outputDir, this.sessionName)}`);
        console.log(`Monitoring domain: ${this.domain}`);
        console.log(`Started at: ${this.startTime.toLocaleString()}\n`);

        const browser = await chromium.launch({
            headless: false,
            slowMo: 50 // Slight delay for better visibility
        });

        const context = await browser.newContext({
            // Optional: Add authentication, viewport size, etc.
            viewport: {width: 1280, height: 720}
        });

        const page = await context.newPage();

        // Set up network monitoring
        page.on('request', (request) => {
            this.recordRequest(request);
        });

        page.on('response', (response) => {
            this.recordResponse(response);
        });

        // Track page navigations
        page.on('framenavigated', (frame) => {
            if (frame === page.mainFrame()) {
                this.recordPageVisit(frame.url());
            }
        });

        // Navigate to starting URL
        await page.goto(this.baseUrl);

        console.log(`Browser opened at: ${this.baseUrl}`);
        console.log(`Recording network activity...`);
        console.log(`Perform your demo now. Press Ctrl+C when finished.\n`);

        // Keep the script alive and show periodic updates
        this.startPeriodicUpdates();

        // Handle graceful shutdown
        process.on('SIGINT', async () => {
            console.log('\n\nStopping recording...');
            await this.stopRecording();
            await browser.close();
            process.exit(0);
        });

        // Keep the process alive
        return new Promise(() => {
        });
    }

    recordRequest(request) {
        const requestUrl = request.url();

        try {
            const parsedUrl = new URL(requestUrl);

            // Only record requests to your domain (or related domains)
            if (this.shouldRecordUrl(parsedUrl)) {
                const timestamp = new Date();
                const route = {
                    timestamp: timestamp.toISOString(),
                    timeFromStart: timestamp - this.startTime,
                    method: request.method(),
                    url: requestUrl,
                    path: parsedUrl.pathname,
                    query: parsedUrl.search,
                    resourceType: request.resourceType(),
                    headers: request.headers(),
                    postData: request.postData() || null
                };

                this.networkRequests.push(route);
                this.discoveredRoutes.add(`${route.method} ${route.path}`);

                // Real-time console output for important requests
                if (route.resourceType === 'document' || route.resourceType === 'xhr' || route.resourceType === 'fetch') {
                    console.log(`${route.method} ${route.path} ${route.query ? '?' + route.query.substring(1) : ''}`);
                }
            }
        } catch (error) {
            // Skip invalid URLs
        }
    }

    recordResponse(response) {
        const responseUrl = response.url();

        try {
            const parsedUrl = new URL(responseUrl);

            if (this.shouldRecordUrl(parsedUrl)) {
                const status = response.status();
                const method = response.request().method();

                // Log errors or interesting status codes
                if (status >= 400) {
                    console.log(`${status} ${method} ${parsedUrl.pathname}`);
                } else if (status >= 300 && status < 400) {
                    console.log(`${status} ${method} ${parsedUrl.pathname}`);
                }
            }
        } catch (error) {
            // Skip invalid URLs
        }
    }

    recordPageVisit(url) {
        try {
            const parsedUrl = new URL(url);
            if (parsedUrl.hostname === this.domain) {
                const visit = {
                    timestamp: new Date().toISOString(),
                    url: url,
                    path: parsedUrl.pathname,
                    query: parsedUrl.search
                };

                this.pageVisits.push(visit);
                console.log(`Page: ${visit.path}${visit.query}`);
            }
        } catch (error) {
            // Skip invalid URLs
        }
    }

    shouldRecordUrl(parsedUrl) {
        // Record if it's your main domain
        if (parsedUrl.hostname === this.domain) {
            return true;
        }

        // Optional: Record API calls to related domains
        // if (parsedUrl.hostname.includes('api.yourdomain.com')) {
        //     return true;
        // }

        return false;
    }

    startPeriodicUpdates() {
        this.updateInterval = setInterval(() => {
            const elapsed = Math.floor((new Date() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;

            console.log(`\n Recording Status (${minutes}:${seconds.toString().padStart(2, '0')})`);
            console.log(`   Routes discovered: ${this.discoveredRoutes.size}`);
            console.log(`   Total requests: ${this.networkRequests.length}`);
            console.log(`   Pages visited: ${this.pageVisits.length}`);
            console.log(`   Continue demo or press Ctrl+C to finish...\n`);
        }, 10000); // Update every 30 seconds
    }

    async stopRecording() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        const endTime = new Date();
        const duration = endTime - this.startTime;

        console.log(`Recording duration: ${Math.floor(duration / 60000)}:${Math.floor((duration % 60000) / 1000).toString().padStart(2, '0')}`);

        this.saveResults(endTime, duration);
    }

    saveResults(endTime, duration) {
        const sessionDir = path.join(this.outputDir, this.sessionName);
        if (!fs.existsSync(sessionDir)) {
            fs.mkdirSync(sessionDir, {recursive: true});
        }

        // Save discovered routes (clean list)
        const routesFile = path.join(sessionDir, 'discovered-routes.txt');
        const routesList = Array.from(this.discoveredRoutes).sort();
        fs.writeFileSync(routesFile, routesList.join('\n'));

        // Save detailed network requests
        const requestsFile = path.join(sessionDir, 'network-requests.json');
        fs.writeFileSync(requestsFile, JSON.stringify(this.networkRequests, null, 2));

        // Save page visits
        const visitsFile = path.join(sessionDir, 'page-visits.json');
        fs.writeFileSync(visitsFile, JSON.stringify(this.pageVisits, null, 2));

        // Create summary report
        const summaryFile = path.join(sessionDir, 'demo-summary.txt');
        const summary = this.generateSummaryReport(endTime, duration, routesList);
        fs.writeFileSync(summaryFile, summary);

        // Create CSV for easy analysis
        const csvFile = path.join(sessionDir, 'routes-summary.csv');
        this.generateRoutesCSV(csvFile);

        console.log(`\nDemo recording saved!`);
        console.log(`Location: ${sessionDir}`);
        console.log(`Files generated:`);
        console.log(`   • discovered-routes.txt (${routesList.length} routes)`);
        console.log(`   • network-requests.json (${this.networkRequests.length} requests)`);
        console.log(`   • page-visits.json (${this.pageVisits.length} visits)`);
        console.log(`   • demo-summary.txt`);
        console.log(`   • routes-summary.csv`);
    }

    generateSummaryReport(endTime, duration, routesList) {
        const methodCounts = {};
        const pathCounts = {};

        this.networkRequests.forEach(req => {
            methodCounts[req.method] = (methodCounts[req.method] || 0) + 1;
            pathCounts[req.path] = (pathCounts[req.path] || 0) + 1;
        });

        return [
            `Demo Recording Summary`,
            `=====================`,
            `Session: ${this.sessionName}`,
            `Domain: ${this.domain}`,
            `Start Time: ${this.startTime.toLocaleString()}`,
            `End Time: ${endTime.toLocaleString()}`,
            `Duration: ${Math.floor(duration / 60000)}:${Math.floor((duration % 60000) / 1000).toString().padStart(2, '0')}`,
            ``,
            `Statistics:`,
            `- Unique Routes: ${routesList.length}`,
            `- Total Requests: ${this.networkRequests.length}`,
            `- Pages Visited: ${this.pageVisits.length}`,
            ``,
            `HTTP Methods:`,
            ...Object.entries(methodCounts).map(([method, count]) => `- ${method}: ${count}`),
            ``,
            `Most Accessed Paths:`,
            ...Object.entries(pathCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .map(([path, count]) => `- ${path} (${count} times)`),
            ``,
            `All Discovered Routes:`,
            `=====================`,
            ...routesList
        ].join('\n');
    }

    generateRoutesCSV(csvFile) {
        const csvRows = [
            'Method,Path,Query,First Seen,Times Accessed,Resource Types'
        ];

        const routeStats = {};

        this.networkRequests.forEach(req => {
            const key = `${req.method} ${req.path}`;
            if (!routeStats[key]) {
                routeStats[key] = {
                    method: req.method,
                    path: req.path,
                    firstSeen: req.timestamp,
                    count: 0,
                    resourceTypes: new Set(),
                    queries: new Set()
                };
            }
            routeStats[key].count++;
            routeStats[key].resourceTypes.add(req.resourceType);
            if (req.query) routeStats[key].queries.add(req.query);
        });

        Object.values(routeStats).forEach(stats => {
            const row = [
                stats.method,
                `"${stats.path}"`,
                `"${Array.from(stats.queries).join('; ')}"`,
                stats.firstSeen,
                stats.count,
                `"${Array.from(stats.resourceTypes).join(', ')}"`
            ];
            csvRows.push(row.join(','));
        });

        fs.writeFileSync(csvFile, csvRows.join('\n'));
    }
}

// Usage
async function main() {
    const recorder = new DemoRecorder('http://ivplv1.test', {
        outputDir: './storage/demo',
        sessionName: process.argv[2] || undefined // Optional: pass session name as argument
    });

    await recorder.startRecording();
}

// Run the recorder
main().catch(console.error);
