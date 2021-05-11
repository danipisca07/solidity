pragma solidity >=0.4.22 <0.9.0;
contract HelloWorld {
    string public message;
    constructor () public {
        message = "initialMessage";
    }

    function update(string memory newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns(string memory){
        return message;
    }
}