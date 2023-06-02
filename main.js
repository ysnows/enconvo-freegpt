var free = require('./free.js');

function main(text, contextText, completion, streamHandler) {

    (async () => {
        // 如果是中文则翻译成英文，否则翻译成中文
        try {
            try {
                let chatResult = await free.translate(contextText.value.messages)
                console.log(chatResult)
                // streamHandler({
                //     result: {
                //         "type": "text",
                //         "value": chatResult,
                //     },
                // });
                completion({
                    result: {
                        "type": "text",
                        "value": chatResult,
                    },
                });
            } catch (e) {
                throw e;
            }
        } catch (e) {
            Object.assign(e, {
                _type: 'error',
                _message: '接口请求错误 - ' + JSON.stringify(e),
            });
            throw e;
        }
    })().catch((err) => {
        console.log(err);
        completion({
            result: {
                type: "error",
                value: err._message || '未知错误',
            },
        });
    });
}


