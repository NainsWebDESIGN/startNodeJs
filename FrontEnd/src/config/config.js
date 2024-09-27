function env() {
  const _DEFAULT = {
    testValue: "Nains Front Project",
    emailRule:
      /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
    unicode: (unicode) =>
      String.fromCharCode(parseInt(unicode.substring(2), 16)),
    url: "https://back-example.zeabur.app",
    GITHUB_CLIENT_ID: "Ov23ct9WXyQ1HTRQkrWa",
    githubOAuthURI: "/githubOAuth/callback",
    googleOAuthURI: "/googleOAuth/login",
    LINE_CLIENT_ID: "2005925311",
    LINE_CLIENT_SECRET: "cf503c9d094c7987408d999dc70da629",
    LINE_URL: "https://access.line.me/oauth2/v2.1/authorize?",
    LINE_API: "https://api.line.me/oauth2/v2.1/token",
    FRONT_URL: "https://front-example.zeabur.app",
  };
  const Location = window.location.href.includes("front-example.zeabur");

  try {
    _DEFAULT.url = Location ? "https://back-example.zeabur.app" : "";
  } catch (e) {
    console.log(`Config url Error: ${e}`);
  }
  try {
    _DEFAULT.FRONT_URL = Location ? "https://front-example.zeabur.app" : "";
  } catch (e) {
    console.log(`Config FRONT_URL Error: ${e}`);
  }
  return _DEFAULT;
}
window["env"] = env();
