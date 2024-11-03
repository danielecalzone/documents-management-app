import puppeteer, { Browser, Page } from 'puppeteer';
import { Document } from '../../models/Document';

describe('Document Creation E2E Test', () => {
  let browser: Browser | null;
  let page: Page | null;

  beforeAll(async () => {
    try {
      browser = await puppeteer.launch();
      page = await browser.newPage();
      await page.goto('http://localhost:3000');
    } catch (error) {
      console.error('Error launching Puppeteer:', error);
      browser = null;
      page = null;
    }
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test('should create a new document and show a notification, then check document list', async () => {
    if (!page) {
      throw new Error('Page is not initialized');
    }

    await page.click('.create-document-btn');
    await page.waitForSelector('.modal-content', { visible: true });

    const documentTitle = 'Test Document';
    const contributors = 'John Doe, Jane Smith';
    const attachments = 'attachment1.pdf, attachment2.pdf';

    await page.type('#document-title', documentTitle);
    await page.type('#contributors', contributors);
    await page.type('#attachments', attachments);

    await page.click('button[type="submit"]');

    const notificationSelector = '.notification-banner';
    await page.waitForSelector(notificationSelector, { visible: true });

    const notificationText = await page.$eval(
      notificationSelector + ' .notification-creation-text',
      (el) => el.textContent || ''
    );

    expect(notificationText).toBe('Document created successfully!');

    const documentListItems = await page.$$eval(
      '.document-list .document-item',
      (items) =>
        items.map((item) => {
          const titleElement = item.querySelector('.document-name');
          const contributorsElement = item.querySelector('.contributors');
          const attachmentsElement = item.querySelector('.attachments');

          return {
            Title: titleElement
              ? titleElement.childNodes[0]?.textContent?.trim() || ''
              : '',
            Contributors: Array.from(contributorsElement?.children || [])
              .map((div) => div.textContent?.trim() || '')
              .filter(Boolean)
              .join(', '),
            Attachments: Array.from(attachmentsElement?.children || [])
              .map((div) => div.textContent?.trim() || '')
              .filter(Boolean)
              .join(', '),
          };
        })
    );

    const newDocument: Document = {
      ID: Date.now().toString(),
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
      Title: documentTitle,
      Attachments: attachments.split(',').map((a) => a.trim()),
      Contributors: contributors.split(',').map((name) => ({
        ID: `${Date.now()}-${name.trim()}`,
        Name: name.trim(),
      })),
      Version: '1.0.0',
    };

    const isDocumentPresent = documentListItems.some(
      (item) =>
        item.Title === newDocument.Title &&
        item.Contributors ===
          newDocument.Contributors.map((c) => c.Name).join(', ') &&
        item.Attachments === newDocument.Attachments.join(', ')
    );

    expect(isDocumentPresent).toBe(true);
  });
});
