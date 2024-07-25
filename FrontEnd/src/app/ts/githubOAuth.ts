import env from '@ts/env';

export default `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&redirect_uri=${env.url}${env.githubOAuthURI}&scope=user:email`;