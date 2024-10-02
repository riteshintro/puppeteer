const puppeteer = require('puppeteer');

const handleExtractReview = async (url) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Arrays to store multiple reviews and reviewer names
    let combinedReviews = [];

    try {
        // Navigate to the URL and wait until the network is idle
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Select all divs with the class _b7zir4z
        const divElements = await page.$$('div._b7zir4z'); 

        if (divElements.length > 0) {
            console.log(`Found ${divElements.length} divs with class "_b7zir4z".`);

            // Loop through each div to extract title, name, and image
            for (let i = 0; i < divElements.length; i++) {
                const { title, name, img } = await page.evaluate(el => {
                    const titleElement = el.querySelector("div>div>div>div>span>span");
                    const nameElement = el.querySelector("div>div>div>div>div>h3");
                    const imgElement = el.querySelector("div>div>div>div>div:nth-of-type(2)>a>div>div>img");
                    console.log(imgElement,"img element")
                    return {
                        title: titleElement ? titleElement.textContent : "No title found",
                        name: nameElement ? nameElement.textContent : "No Name found",
                        img: imgElement ? imgElement.getAttribute("src") : "No Image found",
                    };
                }, divElements[i]);
       
                // Combine the data for the current review
                combinedReviews.push({ review_name: name, review: title, review_img: img });
                // console.log(`Div ${i + 1} - Name: ${name}, Title: ${title}, Image: ${img}`);
            }
        } else {
            console.log('No divs with class "_b7zir4z" found.');
        }

        // Convert to JSON and log the result
        const final_json_data = JSON.stringify(combinedReviews, null, 2);
        console.log(final_json_data);
        // const images = await page.$$eval("img.atm_jp_pyzg9w", (elements) =>
        //     elements.map((image) => ({ src: image.src }))
        // );

        // console.log(images); // Logs the image sources
// const jsonData=JSON.stringify({images})
// console.log(jsonData)
    } catch (error) {
        console.error('Error extracting review:', error);
    } finally {
        // Close the browser
        await browser.close();
    }
};

handleExtractReview("https://www.airbnb.co.in/rooms/54213085?adults=1&category_tag=Tag%3A8678&children=0&enable_m3_private_room=true&infants=0&pets=0&photo_id=1620349408&search_mode=flex_destinations_search&check_in=2024-11-09&check_out=2024-11-14&source_impression_id=p3_1727854539_P3EuvuET8m_nJEBE&previous_page_section_name=1000&federated_search_id=3da26e35-12ac-4876-8301-ed50ead52ed9");
