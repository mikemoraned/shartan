import Sett from './shared/shartan/Sett';
import CanvasRenderer from './shared/shartan/CanvasRenderer';
import Canvas from 'canvas';
import fs from 'fs';

const canvas = new Canvas(200, 200);
const context = canvas.getContext('2d');

const out = fs.createWriteStream('./sett.png');
const stream = canvas.pngStream();

stream.on('data', function(chunk){
    out.write(chunk);
});

stream.on('end', function(){
    console.log('saved png');
});

const sett = new Sett();
const renderer = new CanvasRenderer();
const dimensions = {
  width: 100,
  height: 100
};
renderer.renderSett(sett, context, dimensions);




