const fs = require("fs");
const puppeteer = require("puppeteer");

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });

  const page = await browser.newPage();
  await page.goto(
    "https://www.amazon.in/Fastrack-Stunners-4-0-Analog-Watch/product-reviews/B0B7BK55X1/ref=cm_cr_getr_d_paging_btm_next_3?ie=UTF8&reviewerType=all_reviews&pageNumber=1"
  );

  let isBtnDisabled = false;
  while (!isBtnDisabled) {
    const productsHandles = await page.$$(
      "div.a-section.a-spacing-none.review-views.celwidget>div>div>div"
    );
    
    let full_data = [];
    for (const producthandle of productsHandles) {
      let title = "Null";

      try {
        title = await page.evaluate(
          (el) => el.querySelector("div>.a-spacing-small").textContent.trim(),
          producthandle
        );
        full_data.push({ title });
      } catch (error) {}

    }
    
    console.log(full_data);
    await page.waitForSelector("li.a-last", { visible: true });
    const is_disabled = (await page.$("li.a-disabled.a-last")) !== null;

    isBtnDisabled = is_disabled;
    if (!is_disabled) {
      await Promise.all([
        page.click("li.a-last"),
        page.waitForNavigation({ waitUntil: "networkidle2" }),
      ]);
    }
  }

  await browser.close();
})();
