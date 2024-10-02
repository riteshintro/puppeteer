const puppeteer = require("puppeteer");
const fs = require("fs");

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Navigate to page
  await page.goto("http://yahoo.com");
  
  // SEO Related data
  const title = await page.title();
  const metaDescription = await page.$eval('meta[name="description"]', (element) => element.content);
  const metaKeywords = await page.$eval('meta[name="keywords"]', (element) => element.content);
  
  // Extract Links
  const links = await page.$$eval("a", (elements) =>
    elements.map((element) => ({
      src: element.href,
      text: element.textContent.trim()
    }))
  );
  
  // Extract Images
  const images = await page.$$eval("img", (elements) =>
    elements.map((element) => element.src)
  );

  const imageCount = images.length;
  const linkCount = links.length;

  // Prepare output format
  const outputData = {
    title,
    metaDescription,
    metaKeywords,
    images,
    links,
    imageCount,
    linkCount
  };

  const jsonOutput = JSON.stringify(outputData, null, 2);
  fs.writeFileSync("file.json", jsonOutput);

  await browser.close();
}

run();
