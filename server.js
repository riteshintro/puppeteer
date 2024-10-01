const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/', async (req, res) => {
    res.send('Hello, World!');

    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: false }); // Set headless to true to run without a GUI
    const page = await browser.newPage();

    try {
        // Navigate to a URL
        await page.goto('https://www.instagram.com');
        console.log("instagram")
        // Wait for a few seconds if needed (uncomment if necessary)
        // await page.waitForTimeout(5000);
    } catch (error) {
        console.error('Error navigating to Instagram:', error);
    } finally {
        // Close the browser
        await browser.close();
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
