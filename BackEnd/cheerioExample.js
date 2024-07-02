const axios = require("axios");
const cheerio = require("cheerio");

// 發送HTTP GET請求來獲取網頁內容
axios
  .get(
    "https://goodinfo.tw/tw/ShowBuySaleChart.asp?STOCK_ID=2330&CHT_CAT=DATE&PRICE_ADJ=F&SHEET=%E4%B8%89%E5%A4%A7%E6%B3%95%E4%BA%BA%E8%B2%B7%E8%B3%A3%E5%BC%B5%E6%95%B8&INITIALIZED=T"
  )
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    console.log("response", response.data);
    // 遍歷table中的每行（tr）
    $("#tblDetail tr").each((index, element) => {
      if (index === 0) {
        // 忽略標題行
        return;
      }

      const columns = $(element).find("td");
      const period = $(columns[0]).text().trim();
      const transaction = $(columns[1]).text().trim();
      const changePercent = $(columns[3]).text().trim();
      const netBuySell = $(columns[18]).text().trim();

      // 輸出到控制台
      console.log({
        期別: period,
        成交: transaction,
        "漲跌(%)": changePercent,
        "三大法人合計(買賣超(張))": netBuySell,
      });
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    console.log("error", error);
  });
