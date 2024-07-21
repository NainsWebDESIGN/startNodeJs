const check = () => window.location.href.includes("front-example.zeabur");

export const url = check() ? "https://back-example.zeabur.app" : "";
export const checkFront = check() ? "https://front-example.zeabur.app/#/success" : "http://localhost:1491/#/success";
export const checkBack = check() ? "https://back-example.zeabur.app/webPay/newebpay_notify" : "http://localhost:2862/webPay/newebpay_notify";