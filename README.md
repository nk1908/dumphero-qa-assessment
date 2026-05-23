# DumpHero QA Assessment

## Project Overview

This repository contains the complete QA assessment solution for the DumpHero waste disposal application.

The assessment covers:
- Functional Testing
- Negative Testing
- Edge Case Validation
- UI/UX Validation
- API Validation Considerations
- Security Testing Considerations
- End-to-End Flow Testing
- Automation Testing using Playwright with JavaScript and POM Architecture

The application allows customers to:
- Create customer accounts
- View hero requests and bids
- Chat with assigned heroes after bid acceptance

---

# Modules Covered

## 1. Customer Onboarding
- Customer registration form validation
- OTP verification validation
- Payment method validation
- Terms & Conditions validation
- Submission and redirection flow

## 2. My Hero Requests
- Request listing validation
- Empty state validation
- Status tracking validation
- Bid information validation
- Navigation validation

## 3. Customer-Hero Chat
- Chat availability validation
- Real-time messaging validation
- Restricted content moderation
- Notification validation
- Persistence validation

---

# Testing Scope

## Manual Testing
- Functional Test Scenarios
- Positive Test Cases
- Negative Test Cases
- Edge Cases
- UI/UX Validation
- API Validation Ideas
- Security Validation Ideas

## Automation Testing
Automation framework built using:
- Playwright
- JavaScript
- Page Object Model (POM)

---

# Framework Architecture

```text
automation/
│
├── pages/          # Page Object files
├── tests/          # Test scripts
├── fixtures/       # Test data
├── utils/          # Reusable utilities
├── reports/        # Playwright reports
└── screenshots/    # Failure screenshots
```

---

# Tech Stack

| Tool | Purpose |
|------|----------|
| Playwright | UI Automation |
| JavaScript | Automation Language |
| Node.js | Runtime |
| GitHub | Version Control |
| Postman | API Validation |
| VS Code | IDE |

---

# Automation Coverage

## Customer Onboarding
- Successful onboarding flow
- Mandatory field validation
- Terms & Conditions validation
- Submit button validation

## My Hero Requests
- Empty state validation
- Request listing validation
- Status validation
- View details navigation

## Customer-Hero Chat
- Successful message sending
- Restricted phone number validation
- Restricted email validation
- Chat availability validation

---

# Project Structure

```text
dumphero-qa-assessment/
│
├── docs/
│   ├── Project Structure & Sample ScreenShots
│   ├── DumpHero TestCases
│   ├── Edge_Cases.md
│   ├── DumpHero API TestCases
│  
│
├── automation/
│   ├── pages/
│   ├── tests/
│   ├── fixtures/
│   ├── utils/
│   ├── reports/
│   └── screenshots/
│
├── api-testing/ (Need to be continue)
│
└── README.md
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/your-username/dumphero-qa-assessment.git
```

---

## Navigate to Automation Folder

```bash
cd automation
```

---

## Install Dependencies

```bash
npm install
```

---

## Install Playwright Browsers

```bash
npx playwright install
```

---

# Running Tests

## Run All Tests

```bash
npx playwright test
```

---

## Run Specific Test File

```bash
npx playwright test tests/onboarding.spec.js
```

---

## Run in Headed Mode

```bash
npx playwright test --headed
```

---

# Test Reports

## Open HTML Report

```bash
npx playwright show-report
```

Reports are generated inside:
```text
automation/playwright-report/
```

---

# Features Implemented

- Page Object Model (POM)
- Reusable locators
- Modular framework structure
- Failure screenshots
- Trace collection
- Scalable automation architecture
- Data-driven testing support

---

# Validation Areas Covered

## Functional Validation
- Field validations
- Business rule validations
- Status validations
- Navigation validations

## Negative Validation
- Invalid inputs
- Restricted content
- Duplicate data
- Expired payment details

## Security Validation
- XSS validation
- SQL injection validation
- Sensitive data masking
- OTP verification handling

## API Validation Considerations
- Status code validation
- Response schema validation
- Duplicate email handling
- Real-time data synchronization

---

# Edge Cases Covered

- Double form submission
- API failure handling
- Slow network handling
- Session timeout
- Real-time chat synchronization
- Large message handling
- Long request description handling

---

# Assumptions

- APIs are assumed to be available and stable
- OTP service is assumed functional
- Payment gateway integration is mocked/stubbed if unavailable
- Chat system supports near real-time communication

---

# Future Improvements

- CI/CD integration using GitHub Actions
- Cross-browser execution
- API automation integration
- Accessibility testing
- Performance testing
- Visual regression testing

---

# Author

Nirmal Kumar

QA Engineer | Manual & Automation Testing

Skills:
- Playwright
- Selenium
- API Testing
- Postman
- Rest Assured
- JavaScript
- Test Automation Framework Design

---

# Conclusion

This project demonstrates a complete QA approach including:
- Requirement understanding
- Test planning
- Manual testing
- Automation framework implementation
- Validation strategy
- Real-world edge case handling
- Professional project organization
