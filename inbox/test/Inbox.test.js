const assert = require('assert');
const ganache = require('ganache-cli'); //Test-RPC
const Web3 = require('web3');

const web3 = new Web3(ganache.provider()); //Crea web3 instance collegata al provider di ganache (rete di test locale)

