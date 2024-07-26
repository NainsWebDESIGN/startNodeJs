import { LineToken, PostLine } from '@ts/interface';
import env from '@ts/env';
export const lineToken: LineToken = {
    response_type: "code",
    client_id: env.LINE_CLIENT_ID,
    redirect_uri: env.FRONT_URL,
    state: "shizuna1223",
    scope: "profile%20openid%20email",
    nonce: "NainsStartNodeJs",
    prompt: "consent",
    max_age: "241000",
    ui_locales: "zh-tw",
    bot_prompt: "normal"
}
export const postLine: PostLine = {
    grant_type: "authorization_code",
    code: "",
    redirect_uri: env.FRONT_URL,
    client_id: env.LINE_CLIENT_ID,
    client_secret: env.LINE_CLIENT_SECRET
}