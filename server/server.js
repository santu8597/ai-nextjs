const express = require('express');
const { chromium } = require('playwright');
const cheerio = require('cheerio');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/scrape', async (req, res) => {
  const { url, actions = [], selectors = [], screenshot = false, pagination } = req.body;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let data = {};

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    for (const action of actions) {
      if (action.type === 'click' && action.selector) {
        await page.click(action.selector);
      } else if (action.type === 'scroll') {
        await page.evaluate(val => window.scrollBy(0, val), action.value || 500);
      } else if (action.type === 'wait') {
        await page.waitForTimeout(action.value || 1000);
      }
    }

    const html = await page.content();
    const $ = cheerio.load(html);

    for (const selector of selectors) {
      data[selector] = $(selector).map((_, el) => $(el).text().trim()).get();
    }

    // Screenshot if required
    let screenshotPath = '';
    if (screenshot) {
      screenshotPath = path.join(__dirname, 'screenshot.png');
      await page.screenshot({ path: screenshotPath });
    }

    // Pagination scraping
    if (pagination?.nextButtonSelector) {
      let pageCount = 1;
      while (await page.$(pagination.nextButtonSelector)) {
        await page.click(pagination.nextButtonSelector);
        await page.waitForTimeout(2000); // Wait for next page to load
        const nextHtml = await page.content();
        const next$ = cheerio.load(nextHtml);
        
        for (const selector of selectors) {
          data[selector].push(...next$(selector).map((_, el) => next$(el).text().trim()).get());
        }

        pageCount++;
        if (pageCount >= 5) break;  // Limit to 5 pages for demo
      }
    }

    await browser.close();
    res.json({
      success: true,
      data,
      screenshot: screenshotPath,
    });
  } catch (err) {
    await browser.close();
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(4000, () => {
  console.log('🧠 Web scraping server running on http://localhost:4000');
});
