const SupplyChain = artifacts.require("SupplyChain");

module.exports = async function (callback) {
    try {
        const supplyChain = await SupplyChain.deployed();
        const accounts = await web3.eth.getAccounts();

        // Define sample products
        const products = [
            { productID: "product1", origin: "USA" },
            { productID: "product2", origin: "Germany" },
            { productID: "product3", origin: "Japan" },
        ];

        // Add products using the supplier account
        for (const product of products) {
            await supplyChain.createProduct(product.productID, product.origin, {
                from: accounts[1], // Supplier account
            });
            console.log(`Product created: ${product.productID}, Origin: ${product.origin}`);
        }

        callback();
    } catch (error) {
        console.error("Error adding products:", error);
        callback(error);
    }
};
