export default {
  production: true,
  testValue: "Nains Prod Project",
  emailRule: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
  unicode: (unicode) =>
    String.fromCharCode(parseInt(unicode.substring(2), 16)),
  url: window.location.href.includes("front-example.zeabur") ? "https://back-example.zeabur.app" : ""
};
