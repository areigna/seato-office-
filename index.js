const record = require('node-record-lpcm16');
const Snowboy = require('snowboy');
const Detector = Snowboy.Detector;
const Models = Snowboy.Models;

const models = new Models();

models.add({
  file: './alexa.umdl',
  sensitivity: '0.5',
  hotwords : 'alexa'
});

const detector = new Detector({
  resource: "./common.res",
  models: models,
  audioGain: 2.0
});

/*
detector.on('silence', function () {
  console.log('silence');
});

detector.on('sound', function (buffer) {
  console.log('sound');
});
*/

detector.on('error', function () {
  console.log('error');
});

detector.on('hotword', function (index, hotword, buffer) {
  //console.log(buffer);
  console.log('hotword', index, hotword);
});

const mic = record.start({
  threshold: 0,
  // verbose: true
});

mic.pipe(detector);
