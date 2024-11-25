// migrations/2_deploy_supplychain.js
const SupplyChain = artifacts.require("SupplyChain");

module.exports = function (deployer) {
    deployer.deploy(SupplyChain);
};
