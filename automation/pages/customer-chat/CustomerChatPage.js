import { expect } from '@playwright/test';
import BasePage from '../BasePage.js';

export default class CustomerChatPage extends BasePage {

    constructor(page) {
        super(page);

        // Job Details
        this.chatNowBtn = 'button:has-text("Chat Now")';

        // Chat Modal
        this.chatModal = '.chat-modal';
        this.closeChatBtn = '.chat-close-btn';

        // Messages
        this.messageInput = '.chat-message-input';
        this.sendBtn = '.chat-send-btn';

        this.messageBubble = '.message-bubble';
        this.sentMessage = '.message-sent';
        this.receivedMessage = '.message-received';

        this.senderName = '.sender-name';
        this.timestamp = '.message-time';

        this.chatMessages = '.chat-message';

        this.unreadCount = '.unread-count';

        // Validation
        this.validationError = '.chat-validation-error';

        // Security
        this.restrictedError = '.restricted-content-error';
    }

    async openAcceptedJob(jobId) {

        await this.page.goto(
            `${process.env.BASE_URL}/jobs/${jobId}`
        );
    }

    async clickChatNow() {

        await this.page.locator(this.chatNowBtn).click();
    }

    async closeChat() {

        await this.page.locator(this.closeChatBtn).click();
    }

    async typeMessage(message) {

        await this.page.locator(this.messageInput).fill(message);
    }

    async sendMessage(message) {

        await this.typeMessage(message);

        await this.page.locator(this.sendBtn).click();
    }

    async getLatestMessage() {

        return await this.page
            .locator(this.messageBubble)
            .last()
            .textContent();
    }

    async getMessagesCount() {

        return await this.page
            .locator(this.chatMessages)
            .count();
    }

    async refreshPage() {

        await this.page.reload();
    }
}