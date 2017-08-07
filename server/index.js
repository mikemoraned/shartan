import CDP from 'chrome-remote-interface';
import express from 'express';
import path from 'path';
import morgan from 'morgan';

const app = express();

app.use(morgan('combined'));
app.use('/', express.static(path.resolve(__dirname + '/../../build')));

const port = process.argv[2];

async function fetchScreenshot(url, viewport, imageHandler) {
    const client = await CDP();
    console.log("got client");

    const { Emulation, Page } = client;

    await Page.enable();

    const deviceMetrics = {
        width: viewport.width,
        height: viewport.height,
        deviceScaleFactor: 0,
        mobile: false,
        fitWindow: false,
    };
    await Emulation.setDeviceMetricsOverride(deviceMetrics);
    await Emulation.setVisibleSize({width: viewport.width, height: viewport.height});

    await Page.navigate({url});

    console.log("navigated to ", url);

    Page.loadEventFired(async () => {
        console.log("load event fired");

        const delay = 200;
        setTimeout(async () => {
            const screenshot = await Page.captureScreenshot({ format: "png", fromSurface: true });
            const img = Buffer.from(screenshot.data, "base64");
            console.log("created image");

            imageHandler(img);
            console.log("passed image");

            client.close();
            console.log("closed client");
        }, delay);
    });
}

app.get('/preview.png', async (req, res) => {
    const url = (req.hostname === "localhost") ?
        ("http://" + req.hostname + ":" + port + "/") : ("http://" + req.hostname + "/");
    console.log("url: ", url);

    await fetchScreenshot(url, { width: 400, height: 400 }, (img) => {
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });
        res.end(img);
    });
});

app.listen(port, () => {
    console.log('listening on: ', port);
});