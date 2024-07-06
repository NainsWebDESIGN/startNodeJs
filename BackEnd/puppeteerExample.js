const puppeteer = require('puppeteer');
require('dotenv').config(); // 載入.env 檔案
const { testValue } = process.env; // 取得環境變數

const waitForTimeout = (t) => new Promise(resolve => setTimeout(resolve, t * 1000)); // 等待指定秒數
const checkClickDom = async (page, selector) => {
    await page.waitForSelector(selector); // 檢查有這個元素
    await page.click(selector); // 點擊按鈕
}

(async () => {
    const browser = await puppeteer.launch({
        executablePath:
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // 這是 MacOS 的 Chrome 路徑
        // 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe' // 這是 Windows 的 Chrome 路徑
        headless: false // 無外殼的 Chrome，有更佳的效能
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 1500, height: 1000 }); // 設定視窗大小

    await page.goto('https://frontexample.zeabur.app/', { // 前往這個網址
        waitUntil: 'networkidle2',
    });

    // await page.pdf({ path: 'hn.pdf', format: 'a4' }); // 取得ＰＤＦ檔
    // await page.screenshot({ path: 'example.png' }); // 取得圖片

    const input_1 = "body > app-root > div > input";
    checkClickDom(page, input_1);

    await page.evaluate(() => document.querySelector("body > app-root > div > input").value = ""); // 先確保 input 為空

    await page.type(input_1, testValue); // 對 input 輸入testValue文字

    const expectValue = 123; // 期待的數值
    const value = await page.$eval(input_1, el => el.value.trim()); // 取得 input 值

    // 驗證是否相同
    if (value == expectValue) {
        console.log("驗證成功");
    } else {
        console.log(`驗證失敗, 期待值: ${expectValue}, 實際值: ${value}`);
    }

    checkClickDom(page, 'body > app-root > div > button'); // 點擊新增按鈕

    await waitForTimeout(1); // 等待 1 秒

    await browser.close(); // 關閉瀏覽器
})();