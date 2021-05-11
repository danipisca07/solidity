# Truffle
[Link](https://medium.com/swlh/develop-test-and-deploy-your-first-ethereum-smart-contract-with-truffle-14e8956d69fc)  
Create new project: *truffle init*.  
Setup network in *truffle-config.js*.  
Create .sol contract under *contracts*.  
Create new migration under *migrations*.  
(not needed) Run *truffle compile*.  
Run *truffle migrate*.  

Tests:  
Create test .sol file under *test*.  
Run *truffle test*.  

## Ganache fork start
```
ganache-cli --fork https://mainnet.infura.io/v3/<apikey> -p 8545 -u <addressToUnlock> --mnemonic <menomin words separated with space>
```