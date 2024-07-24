import env from '@ts/env';

const HOST = "http://localhost:2862";

export default `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&redirect_uri=${env.url}${env.redirectURI}&scope=user:email`;