import { test, expect } from '@playwright/test';

import CustomerChatPage
from '../../pages/customer-chat/CustomerChatPage.js';

import {
    customerChatData
}
from '../../test-data/customer-chat/customerChatTestData.js';

test.describe(
    'Customer - Chats with Hero post Bid Acceptance',
    () => {

    /** @type {import('../../pages/customer-chat/CustomerChatPage.js').default} */
    let customerChat;

    test.beforeEach(async ({ page }) => {

        customerChat =
            new CustomerChatPage(page);

        await customerChat.openAcceptedJob(101);
    });

    // =====================================================
    // TS-CHAT-001
    // =====================================================

    test(
    'TC-CHAT-001 Verify Chat Now button visible when bid is accepted',
    async () => {

        await expect(
            customerChat.page
                .locator(customerChat.chatNowBtn)
        ).toBeVisible();
    });

    test(
    'TC-CHAT-002 Verify Chat Now button hidden for pending jobs',
    async ({ page }) => {

        await page.goto(
            `${process.env.BASE_URL}/jobs/pending`
        );

        await expect(
            page.locator(customerChat.chatNowBtn)
        ).toHaveCount(0);
    });

    test(
    'TC-CHAT-003 Verify Chat Now button disabled for cancelled jobs',
    async ({ page }) => {

        await page.goto(
            `${process.env.BASE_URL}/jobs/cancelled`
        );

        const button =
            page.locator(customerChat.chatNowBtn);

        await expect(button).toBeDisabled();
    });

    test(
    'TC-CHAT-005 Verify Chat Now button redirects correctly',
    async () => {

        await customerChat.clickChatNow();

        await expect(
            customerChat.page
                .locator(customerChat.chatModal)
        ).toBeVisible();
    });

    // =====================================================
    // TS-CHAT-002
    // =====================================================

    test(
    'TC-CHAT-007 Verify chat window opens as modal',
    async () => {

        await customerChat.clickChatNow();

        await expect(
            customerChat.page
                .locator(customerChat.chatModal)
        ).toBeVisible();
    });

    test(
    'TC-CHAT-008 Verify message input field displayed',
    async () => {

        await customerChat.clickChatNow();

        await expect(
            customerChat.page
                .locator(customerChat.messageInput)
        ).toBeVisible();
    });

    test(
    'TC-CHAT-009 Verify Send button displayed',
    async () => {

        await customerChat.clickChatNow();

        await expect(
            customerChat.page
                .locator(customerChat.sendBtn)
        ).toBeVisible();
    });

    test(
    'TC-CHAT-010 Verify conversation history displayed',
    async () => {

        await customerChat.clickChatNow();

        const count =
            await customerChat.getMessagesCount();

        expect(count).toBeGreaterThan(0);
    });

    test(
    'TC-CHAT-012 Verify auto-scroll to latest message',
    async () => {

        await customerChat.clickChatNow();

        for (let i = 0; i < 10; i++) {

            await customerChat.sendMessage(
                `Test Message ${i}`
            );
        }

        const latest =
            await customerChat.getLatestMessage();

        expect(latest).toContain(
            'Test Message 9'
        );
    });

    test(
    'TC-CHAT-013 Verify chat modal closes successfully',
    async () => {

        await customerChat.clickChatNow();

        await customerChat.closeChat();

        await expect(
            customerChat.page
                .locator(customerChat.chatModal)
        ).toBeHidden();
    });

    // =====================================================
    // TS-CHAT-003
    // =====================================================

    test(
    'TC-CHAT-016 Verify customer can send valid message successfully',
    async () => {

        await customerChat.clickChatNow();

        await customerChat.sendMessage(
            customerChatData.validMessage
        );

        const latest =
            await customerChat.getLatestMessage();

        expect(latest).toContain(
            customerChatData.validMessage
        );
    });

    test(
    'TC-CHAT-019 Verify sender name displayed',
    async () => {

        await customerChat.clickChatNow();

        await expect(
            customerChat.page
                .locator(customerChat.senderName)
                .first()
        ).toBeVisible();
    });

    test(
    'TC-CHAT-020 Verify timestamp displayed',
    async () => {

        await customerChat.clickChatNow();

        await expect(
            customerChat.page
                .locator(customerChat.timestamp)
                .first()
        ).toBeVisible();
    });

    test(
    'TC-CHAT-021 Verify messages persist after refresh',
    async () => {

        await customerChat.clickChatNow();

        await customerChat.sendMessage(
            'Persistence Test'
        );

        await customerChat.refreshPage();

        await customerChat.clickChatNow();

        const latest =
            await customerChat.getLatestMessage();

        expect(latest).toContain(
            'Persistence Test'
        );
    });

    test(
    'TC-CHAT-023 Verify messages ordered chronologically',
    async () => {

        await customerChat.clickChatNow();

        await customerChat.sendMessage('First');
        await customerChat.sendMessage('Second');

        const messages =
            await customerChat.page
                .locator(customerChat.messageBubble)
                .allTextContents();

        expect(messages[0]).toContain('First');
        expect(messages[1]).toContain('Second');
    });

    test(
    'TC-CHAT-024 Verify empty messages cannot be sent',
    async () => {

        await customerChat.clickChatNow();

        await customerChat.page
            .locator(customerChat.sendBtn)
            .click();

        await expect(
            customerChat.page
                .locator(customerChat.validationError)
        ).toBeVisible();
    });

    test(
    'TC-CHAT-025 Verify spaces-only messages blocked',
    async () => {

        await customerChat.clickChatNow();

        await customerChat.sendMessage(
            customerChatData.spacesOnly
        );

        await expect(
            customerChat.page
                .locator(customerChat.validationError)
        ).toBeVisible();
    });

    // =====================================================
    // TS-CHAT-004
    // =====================================================

    test(
    'TC-CHAT-026 Verify phone numbers blocked',
    async () => {

        await customerChat.clickChatNow();

        await customerChat.sendMessage(
            customerChatData.phoneNumber
        );

        await expect(
            customerChat.page
                .locator(customerChat.restrictedError)
        ).toBeVisible();
    });

    test(
    'TC-CHAT-027 Verify formatted phone numbers blocked',
    async () => {

        await customerChat.clickChatNow();

        await customerChat.sendMessage(
            customerChatData.formattedPhone
        );

        await expect(
            customerChat.page
                .locator(customerChat.restrictedError)
        ).toBeVisible();
    });

    test(
    'TC-CHAT-028 Verify email addresses blocked',
    async () => {

        await customerChat.clickChatNow();

        await customerChat.sendMessage(
            customerChatData.email
        );

        await expect(
            customerChat.page
                .locator(customerChat.restrictedError)
        ).toBeVisible();
    });

    test(
    'TC-CHAT-029 Verify combined restricted content blocked',
    async () => {

        await customerChat.clickChatNow();

        await customerChat.sendMessage(
            customerChatData.combinedRestricted
        );

        await expect(
            customerChat.page
                .locator(customerChat.restrictedError)
        ).toBeVisible();
    });

    test(
    'TC-CHAT-030 Verify restricted phone number message displayed',
    async () => {

        await customerChat.clickChatNow();

        await customerChat.sendMessage(
            customerChatData.phoneNumber
        );

        await expect(
            customerChat.page
                .locator(customerChat.restrictedError)
        ).toContainText(
            'Sharing phone numbers is not allowed'
        );
    });

    test(
    'TC-CHAT-031 Verify restricted email message displayed',
    async () => {

        await customerChat.clickChatNow();

        await customerChat.sendMessage(
            customerChatData.email
        );

        await expect(
            customerChat.page
                .locator(customerChat.restrictedError)
        ).toContainText(
            'Sharing email addresses is not allowed'
        );
    });

    test(
    'TC-CHAT-032 Verify combined restriction message displayed',
    async () => {

        await customerChat.clickChatNow();

        await customerChat.sendMessage(
            customerChatData.combinedRestricted
        );

        await expect(
            customerChat.page
                .locator(customerChat.restrictedError)
        ).toContainText(
            'restricted contact information'
        );
    });

    test(
    'TC-CHAT-034 Verify partially formatted numbers detected',
    async () => {

        await customerChat.clickChatNow();

        await customerChat.sendMessage(
            customerChatData.formattedPhone
        );

        await expect(
            customerChat.page
                .locator(customerChat.restrictedError)
        ).toBeVisible();
    });

    // =====================================================
    // TS-CHAT-005
    // =====================================================

    test(
    'TC-CHAT-038 Verify unread message count updates correctly',
    async () => {

        await expect(
            customerChat.page
                .locator(customerChat.unreadCount)
        ).toBeVisible();
    });

    test(
    'TC-CHAT-039 Verify unread count resets after opening chat',
    async () => {

        await customerChat.clickChatNow();

        await expect(
            customerChat.page
                .locator(customerChat.unreadCount)
        ).toContainText('0');
    });

    // =====================================================
    // TS-CHAT-006
    // =====================================================

    test(
    'TC-CHAT-043 Verify messages remain after reopening chat',
    async () => {

        await customerChat.clickChatNow();

        await customerChat.sendMessage(
            'Saved Message'
        );

        await customerChat.closeChat();

        await customerChat.clickChatNow();

        const latest =
            await customerChat.getLatestMessage();

        expect(latest).toContain(
            'Saved Message'
        );
    });

    // =====================================================
    // TS-CHAT-007
    // =====================================================

    test(
    'TC-CHAT-049 Verify XSS prevention in chat messages',
    async () => {

        await customerChat.clickChatNow();

        await customerChat.sendMessage(
            customerChatData.xssPayload
        );

        const latest =
            await customerChat.getLatestMessage();

        expect(latest).not.toContain(
            '<script>'
        );
    });

});