# InvoicePlane Test Suite

Comprehensive Playwright + Jest test suite for InvoicePlane, an open-source invoicing application.

## Useful new commands:

### Run only create tests across all modules  
npm run test:create

### Run payment tests only
npm run test:payments

### Debug with browser visible and slow motion
npm run test:debug

### Watch your logs in real-time
npm run logs

### Clean up everything including logs
npm run clean

### Run tests with 5-second timeout for debugging
npm run test:timeout

## Project Description

This repository contains automated browser tests for all major InvoicePlane functionality including:
- Client management
- Invoice creation and management
- Payment processing
- Product and inventory management
- Project and task tracking
- Quote generation
- Core system functionality

## Prerequisites

- Node.js 18+ 
- npm or yarn
- InvoicePlane application running and accessible
- Chromium browser (installed automatically with Playwright)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/nielsdrost7/InvoicePlaneTests.git
cd InvoicePlaneTestsInstall dependencies:npm installInstall Playwright browsers:npx playwright install chromiumConfigure your test environment in tests/config.jsConfigurationUpdate tests/config.js with your InvoicePlane instance details:Base URLLogin credentialsTimeout settingsLogout configurationRunning Tests# Run all tests (headless)
npm test

# Run tests with browser visible
npm run test:headed

# Run tests in debug mode (slow, visible)
npm run test:debug

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- clients/clients.test.js

# Run single test in band (no parallel)
npm test -- --runInBandTest FeaturesAutomatic Authentication: Tests automatically log in before runningSession Management: Proper logout and cleanup after testsError Handling: Robust login failure detectionConfigurable Timeouts: All timeouts managed via configDebug Support: URL logging and error reportingTest Structuretests/
├── setup.js             # Sacred authentication setup
├── config.js            # Test configuration
├── clients/             # Client management tests
├── core/                # Core functionality tests
├── invoices/            # Invoice-related tests
├── payments/            # Payment functionality tests
├── products/            # Product management tests
├── projects/            # Project & task tests
├── quotes/              # Quote functionality tests
├── helpers/             # Shared test utilities
└── fixtures/            # Test dataAuthentication FlowThe test suite uses a sophisticated authentication system:Navigates to login pageFills credentials from configSubmits and waits for navigationValidates successful login to dashboardHandles login failures gracefullyLogs out after all tests completeDebuggingWhen tests fail, check:InvoicePlane application is runningLogin credentials in config are correctNetwork connectivity to applicationBrowser console for JavaScript errorsUse npm run test:debug to see tests running in slow motion with browser visible.ContributingPlease read CONTRIBUTING.md for guidelines on:Code style standardsTest writing conventions for PlaywrightPull request process
