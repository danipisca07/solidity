pragma solidity >=0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HelloWorld.sol";

contract TestHelloWorld {
    function testMessage() public {
        HelloWorld helloWorld = HelloWorld(DeployedAddresses.HelloWorld());
        string memory message = helloWorld.getMessage();
        Assert.equal(message, "initialMessage", "It should be initialMessage");
    }
}