module.exports = {
    ftp: {
        url: 'ftp://0.0.0.0:21',
        pasv: {
            ip: '0.0.0.0',
            portMin: process.env.FTP_PASSIVE_PORT_MIN,
            portMax: process.env.FTP_PASSIVE_PORT_MAX,
        },
        credentials: {
            [process.env.FTP_USERNAME]: process.env.FTP_PASSWORD
        }
    },

    telegram: {
        token: process.env.TELEGRAM_TOKEN,
        chatIds: [process.env.TELEGRAM_CHAT_IDS]
    }
};