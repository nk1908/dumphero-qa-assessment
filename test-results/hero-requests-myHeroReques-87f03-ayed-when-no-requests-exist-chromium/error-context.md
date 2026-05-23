# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hero-requests/myHeroRequests.spec.js >> Customer - My Hero Requests Module >> TC-REQ-011 Verify empty state displayed when no requests exist
- Location: automation/tests/hero-requests/myHeroRequests.spec.js:65:5

# Error details

```
Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://your-application-url.com/onboarding/my-hero-requests
Call log:
  - navigating to "https://your-application-url.com/onboarding/my-hero-requests", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "This site can’t be reached" [level=1] [ref=e7]
    - paragraph [ref=e8]: Check if there is a typo in your-application-url.com.
    - generic [ref=e9]: DNS_PROBE_FINISHED_NXDOMAIN
  - button "Reload" [ref=e12] [cursor=pointer]
```

# Test source

```ts
  1  | import { expect } from '@playwright/test';
  2  | import BasePage from '../BasePage';
  3  | 
  4  | export default class MyHeroRequestsPage extends BasePage {
  5  | 
  6  |     constructor(page) {
  7  |         super(page);
  8  | 
  9  |         // Dashboard
  10 |         this.dashboardTitle = 'h1';
  11 |         this.summarySection = '.summary-section';
  12 |         this.progressBar = '.progress-bar';
  13 |         this.completedJobsCount = '.completed-jobs-count';
  14 |         this.milestoneText = '.milestone-text';
  15 |         this.rehireHeroesBtn = 'button:has-text("Rehire Heroes")';
  16 | 
  17 |         // Empty State
  18 |         this.emptyState = '.empty-state';
  19 |         this.requestHeroBtn = 'button:has-text("Request a Hero")';
  20 | 
  21 |         // Request Cards
  22 |         this.requestCards = '.request-card';
  23 |         this.location = '.request-location';
  24 |         this.jobTitle = '.request-title';
  25 |         this.description = '.request-description';
  26 |         this.priceRange = '.price-range';
  27 |         this.statusTag = '.status-tag';
  28 |         this.viewDetailsBtn = '.view-details-btn';
  29 | 
  30 |         // Bid Info
  31 |         this.bidCount = '.bid-count';
  32 |         this.acceptedBid = '.accepted-bid';
  33 | 
  34 |         // API
  35 |         this.retryBtn = 'button:has-text("Retry")';
  36 |     }
  37 | 
  38 |     async openDashboard() {
> 39 |         await this.page.goto(`${process.env.BASE_URL}/my-hero-requests`);
     |                         ^ Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://your-application-url.com/onboarding/my-hero-requests
  40 |     }
  41 | 
  42 |     async clickRequestHero() {
  43 |         await this.page.locator(this.requestHeroBtn).click();
  44 |     }
  45 | 
  46 |     async clickRehireHeroes() {
  47 |         await this.page.locator(this.rehireHeroesBtn).click();
  48 |     }
  49 | 
  50 |     async clickViewDetails() {
  51 |         await this.page.locator(this.viewDetailsBtn).first().click();
  52 |     }
  53 | 
  54 |     async getRequestCardsCount() {
  55 |         return await this.page.locator(this.requestCards).count();
  56 |     }
  57 | 
  58 |     async getDescriptions() {
  59 |         return await this.page.locator(this.description).allTextContents();
  60 |     }
  61 | 
  62 |     async getStatuses() {
  63 |         return await this.page.locator(this.statusTag).allTextContents();
  64 |     }
  65 | 
  66 |     async getBidCountText() {
  67 |         return await this.page.locator(this.bidCount).first().textContent();
  68 |     }
  69 | 
  70 |     async getAcceptedBidText() {
  71 |         return await this.page.locator(this.acceptedBid).first().textContent();
  72 |     }
  73 | }
```