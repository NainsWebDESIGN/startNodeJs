const _url = window.location.href;

export const url = _url.includes("front-example.zeabur") ? "https://back-example.zeabur.app" : "";
export const checkFront = _url.includes("front-example.zeabur") ? "https://front-example.zeabur.app/#/success" : "http://localhost:1491/#/success";
export const checkBack = _url.includes("front-example.zeabur") ? "https://back-example.zeabur.app" : "http://localhost:2862/";