const puppeteer = require('puppeteer');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add access control allow origin header
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

const openPageAndScroll = async (link) => {
    const browser = await puppeteer.launch({
        headless: "new",
        // headless: false,
        args: ['--no-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto(link);
    await page.setViewport({
        width: 1200,
        height: 800
    });
    await page.waitForSelector('#subscribe_modal_container #closeForm #closeid #icon-x');
    await page.click("#subscribe_modal_container #closeForm #closeid #icon-x");

    await page.waitForSelector("#pull-deal-feed");

    // for each querySelector("#pull-deal-feed .card-ui.cui-c-udc") in this div, return the data
    const dataholder = await page.evaluate(async (selector) => {
        return new Promise(async (resolve) => {
            const elements = document.querySelectorAll("#pull-deal-feed .card-ui.cui-c-udc");
            console.log("elements: ", elements);
            const data = [];
            elements.forEach((element) => {
                console.log("element: ", element);
                const dataObject = {
                    image: element.querySelector('.card-ui .cui-image').src,
                    title: element.querySelector('.cui-udc-title').innerText,
                    stars: element.querySelector('.numeric-count').innerText,
                    originalprice: element.querySelector('.cui-price-original').innerText,
                    discountprice: element.querySelector('.cui-price-discount').innerText,
                    percentoff: element.querySelector('.cui-detail-badge').innerText,
                }
                console.log("dataObject: ", dataObject);
                data.push(dataObject);
            });
            console.log("data: ", data);
            resolve(data); // Corrected: Resolve outside of the Promise constructor
        });
    }, "#pull-deal-feed");
    // console.log("dataholder: ", dataholder);
    return dataholder;
}

app.get('/', async (req, res) => {
    // query sent into body
    // const data = await openPageAndScroll("https://www.groupon.com/search?query=food");
    const data = await openPageAndScroll(`https://www.groupon.com/search?query=${req.query.query}`);
    // send json back to frontend
    console.log("google data in ex: ", data);
    res.json(data);
})

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT || 3001}`);
})

// export app as commonjs module
module.exports = app;