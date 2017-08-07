import express from 'express';
import path from 'path';
import morgan from 'morgan';

const app = express();

app.use(morgan('combined'));
app.use('/shartan', express.static(path.resolve(__dirname + '/../../build')));

const port = 3002;
app.listen(port, () => {
    console.log('listening on: ', port);
});