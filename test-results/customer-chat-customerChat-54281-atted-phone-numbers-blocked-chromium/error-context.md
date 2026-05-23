# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: customer-chat/customerChat.spec.js >> Customer - Chats with Hero post Bid Acceptance >> TC-CHAT-027 Verify formatted phone numbers blocked
- Location: automation/tests/customer-chat/customerChat.spec.js:306:5

# Error details

```
Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://your-application-url.com/onboarding/jobs/101
Call log:
  - navigating to "https://your-application-url.com/onboarding/jobs/101", waiting until "load"

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
  2  | import BasePage from '../BasePage.js';
  3  | 
  4  | export default class CustomerChatPage extends BasePage {
  5  | 
  6  |     constructor(page) {
  7  |         super(page);
  8  | 
  9  |         // Job Details
  10 |         this.chatNowBtn = 'button:has-text("Chat Now")';
  11 | 
  12 |         // Chat Modal
  13 |         this.chatModal = '.chat-modal';
  14 |         this.closeChatBtn = '.chat-close-btn';
  15 | 
  16 |         // Messages
  17 |         this.messageInput = '.chat-message-input';
  18 |         this.sendBtn = '.chat-send-btn';
  19 | 
  20 |         this.messageBubble = '.message-bubble';
  21 |         this.sentMessage = '.message-sent';
  22 |         this.receivedMessage = '.message-received';
  23 | 
  24 |         this.senderName = '.sender-name';
  25 |         this.timestamp = '.message-time';
  26 | 
  27 |         this.chatMessages = '.chat-message';
  28 | 
  29 |         this.unreadCount = '.unread-count';
  30 | 
  31 |         // Validation
  32 |         this.validationError = '.chat-validation-error';
  33 | 
  34 |         // Security
  35 |         this.restrictedError = '.restricted-content-error';
  36 |     }
  37 | 
  38 |     async openAcceptedJob(jobId) {
  39 | 
> 40 |         await this.page.goto(
     |                         ^ Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://your-application-url.com/onboarding/jobs/101
  41 |             `${process.env.BASE_URL}/jobs/${jobId}`
  42 |         );
  43 |     }
  44 | 
  45 |     async clickChatNow() {
  46 | 
  47 |         await this.page.locator(this.chatNowBtn).click();
  48 |     }
  49 | 
  50 |     async closeChat() {
  51 | 
  52 |         await this.page.locator(this.closeChatBtn).click();
  53 |     }
  54 | 
  55 |     async typeMessage(message) {
  56 | 
  57 |         await this.page.locator(this.messageInput).fill(message);
  58 |     }
  59 | 
  60 |     async sendMessage(message) {
  61 | 
  62 |         await this.typeMessage(message);
  63 | 
  64 |         await this.page.locator(this.sendBtn).click();
  65 |     }
  66 | 
  67 |     async getLatestMessage() {
  68 | 
  69 |         return await this.page
  70 |             .locator(this.messageBubble)
  71 |             .last()
  72 |             .textContent();
  73 |     }
  74 | 
  75 |     async getMessagesCount() {
  76 | 
  77 |         return await this.page
  78 |             .locator(this.chatMessages)
  79 |             .count();
  80 |     }
  81 | 
  82 |     async refreshPage() {
  83 | 
  84 |         await this.page.reload();
  85 |     }
  86 | }
```