# InvoicePlane Test Suite

Comprehensive Jest-based test suite for InvoicePlane, an open-source invoicing application.

## Project Description

This repository contains automated tests for all major InvoicePlane functionality including:
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
- InvoicePlane application running locally or accessible endpoint

## Installation

1. Clone the repository:
```bash
git clone https://github.com/nielsdrost7/InvoicePlaneTests.git
cd InvoicePlaneTestsInstall dependencies:npm installCopy environment configuration:cp .env.example .envUpdate .env with your InvoicePlane instance detailsRunning Tests# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests for CI (no watch, with coverage)
npm run test:ci

# Run specific test file
npm test -- clients/clients.test.js

# Run tests matching pattern
npm test -- --testNamePattern="should create client"Code Quality# Lint all test files
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run formatTest Structuretests/
├── clients/          # Client management tests
├── core/            # Core functionality tests
├── invoices/        # Invoice-related tests
├── payments/        # Payment functionality tests
├── products/        # Product management tests
├── projects/        # Project & task tests
├── quotes/          # Quote functionality tests
├── helpers/         # Shared test utilities
├── fixtures/        # Test data
└── setup.js         # Global test configurationCI/CD IntegrationTests run automatically on:Push to main branchPull requestsScheduled daily runsCoverage reports are generated and badges updated automatically.ContributingPlease read CONTRIBUTING.md for guidelines on:Code style standardsTest writing conventionsPull request processLicense[Add your license here]## CONTRIBUTING.md
```markdown
# Contributing to InvoicePlane Test Suite

## Code Style Guidelines

### General Principles
- Write clear, descriptive test names
- Use consistent naming conventions
- Keep tests focused and atomic
- Follow AAA pattern (Arrange, Act, Assert)

### Test Naming Convention
```javascript
describe('Feature/Module Name', () => {
  describe('when specific condition', () => {
    it('should perform expected behavior', () => {
      // test implementation
    });
  });
});

Code FormattingUse ESLint configuration providedFormat code with Prettier before committingUse 2 spaces for indentationUse single quotes for stringsAdd trailing commas in objects and arraysTest Writing StandardsStructuredescribe('User Management', () => {
  beforeEach(() => {
    // Setup common test data
  });

  afterEach(() => {
    // Cleanup
  });

  describe('when creating a new user', () => {
    it('should create user with valid data', async () => {
      // Arrange
      const userData = { name: 'John Doe', email: 'john@example.com' };
      
      // Act
      const result = await createUser(userData);
      
      // Assert
      expect(result).toHaveProperty('id');
      expect(result.name).toBe('John Doe');
    });
  });
});

Best PracticesUse descriptive variable namesMock external dependenciesTest both success and error casesUse factory functions for test dataKeep tests independent and isolatedPull Request ProcessBefore StartingCheck existing issues and PRsCreate an issue for significant changesFork the repositoryDevelopmentCreate a feature branch from mainWrite tests for new functionalityEnsure all tests passRun linting and formattingSubmitting PRWrite clear commit messagesInclude description of changesReference related issuesEnsure CI passesReview ProcessAddress reviewer feedbackKeep PR focused and atomicRebase if necessarySetting Up Development EnvironmentInstall dependencies: npm installInstall git hooks: npx husky installRun tests to verify setup: npm testCheck code quality: npm run lintTesting Commandsnpm test - Run all testsnpm run test:watch - Run in watch modenpm run test:coverage - Generate coverage reportnpm run lint - Check code qualitynpm run format - Format code
