const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // Set headless to true to run without a GUI
    const page = await browser.newPage();

    try {
        // Navigate to a URL
        await page.goto('https://yahoo.com');

        // Extract image sources
        const images = await page.$$eval("img", (elements) =>
            elements.map((image) => ({ src: image.src }))
        );

        // console.log(images); // Logs the image sources
const jsonData=JSON.stringify({images})
console.log(jsonData)
        // Optionally, take a screenshot or generate a PDF
        // await page.screenshot({path:"episote.png"});
        // await page.pdf({path:"example.pdf", format:"A4"});

    } catch (error) {
        console.error('Error navigating to Yahoo:', error);
    } finally {
        // Close the browser
        await browser.close();
    }
})();
