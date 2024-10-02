
const puppeteer = require('puppeteer');
    // Launch a new browser instance



(async()=>{
    const browser = await puppeteer.launch({ headless: false }); // Set headless to true to run without a GUI
    const page = await browser.newPage();

    try {
        // Navigate to a URL
        await page.goto('https://www.google.com');
        await page.screenshot(({path:"google.png"}))
        console.log("instagram")
        // Wait for a few seconds if needed (uncomment if necessary)
        // await page.waitForTimeout(5000);
    } catch (error) {
        console.error('Error navigating to Instagram:', error);
    } finally {
        // Close the browser
        await browser.close();
    }
})()