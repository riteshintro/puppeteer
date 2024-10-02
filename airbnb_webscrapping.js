const puppeteer = require('puppeteer');

const handleExtractReview = async (url) => {
    const browser = await puppeteer.launch({ headless: false }); // Set to true for headless mode
    const page = await browser.newPage();

    try {
        // Navigate to the URL and wait until the network is idle
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Use $$ to select all divs with the class _b7zir4z
        const divElements = await page.$$('div._b7zir4z'); // This will select all matching divs

        if (divElements.length > 0) {
            console.log(`Found ${divElements.length} divs with class "_b7zir4z".`);
            
            // Loop through each div and extract the content
            for (let i = 0; i < divElements.length; i++) {
                const title = await page.evaluate(el => {
                    const span = el.querySelector("div>div>div>div>span>span");
                    return span ? span.textContent : "No title found";
                }, divElements[i]);

                console.log(`Div ${i + 1} Title:`, title);
            }
        } else {
            console.log('No divs with class "_b7zir4z" found.');
        }

    } catch (error) {
        console.error('Error extracting review:', error);
    } finally {
        // Close the browser
        await browser.close();
    }
};

handleExtractReview("https://www.airbnb.co.in/rooms/1037349894498452683?adults=1&category_tag=Tag%3A8678&children=0&enable_m3_private_room=true&infants=0&pets=0&photo_id=1792963711&search_mode=flex_destinations_search&check_in=2025-06-25&check_out=2025-06-30&source_impression_id=p3_1727849655_P3snm0AUSnZbsAr0&previous_page_section_name=1000&federated_search_id=3da26e35-12ac-4876-8301-ed50ead52ed9");
