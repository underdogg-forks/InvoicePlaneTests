```
tests/
├── clients/
│   └── clients.test.js
│   └── guest.test.js
│   └── user_clients.test.js
├── core/
│   └── custom_fields.test.js
│   └── custom_values.test.js
│   └── dashboard.test.js
│   └── email_templates.test.js
│   └── import.test.js
│   └── layout.test.js
│   └── mailer.test.js
│   └── reports.test.js
│   └── sessions.test.js
│   └── settings.test.js
│   └── tax_rates.test.js
│   └── upload.test.js
│   └── users.test.js
├── invoices/
│   └── invoice_groups.test.js
│   └── invoices.test.js
├── payments/
│   └── payment_methods.test.js
│   └── payments.test.js
├── products/
│   └── families.test.js
│   └── products.test.js
│   └── units.test.js
├── projects/
│   └── projects.test.js
│   └── tasks.test.js
└── quotes/
    └── quotes.test.js
```

# Setup and Testing

Before running tests, make sure to:

1. Install all dependencies:
   ```sh
   npm install
   ```
2. Copy the example Jest config:
   ```sh
   cp jest.config.js.example jest.config.js
   ```
3. Ensure you have `jest-playwright-preset` installed:
   ```sh
   npm install --save-dev jest-playwright-preset
   ```

You can then run the test suite with:
```sh
npx jest
```
