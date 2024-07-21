const check = () => window.location.href.includes("front-example.zeabur");

export const url = check() ? "https://back-example.zeabur.app" : "";