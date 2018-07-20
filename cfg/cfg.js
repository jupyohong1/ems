// cfg/cfg.js

const fs = require('fs');
const CONFIG_FILE = __dirname + '\\config.json';

let CONFIG = {};
CONFIG = JSON.parse(
    fs.readFileSync(CONFIG_FILE, 'utf8')
);

module.exports = CONFIG;
