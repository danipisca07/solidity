pragma solidity ^0.5.16;
import 'hardhat/console.sol';

interface IERC20 {
    function balanceOf(address _owner) external view returns (uint256 balance);
    function transfer(address _to, uint256 _value) external returns (bool success);
}

interface IFlashloanReceiver {
    function executeOperation(address sender, address underlying, uint amount, uint fee, bytes calldata params) external;
}

interface ICTokenFlashloan {
    function flashLoan(address receiver, uint amount, bytes calldata params) external;
}

// FlashloanReceiver is a simple flashloan receiver sample code
contract FlashloanExample is IFlashloanReceiver {

    address public owner;
    constructor() public {
      owner = msg.sender;
    }

    function doFlashloan(address cToken, uint256 borrowAmount, address origToken) external {
        // console.log("doFlashload reaches");
        // console.log("cToken: %s", cToken);
        // console.logAddress(msg.sender);
        uint origBalance = IERC20(origToken).balanceOf(address(this));
        console.log("Original balance: %s", origBalance);
        require(msg.sender == owner, "not owner");

        bytes memory data = "0x";

        // call the flashLoan method
        ICTokenFlashloan(cToken).flashLoan(address(this), borrowAmount, data);
    }

    // this function is called after your contract has received the flash loaned amount
    function executeOperation(address sender, address underlying, uint amount, uint fee, bytes calldata params) external {
        // console.log("executeOperation reaches");
        // console.log("Sender2: %s", sender);
        // console.log("Underlying: %s", underlying);
        address cToken = msg.sender;

        uint currentBalance = IERC20(underlying).balanceOf(address(this));
        console.log("Current balance: %s", currentBalance);
        require(currentBalance >= amount, "Invalid balance, was the flashLoan successful?");

        //
        // Your logic goes here.
        // !! Ensure that *this contract* has enough of `underlying` funds to payback the `fee` !!
        //


        // transfer fund + fee back to cToken
        require(IERC20(underlying).transfer(cToken, amount + fee), "Transfer fund back failed");
    }
}

