const CryptoJS = require("crypto-js");
const {random_safe} = require("./e.js");

async function translate(messages) {
    try {
        let A = messages;
        // 如果是翻译模式,需要拼接
        const L = Date.now();
        let url = random_safe($option.route);
        const resp = await fetch(
            url,
            {
                method: "POST",
                body: {
                    messages: A,
                    time: L,
                    pass: null,
                    sign: await generateSignature({
                        t: L,
                        m: (A && A[A.length - 1] && A[A.length - 1].content) ? A[A.length - 1].content : ""
                    })
                },
                header: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
                }
            });

        return resp.text();
    } catch (e) {
        console.log(e);
        throw e
    }
}

async function digestMessage(r) {
    const hash = CryptoJS.SHA256(r);
    return hash.toString(CryptoJS.enc.Hex);
}

async function generateSignature(r) {
    const {t: e, m: t} = r;
    const n = {}.PUBLIC_SECRET_KEY;
    const a = `${e}:${t}:${n}`;
    const rs = await digestMessage(a);
    return rs;
}

exports.translate = translate;
