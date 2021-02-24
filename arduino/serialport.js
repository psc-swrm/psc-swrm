const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/cu.usbmodem143201', {
  autoOpen: false,
  baudRate: 9600,
});
const parser = port.pipe(new Readline());

parser.on('data', console.log)

