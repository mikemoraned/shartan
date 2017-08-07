import express from 'express';
import path from 'path';
import morgan from 'morgan';

const app = express();

app.use(morgan('combined'));
app.use('/shartan', express.static(path.resolve(__dirname + '/../../build')));

app.get('/preview.png', (req, res) => {
    const base64Img = "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnElEQVR42u3" +
        "RAQ0AAAgDIE1u9FvDOahApzLFGS1ECEKEIEQIQoQgRIgQIQgRghAhCBGCECEIQYgQhAhBiBCE" +
        "CEEIQoQgRAhChCBECEIQIgQhQhAiBCFCEIIQIQgRghAhCBGCEIQIQYgQhAhBiBCEIEQIQoQgR" +
        "AhChCAEIUIQIgQhQhAiBCEIEYIQIQgRghAhCBEiRAhChCBECEK+W99M+TnxqRsqAAAAAElFTk" +
        "SuQmCC";
    const img = Buffer.from(base64Img, "base64");

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
    });
    res.end(img);
});

const port = 3002;
app.listen(port, () => {
    console.log('listening on: ', port);
});