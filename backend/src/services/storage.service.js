import ImageKit from "imagekit";
import config from "../config/config.js"

var imagekit = new ImageKit({
    publicKey: config.IMAGEKIT_PUBLIC_KEY,
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: config.IMAGEKIT_ENDPOINT_URL
});

export function uploadAudioFileOnImageKit(file, fileName) {
    return new Promise((resolve, reject) => {

        imagekit.upload(
            {
                file: file.buffer,
                fileName: fileName,
                folder: "sound-stream/audio-files",
            },
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

    });
}