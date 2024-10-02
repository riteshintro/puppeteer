const puppeteer = require('puppeteer');
const fs = require("fs");

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch();
  
  // Open a new page
  const page = await browser.newPage();
  
  // Go to the desired URL
  await page.goto('https://www.plasmo.com');
  
  // Get the page's HTML content (source code)
  const content = await page.content();
  
  // Output the HTML to the console
  console.log(content);
  fs.writeFileSync("files.html", content,"utf-8");
  // Close the browser
  await browser.close();
})();
