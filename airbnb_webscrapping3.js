const puppeteer = require('puppeteer');

const handleExtractReview = async (url) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        // Navigate to the URL and wait until the network is idle
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Select all divs with the class _b7zir4z
        const divElements = await page.$$('div._b7zir4z');

        if (divElements.length > 0) {
            for (let i = 0; i < divElements.length; i++) {
                // Evaluate the DOM element inside the page context to get the image URL
                let img = await page.evaluate(
                    (el) => {
                        const imgElement = el.querySelector("img.atm_e2_idpfg4");
                        return imgElement ? imgElement.getAttribute("src") : null;
                    },
                    divElements[i] // Pass individual element handle
                );
                
                if (img) {
                    console.log(`Image found: ${img}`);
                } else {
                    console.log(`No image found in div ${i}`);
                }
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

handleExtractReview("https://www.airbnb.co.in/rooms/54213085?adults=1&category_tag=Tag%3A8678&children=0&enable_m3_private_room=true&infants=0&pets=0&photo_id=1620349408&search_mode=flex_destinations_search&check_in=2024-11-09&check_out=2024-11-14&source_impression_id=p3_1727854539_P3EuvuET8m_nJEBE&previous_page_section_name=1000&federated_search_id=3da26e35-12ac-4876-8301-ed50ead52ed9");
