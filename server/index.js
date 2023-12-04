const puppeteer = require('puppeteer');
// const fetch = require('node-fetch');
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
    return new Promise(async (resolve) => {
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

        let scrollableSection = await page.$("#browse-body");
        // every 100ms, scroll down as much as possible
        let scrolltop, scrollheight;
        let freq = 0;
        const timer = setInterval(async () => {
            scrollableSection.scrollTop = scrollableSection.scrollHeight;
            console.log("scrolltop: ", scrollableSection.scrollTop, "scrollheight: ", scrollableSection.scrollHeight)
            if (scrolltop === scrollableSection.scrollTop) {
                freq++;
            }
            else {
                freq = 0;
            }
            console.log("freq: ", freq);
            if (freq === 10) {
                clearInterval(timer);
                console.log("stopped scrolling");
                const data = await getAllData();
                console.log("data: ", data);
                resolve(data);
            }
            scrolltop = scrollableSection.scrollTop;
            scrollheight = scrollableSection.scrollHeight;
        }, 100);

        async function getAllData() {
            // Use the page.$$eval method to directly extract data from the page
            const dataholder = await page.$$eval(".card-ui", elements => {
                console.log("elements: ", elements);
                let data = [];
                for (const element of elements) {
                    const dataObject = {
                        image: element.querySelector('.card-ui .cui-image') ? element.querySelector('.card-ui .cui-image').src : null,
                        title: element.querySelector('.cui-udc-title') ? element.querySelector('.cui-udc-title').innerText : null,
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
    })
}

app.get('/calculate', async (req, res) => {
    const data = await calculate(req.query.percentage, req.query.total_number);
    console.log("data: ", data);
    res.json(data);
})


app.get('/distance', async (req, res) => {
    const data = await distance(req.query.value, req.query.miles);
    console.log("data: ", data);
    res.json(data);
})

async function distance(value, miles=true) {
    let fetchlink = '';
    if (miles) {
        fetchlink = `https://api.wolframalpha.com/v2/query?input=convert%20${value}%20miles%20to%20kilometers&format=plaintext&output=json&appid=${process.env.REACT_APP_WOLFRAM_ID}`
    } else {
        fetchlink = `https://api.wolframalpha.com/v2/query?input=convert%20${value}%20kilometers%20to%20miles&format=plaintext&output=json&appid=${process.env.REACT_APP_WOLFRAM_ID}`
    }
    const apidata = await fetch(fetchlink)
    const data = await apidata.json()
    console.log(data)

    const pods = data['queryresult']['pods'];
    const primaryDict = pods.find(item => item['primary'] === true);
    const resultText = primaryDict['subpods'][0]['plaintext'];

    return resultText;
}

async function calculate(percentage, total_number) {
    const apidata = await fetch(`https://api.wolframalpha.com/v1/query?input=${percentage}%25%20of%20${total_number}&appid=${process.env.REACT_APP_WOLFRAM_ID}&format=plaintext&output=json`)
    const data = await apidata.json()
    console.log(data)
    //     primary_dict = next(item for item in result['queryresult']['pods'] if item.get('primary') == True)
    //     return primary_dict['subpods'][0]['plaintext']
    // convert above into javascript
    const pods = data['queryresult']['pods'];
    const primaryDict = pods.find(item => item['primary'] === true);
    const resultText = primaryDict['subpods'][0]['plaintext'];

    return resultText;
}

app.get('/conversion', async (req, res) => {
    const data = await conversion(req.query.value, req.query.dollars);
    console.log("data: ", data);
    res.json(data);
})

async function conversion(value, dollars=true) {
    let fetchlink = '';
    if (dollars) {
        fetchlink = `https://api.wolframalpha.com/v2/query?input=convert%20${value}%20dollars%20to%20euros&format=plaintext&output=json&appid=${process.env.REACT_APP_WOLFRAM_ID}`
    } else {
        fetchlink = `https://api.wolframalpha.com/v2/query?input=convert%20${value}%20euros%20to%20dollars&format=plaintext&output=json&appid=${process.env.REACT_APP_WOLFRAM_ID}`
    }
    const apidata = await fetch(fetchlink)
    const data = await apidata.json()
    console.log(data)

    const pods = data['queryresult']['pods'];
    const primaryDict = pods.find(item => item['primary'] === true);
    const resultText = primaryDict['subpods'][0]['plaintext'];
    
    return resultText;
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