import CDP from 'chrome-remote-interface';
import fs from 'fs';

async function screenshot(url, format) {
    console.log(url, ", ", format);

    let client;
    try {
        client = await CDP();
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
                const screenshot = await Page.captureScreenshot({format, fromSurface: true});
                const buffer = new Buffer(screenshot.data, 'base64');
                fs.writeFile('output.png', buffer, 'base64', function (err) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('Screenshot saved');
                    }
                    client.close();
                });
            }, delay);
        });
    } catch (err) {
        console.error(err);
    } finally {
        // if (client) {
        //     await client.close();
        // }
    }
}

// const url = "https://github.com";
const url = "http://localhost:3002/shartan/";
// const url = "http://localhost:3000/";
const format = "png";
screenshot(url, format);

