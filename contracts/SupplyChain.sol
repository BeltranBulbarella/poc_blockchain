pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract SupplyChain is AccessControl {
    // Define roles using OpenZeppelin's AccessControl
    bytes32 public constant SUPPLIER_ROLE = keccak256("SUPPLIER_ROLE");
    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");
    bytes32 public constant LOGISTICS_ROLE = keccak256("LOGISTICS_ROLE");
    bytes32 public constant RETAILER_ROLE = keccak256("RETAILER_ROLE");
    bytes32 public constant CONSUMER_ROLE = keccak256("CONSUMER_ROLE");

    struct StatusUpdate {
        string status;
        address updatedBy;
        uint256 timestamp;
    }

    struct Product {
        string productID;
        string origin;
        address currentHolder;
        string status;
        StatusUpdate[] history;
    }

    // Mapping from productID to Product
    mapping(string => Product) public products;
    string[] public productList;

    // Events to emit for frontend tracking
    event ProductCreated(string productID, string origin, address indexed supplier);
    event ProductStatusUpdated(string productID, string status, address indexed updater);

    constructor() {
        // Grant the contract deployer the default admin role: it will be able
        // to grant and revoke any roles
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // Modifier to check if product exists
    modifier productExists(string memory _productID) {
        require(bytes(products[_productID].productID).length != 0, "Product does not exist");
        _;
    }

    // Function to create a new product
    function createProduct(string memory _productID, string memory _origin) public onlyRole(SUPPLIER_ROLE) {
        require(bytes(_productID).length > 0, "Product ID is required");
        require(bytes(_origin).length > 0, "Origin is required");
        require(bytes(products[_productID].productID).length == 0, "Product already exists");

        Product storage newProduct = products[_productID];
        newProduct.productID = _productID;
        newProduct.origin = _origin;
        newProduct.currentHolder = msg.sender;
        newProduct.status = "Created";

        newProduct.history.push(StatusUpdate({
            status: "Created",
            updatedBy: msg.sender,
            timestamp: block.timestamp
        }));

        productList.push(_productID);

        emit ProductCreated(_productID, _origin, msg.sender);
    }

    // Function to update product status
    function updateStatus(string memory _productID, string memory _status) public productExists(_productID) {
        Product storage product = products[_productID];

        // Check role based on status
        if (keccak256(bytes(_status)) == keccak256(bytes("Manufactured"))) {
            require(hasRole(MANUFACTURER_ROLE, msg.sender), "Caller is not a Manufacturer");
        } else if (keccak256(bytes(_status)) == keccak256(bytes("In Transit"))) {
            require(hasRole(LOGISTICS_ROLE, msg.sender), "Caller is not Logistics Provider");
        } else if (keccak256(bytes(_status)) == keccak256(bytes("Available for Sale"))) {
            require(hasRole(RETAILER_ROLE, msg.sender), "Caller is not Retailer");
        } else {
            revert("Invalid status update");
        }

        product.status = _status;
        product.currentHolder = msg.sender;

        product.history.push(StatusUpdate({
            status: _status,
            updatedBy: msg.sender,
            timestamp: block.timestamp
        }));

        emit ProductStatusUpdated(_productID, _status, msg.sender);
    }

    // Function to get product details
    function getProduct(string memory _productID) public view productExists(_productID) returns (
        string memory productID,
        string memory origin,
        address currentHolder,
        string memory status
    ) {
        Product storage product = products[_productID];
        return (
            product.productID,
            product.origin,
            product.currentHolder,
            product.status
        );
    }

    // Function to get product history
    function getProductHistory(string memory _productID) public view productExists(_productID) returns (
        StatusUpdate[] memory
    ) {
        Product storage product = products[_productID];
        return product.history;
    }

    // Function to assign roles to addresses
    function assignRole(bytes32 role, address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(role, account);
    }
}

