// contracts/SupplyChain.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    uint public productCount = 0;

    struct Stage {
        string description;
        address verifier;
        uint timestamp;
        bool verified;
    }

    struct Product {
        uint id;
        string name;
        string origin;
        uint timestamp;
        Stage[] stages;
    }

    mapping(uint => Product) public products;

    event ProductCreated(uint id, string name, string origin, uint timestamp);
    event StageAdded(uint productId, string description, address verifier, uint timestamp, bool verified);
    event StageVerified(uint productId, uint stageIndex, address verifier, uint timestamp);

    constructor() {}

    // Create a new product
    function createProduct(string memory _name, string memory _origin) public {
        productCount++;
        emit ProductCreated(productCount, _name, _origin, block.timestamp);
    }

    // Add a new stage to a product
    function addStage(uint _productId, string memory _description, address _verifier) public {
        require(_productId > 0 && _productId <= productCount, "Product does not exist");
        Stage memory newStage = Stage({
            description: _description,
            verifier: _verifier,
            timestamp: block.timestamp,
            verified: false
        });
        products[_productId].stages.push(newStage);
        emit StageAdded(_productId, _description, _verifier, block.timestamp, false);
    }

    // Verify a stage
    function verifyStage(uint _productId, uint _stageIndex) public {
        require(_productId > 0 && _productId <= productCount, "Product does not exist");
        require(_stageIndex < products[_productId].stages.length, "Stage does not exist");
        Stage storage stage = products[_productId].stages[_stageIndex];
        require(msg.sender == stage.verifier, "Not authorized to verify this stage");
        require(!stage.verified, "Stage already verified");
        stage.verified = true;
        emit StageVerified(_productId, _stageIndex, msg.sender, block.timestamp);
    }

    // Get number of stages for a product
    function getStageCount(uint _productId) public view returns (uint) {
        require(_productId > 0 && _productId <= productCount, "Product does not exist");
        return products[_productId].stages.length;
    }

    // Get details of a specific stage
    function getStage(uint _productId, uint _stageIndex) public view returns (string memory, address, uint, bool) {
        require(_productId > 0 && _productId <= productCount, "Product does not exist");
        require(_stageIndex < products[_productId].stages.length, "Stage does not exist");
        Stage storage stage = products[_productId].stages[_stageIndex];
        return (stage.description, stage.verifier, stage.timestamp, stage.verified);
    }
}
