import express from 'express';
import Canvas from 'canvas';

import Sett from '../src/shared/shartan/Sett';
import CanvasRenderer from '../src/shared/shartan/CanvasRenderer';

const app = express();
const renderer = new CanvasRenderer();

app.use('/', express.static('../build'));

app.get('/sett.png', function (req, res) {
    const sett = new Sett();
    const dimensions = {
        width: 100,
        height: 100
    };
    const canvas = new Canvas(dimensions.width, dimensions.height);
    const context = canvas.getContext('2d');

    renderer.renderSett(sett, context, dimensions);

    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(canvas.toBuffer(), 'binary');
});

const port = process.argv[2];
app.listen(port, () => console.log(`Example app listening on port ${port}!`));