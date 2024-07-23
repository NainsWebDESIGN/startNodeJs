function env() {
    const _DEFAULT = {
        testValue: "Nains Front Project",
        emailRule: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
        unicode: (unicode) =>
            String.fromCharCode(parseInt(unicode.substring(2), 16)),
        url: "https://back-example.zeabur.app"
    }
    try {
        DEFAULT.url = window.location.href.includes("front-example.zeabur") ? "https://back-example.zeabur.app" : "";
    } catch (e) { }
    return _DEFAULT;
}
window['env'] = env();