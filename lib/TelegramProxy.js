const TeleBot = require('telebot');
const mime = require('mime');
const FileType = require('file-type');

const defaultValue = {
    ext: '',
    mime: ''
}

const getMimeType = async (filename, buffer) => {

    const mimeTypeFromFilename = mime.getType(filename);
    if (mimeTypeFromFilename) {
        return {
            ext: mime.getExtension(mimeTypeFromFilename),
            mime: mimeTypeFromFilename
        };

    }

    return FileType.fromBuffer(buffer)
      .then(res => res ? res : defaultValue)
      .catch(e => defaultValue)
}

class TelegramProxy {

    constructor(config) {
        this.bot = new TeleBot(config.token);
        this.bot.start();

        this.config = config;
    }

    async send(filename, stream) {
        const buffer = stream.toBuffer();
        const {  ext, mime: mimeType  } = await getMimeType(filename, buffer);
        console.log('mimeType', mimeType);
        filename = filename.includes(ext) ? filename : `${filename}.${ext}`;
        console.log('filename', filename);

        const options = {
            fileName: filename
        };

        this.config.chatIds.forEach(chatId => {
            const params = [chatId, buffer, options];
            if (mimeType.match(/image\/gif/)) {
                this.bot.sendAnimation(...params);
            } else if (mimeType.match(/^image\//)) {
                this.bot.sendPhoto(...params);
            } else if (mimeType.match(/^video\//)) {
                this.bot.sendVideo(...params);
            } else if (mimeType.match(/^audio\//)) {
                this.bot.sendAudio(...params);
            } else if (mimeType === 'application/pdf') {
                this.bot.sendDocument(...params);
            } else {
                this.bot.sendDocument(...params);
            }
        });
    }
}

module.exports = TelegramProxy;