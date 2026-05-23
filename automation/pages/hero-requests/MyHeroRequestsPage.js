import { expect } from '@playwright/test';
import BasePage from '../BasePage';

export default class MyHeroRequestsPage extends BasePage {

    constructor(page) {
        super(page);

        // Dashboard
        this.dashboardTitle = 'h1';
        this.summarySection = '.summary-section';
        this.progressBar = '.progress-bar';
        this.completedJobsCount = '.completed-jobs-count';
        this.milestoneText = '.milestone-text';
        this.rehireHeroesBtn = 'button:has-text("Rehire Heroes")';

        // Empty State
        this.emptyState = '.empty-state';
        this.requestHeroBtn = 'button:has-text("Request a Hero")';

        // Request Cards
        this.requestCards = '.request-card';
        this.location = '.request-location';
        this.jobTitle = '.request-title';
        this.description = '.request-description';
        this.priceRange = '.price-range';
        this.statusTag = '.status-tag';
        this.viewDetailsBtn = '.view-details-btn';

        // Bid Info
        this.bidCount = '.bid-count';
        this.acceptedBid = '.accepted-bid';

        // API
        this.retryBtn = 'button:has-text("Retry")';
    }

    async openDashboard() {
        await this.page.goto(`${process.env.BASE_URL}/my-hero-requests`);
    }

    async clickRequestHero() {
        await this.page.locator(this.requestHeroBtn).click();
    }

    async clickRehireHeroes() {
        await this.page.locator(this.rehireHeroesBtn).click();
    }

    async clickViewDetails() {
        await this.page.locator(this.viewDetailsBtn).first().click();
    }

    async getRequestCardsCount() {
        return await this.page.locator(this.requestCards).count();
    }

    async getDescriptions() {
        return await this.page.locator(this.description).allTextContents();
    }

    async getStatuses() {
        return await this.page.locator(this.statusTag).allTextContents();
    }

    async getBidCountText() {
        return await this.page.locator(this.bidCount).first().textContent();
    }

    async getAcceptedBidText() {
        return await this.page.locator(this.acceptedBid).first().textContent();
    }
}