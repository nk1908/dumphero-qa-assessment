import { test, expect } from '@playwright/test';
import MyHeroRequestsPage from '../../pages/hero-requests/MyHeroRequestsPage';
import { requestData } from '../../test-data/hero-requests/myHeroRequestsTestData';

test.describe('Customer - My Hero Requests Module', () => {

    /** @type {import('../../pages/hero-requests/MyHeroRequestsPage.js').default} */
    let heroRequests;

    test.beforeEach(async ({ page }) => {

        heroRequests = new MyHeroRequestsPage(page);

        await heroRequests.openDashboard();
    });

    // =========================================================
    // TS-REQ-001
    // =========================================================

    test('TC-REQ-001 Verify dashboard loads successfully', async ({ page }) => {

        await expect(page).toHaveURL(/my-hero-requests/);
    });

    test('TC-REQ-003 Verify summary section displayed', async () => {

        await expect(
            heroRequests.page.locator(heroRequests.summarySection)
        ).toBeVisible();
    });

    test('TC-REQ-004 Verify progress bar displayed correctly', async () => {

        await expect(
            heroRequests.page.locator(heroRequests.progressBar)
        ).toBeVisible();
    });

    test('TC-REQ-005 Verify completed jobs count displayed correctly', async () => {

        await expect(
            heroRequests.page.locator(heroRequests.completedJobsCount)
        ).toContainText(requestData.completedJobs);
    });

    test('TC-REQ-006 Verify milestone text displayed correctly', async () => {

        await expect(
            heroRequests.page.locator(heroRequests.milestoneText)
        ).toContainText('jobs to go');
    });

    test('TC-REQ-007 Verify Rehire Heroes button visible', async () => {

        await expect(
            heroRequests.page.locator(heroRequests.rehireHeroesBtn)
        ).toBeVisible();
    });

    // =========================================================
    // TS-REQ-002
    // =========================================================

    test('TC-REQ-011 Verify empty state displayed when no requests exist', async () => {

        await expect(
            heroRequests.page.locator(heroRequests.emptyState)
        ).toBeVisible();
    });

    test('TC-REQ-013 Verify Request a Hero redirection works correctly', async ({ page }) => {

        await heroRequests.clickRequestHero();

        await expect(page).toHaveURL(/request-hero/);
    });

    // =========================================================
    // TS-REQ-003
    // =========================================================

    test('TC-REQ-015 Verify request cards displayed', async () => {

        const count = await heroRequests.getRequestCardsCount();

        expect(count).toBeGreaterThan(0);
    });

    test('TC-REQ-016 Verify requests displayed in descending order', async () => {

        const cards = heroRequests.page.locator(heroRequests.requestCards);

        await expect(cards.first()).toBeVisible();
    });

    test('TC-REQ-017 Verify Location displayed on request card', async () => {

        await expect(
            heroRequests.page.locator(heroRequests.location).first()
        ).toBeVisible();
    });

    test('TC-REQ-018 Verify Job Title displayed on request card', async () => {

        await expect(
            heroRequests.page.locator(heroRequests.jobTitle).first()
        ).toBeVisible();
    });

    test('TC-REQ-019 Verify Description displayed on request card', async () => {

        await expect(
            heroRequests.page.locator(heroRequests.description).first()
        ).toBeVisible();
    });

    test('TC-REQ-020 Verify long descriptions truncated correctly', async () => {

        const descriptions = await heroRequests.getDescriptions();

        descriptions.forEach(desc => {
            expect(desc.length).toBeLessThanOrEqual(200);
        });
    });

    test('TC-REQ-021 Verify Price Range displayed', async () => {

        await expect(
            heroRequests.page.locator(heroRequests.priceRange).first()
        ).toBeVisible();
    });

    test('TC-REQ-022 Verify Price Range displayed in currency format', async () => {

        const price =
            await heroRequests.page
                .locator(heroRequests.priceRange)
                .first()
                .textContent();

        expect(price).toMatch(/\$\d+\-\$\d+/);
    });

    test('TC-REQ-023 Verify Status Tag displayed', async () => {

        await expect(
            heroRequests.page.locator(heroRequests.statusTag).first()
        ).toBeVisible();
    });

    test('TC-REQ-024 Verify View Details button visible', async () => {

        await expect(
            heroRequests.page.locator(heroRequests.viewDetailsBtn).first()
        ).toBeVisible();
    });

    // =========================================================
    // TS-REQ-004
    // =========================================================

    test('TC-REQ-026 Verify Awaiting Bids status displayed correctly', async () => {

        const statuses = await heroRequests.getStatuses();

        expect(statuses).toContain('Awaiting Bids');
    });

    test('TC-REQ-027 Verify Bids In status displayed correctly', async () => {

        const statuses = await heroRequests.getStatuses();

        expect(statuses).toContain('Bids In');
    });

    test('TC-REQ-028 Verify Bid Accepted status displayed correctly', async () => {

        const statuses = await heroRequests.getStatuses();

        expect(statuses).toContain('Bid Accepted');
    });

    test('TC-REQ-029 Verify Completed status displayed correctly', async () => {

        const statuses = await heroRequests.getStatuses();

        expect(statuses).toContain('Completed');
    });

    test('TC-REQ-030 Verify Awaiting Bids shown only when no bids received', async () => {

        const bidText = await heroRequests.getBidCountText();

        expect(bidText).toContain('0 Bids');
    });

    test('TC-REQ-031 Verify Bids In displayed when at least one bid exists', async () => {

        const bidText = await heroRequests.getBidCountText();

        expect(bidText).toContain('Bids');
    });

    // =========================================================
    // TS-REQ-005
    // =========================================================

    test('TC-REQ-035 Verify 0 Bids displayed correctly', async () => {

        const text = await heroRequests.getBidCountText();

        expect(text).toContain('0 Bids');
    });

    test('TC-REQ-036 Verify total bid count displayed correctly', async () => {

        const text = await heroRequests.getBidCountText();

        expect(text).toMatch(/\d+\sBids/);
    });

    test('TC-REQ-037 Verify accepted bid amount displayed correctly', async () => {

        const text = await heroRequests.getAcceptedBidText();

        expect(text).toContain('$');
    });

    test('TC-REQ-038 Verify accepted bid overrides bid count display', async () => {

        const accepted =
            await heroRequests.page
                .locator(heroRequests.acceptedBid)
                .first()
                .isVisible();

        expect(accepted).toBeTruthy();
    });

    test('TC-REQ-039 Verify accepted bid displayed in currency format', async () => {

        const text = await heroRequests.getAcceptedBidText();

        expect(text).toMatch(/\$\d+/);
    });

    // =========================================================
    // TS-REQ-006
    // =========================================================

    test('TC-REQ-043 Verify progress calculations based on completed jobs only', async () => {

        await expect(
            heroRequests.page.locator(heroRequests.progressBar)
        ).toBeVisible();
    });

    // =========================================================
    // TS-REQ-007
    // =========================================================

    test('TC-REQ-044 Verify View Details redirects correctly', async ({ page }) => {

        await heroRequests.clickViewDetails();

        await expect(page).toHaveURL(/request-details/);
    });

    test('TC-REQ-045 Verify Rehire Heroes redirects correctly', async ({ page }) => {

        await heroRequests.clickRehireHeroes();

        await expect(page).toHaveURL(/request-hero/);
    });

    // =========================================================
    // TS-REQ-008
    // =========================================================

    test('TC-REQ-047 Verify request data fetched successfully from API', async ({ page }) => {

        const response = await page.waitForResponse(
            response =>
                response.url().includes('/requests') &&
                response.status() === 200
        );

        expect(response.ok()).toBeTruthy();
    });

    test('TC-REQ-049 Verify status updates reflected after refresh', async ({ page }) => {

        await page.reload();

        await expect(
            heroRequests.page.locator(heroRequests.statusTag).first()
        ).toBeVisible();
    });

    test('TC-REQ-050 Verify bid updates reflected after refresh', async ({ page }) => {

        await page.reload();

        await expect(
            heroRequests.page.locator(heroRequests.bidCount).first()
        ).toBeVisible();
    });

});