const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/getBodyHTML', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(req.query.url);
    await page.waitForSelector('body');

    const bodyHTML = await page.$eval('body', element => element.innerHTML);

    await browser.close();

    res.send(bodyHTML);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
