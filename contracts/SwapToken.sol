// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.24 ;

contract SwapToken {
    // this contract basically would have two tokens and you can swap these tokens
    // each token has a value. so when swapping their comparative value should be accounted
    // let each token be connected to an address
    // let each user be able to deposit each token and swap it then withdraw
    // one token would be the native token you would deposit into the account
    // the other token would be the swap token

    // string tokenA;
    uint256 public tokenA;
    uint256 public tokenB;
    address public owner;

    mapping (address => uint256) public tokenBalanceA;
    mapping (address => uint256) public tokenBalanceB;

    uint256 public exchangeRate = 10;

    constructor() {
        owner = payable(msg.sender);
    }

    function depositAmount(uint256 _amount, bool _isTokenA) external payable {
        require(_amount > 0, "Amount must be greater than zero");

        if (_isTokenA) {
            tokenBalanceA[msg.sender] += _amount;
        } else {
            tokenBalanceB[msg.sender] += _amount;
        }
    }

    function tokenSwap(uint256 _amount, bool _swapToA) external {
        require(_amount > 0, "Amount must be greater than zero");
        require(_swapToA != (tokenA == 0), "Cannot swap to the same token");

        uint256 amountToReceive = _amount * exchangeRate;

        if (_swapToA) {
            require(tokenBalanceB[msg.sender] >= amountToReceive, "Insufficient balance to swap");
            tokenBalanceB[msg.sender] -= amountToReceive;
            tokenBalanceA[msg.sender] += _amount;
        } else {
            require(tokenBalanceA[msg.sender] >= amountToReceive, "Insufficient balance to swap");
            tokenBalanceA[msg.sender] -= amountToReceive;
            tokenBalanceB[msg.sender] += _amount;
        }
    }

    function withdrawToken(uint256 _amount, bool _withdrawFromA) external {
        require(_amount > 0, "Amount must be greater than zero");

        if (_withdrawFromA) {
            require(tokenBalanceA[msg.sender] >= _amount, "Insufficient balance to withdraw");
            tokenBalanceA[msg.sender] -= _amount;
        } else {
            require(tokenBalanceB[msg.sender] >= _amount, "Insufficient balance to withdraw");
            tokenBalanceB[msg.sender] -= _amount;
        }
    }

    function checkBalance() external view returns(uint256, uint256) {
        return (tokenBalanceA[msg.sender], tokenBalanceB[msg.sender]);
    }



}