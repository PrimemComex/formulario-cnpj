const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const { method, body, queryStringParameters } = event;

    // URL do Bitrix24
    const bitrixUrl = "https://primem.bitrix24.com.br/rest/89/2h0usfzkv0bo8jqo/" + event.path.split('/proxy/')[1];

    try {
        const response = await fetch(bitrixUrl, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: method === "POST" ? body : undefined
        });

        const data = await response.json();

        return {
            statusCode: response.status,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
