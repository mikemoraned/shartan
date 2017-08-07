import CDP from 'chrome-remote-interface';
import express from 'express';
import path from 'path';
import morgan from 'morgan';

const app = express();

app.use(morgan('combined'));
app.use('/shartan', express.static(path.resolve(__dirname + '/../../build')));

// const url = "http://localhost:3002/shartan/";
const url = "https://github.com";
app.get('/preview.png', async (req, res) => {
    const client = await CDP();
    console.log("got client");

    const {Network, Page} = client;

    Network.requestWillBeSent((params) => {
        console.log(params.request.url);
    });

    await Promise.all([Network.enable(), Page.enable()]);
    await Page.navigate({url});

    console.log("navigated to ", url);

    await Page.loadEventFired(async () => {
        console.log("load event fired");

        const delay = 5000;
        setTimeout(async () => {
            const screenshot = await Page.captureScreenshot({format:"png", fromSurface: true});
            const img = Buffer.from(screenshot.data, "base64");
            console.log("created image");

            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': img.length
            });
            res.end(img);
            console.log("sent image");

            client.close();
            console.log("closed client");
        }, delay);
    });

    // const base64Img = "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnElEQVR42u3" +
    //     "RAQ0AAAgDIE1u9FvDOahApzLFGS1ECEKEIEQIQoQgRIgQIQgRghAhCBGCECEIQYgQhAhBiBCE" +
    //     "CEEIQoQgRAhChCBECEIQIgQhQhAiBCFCEIIQIQgRghAhCBGCEIQIQYgQhAhBiBCEIEQIQoQgR" +
    //     "AhChCAEIUIQIgQhQhAiBCEIEYIQIQgRghAhCBEiRAhChCBECEK+W99M+TnxqRsqAAAAAElFTk" +
    //     "SuQmCC";
    // const img = Buffer.from(base64Img, "base64");
    // console.log("created image");
    //
    // res.writeHead(200, {
    //     'Content-Type': 'image/png',
    //     'Content-Length': img.length
    // });
    // res.end(img);
    // console.log("sent image");
    //
    // client.close();
    // console.log("closed client");
});

const port = 3002;
app.listen(port, () => {
    console.log('listening on: ', port);
});