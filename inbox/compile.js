/*
///npm install --save solc@0.4.17 mocha ganache-cli web3@1.0.0-beta.26
npm install --global --production windows-build-tools@4.0.0
npm install
node compile.js


 */

const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Inbox'];
