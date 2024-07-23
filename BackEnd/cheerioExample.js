import { axios } from "axios";
import { cheerio } from "cheerio";

const url = "https://www.ettoday.net/?from=rf";

// 發送HTTP GET請求來獲取網頁內容
axios
  .get(url)
  .then((response) => {
    const html = response.data;
    console.log(html);
    // const $ = cheerio.load(html);
    // console.log("response", response.data);
    // // 遍歷table中的每行（tr）
    // $("#tblDetail tr").each((index, element) => {
    //   if (index === 0) {
    //     // 忽略標題行
    //     return;
    //   }

    //   const columns = $(element).find("td");
    //   const period = $(columns[0]).text().trim();
    //   const transaction = $(columns[1]).text().trim();
    //   const changePercent = $(columns[3]).text().trim();
    //   const netBuySell = $(columns[18]).text().trim();

    //   // 輸出到控制台
    //   console.log({
    //     期別: period,
    //     成交: transaction,
    //     "漲跌(%)": changePercent,
    //     "三大法人合計(買賣超(張))": netBuySell,
    //   });
    // });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    console.log("error", error);
  });
