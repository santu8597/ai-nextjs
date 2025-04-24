const express = require('express');
const cors = require('cors');
const { chromium } = require('playwright');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/automate', async (req, res) => {
  const { url, actions } = req.body;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    for (const action of actions) {
      switch (action.type) {
        case 'click':
          await page.click(action.selector);
          break;
        case 'scroll':
          await page.evaluate((val) => window.scrollBy(0, val), action.value || 500);
          break;
        case 'wait':
          await page.waitForTimeout(action.value || 1000);
          break;
      }
    }

    await browser.close();
    res.json({ success: true, message: 'Automation completed.' });
  } catch (err) {
    await browser.close();
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/youtube', async (req, res) => {
  const { url, volume = 0.5, autoFullscreen = true, togglePlay = true } = req.body;

  if (!url || !url.includes('youtube.com')) {
    return res.status(400).json({ success: false, message: 'Invalid YouTube URL' });
  }

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    if (togglePlay) {
      const playButton = await page.$('button[aria-label="Play"], button[aria-label="Pause"]');
      if (playButton) await playButton.click();
    }

    // Volume control via YouTube player API
    await page.evaluate((vol) => {
      const player = document.querySelector('video');
      if (player) player.volume = vol;
    }, volume);

    if (autoFullscreen) {
      await page.keyboard.press('f'); // YouTube fullscreen shortcut
    }

    res.json({ success: true, message: 'Video is playing with settings applied.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error during YouTube automation', error: error.message });
  }
});


app.listen(4000, () => {
  console.log('🎭 Playwright server running on http://localhost:4000');
});
