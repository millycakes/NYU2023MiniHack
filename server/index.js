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
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();
    console.log("link: ", link);
    await page.goto(link);
    await page.setViewport({
        width: 1200,
        height: 800
    });
    await page.waitForSelector('#subscribe_modal_container #closeForm #closeid #icon-x');
    await page.click("#subscribe_modal_container #closeForm #closeid #icon-x");

    await page.waitForSelector("#pull-deal-feed");

    // Use the page.$$eval method to directly extract data from the page
    const dataholder = await page.$$eval(".card-ui", elements => {
        console.log("elements: ", elements);
        let data = [];
        for (const element of elements) {
            const dataObject = {
                image: element.querySelector('.card-ui .cui-image') ? element.querySelector('.card-ui .cui-image').src : null,
                title: element.querySelector('.cui-udc-title') ? element.querySelector('.cui-udc-title').innerText : null,
                stars: element.querySelector('.numeric-count') ? element.querySelector('.numeric-count').innerText : null,
                originalprice: element.querySelector('.cui-price-original') ? element.querySelector('.cui-price-original').innerText : null,
                discountprice: element.querySelector('.cui-price-discount') ? element.querySelector('.cui-price-discount').innerText : null,
                percentoff: element.querySelector('.cui-detail-badge') ? element.querySelector('.cui-detail-badge').innerText : null,
            }
            console.log("dataObject: ", dataObject);
            data.push(dataObject);
        }
        console.log("data: ", data);
        return data;
    });
    console.log("dataholder: ", dataholder);
    await browser.close();
    return dataholder;
}

app.get('/', async (req, res) => {
    const data = await openPageAndScroll(`https://www.groupon.com/search?query=${req.query.query}`);
    console.log("google data in ex: ", data);
    res.json(data);
})

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT || 3001}`);
})

// export app as commonjs module
module.exports = app;