import {create} from "zustand";
import {ABI, CONTRACT_ADDRESS, fetchProducts, LOCAL_RPC_URL} from "@/app/utils/supplyChain";
import {ethers} from "ethers";
import {ProductStatusEnum} from "@/app/utils/Enums";

export interface Product {
    productID: string;
    origin: string;
    currentHolder: string;
    status: ProductStatusEnum;
}

export interface ProductHistory {
    status: string;
    timestamp: any;
    updatedBy: string;
}

interface ProductStore {
    products: Product[];
    setProducts: (products: Product[]) => void;
    productsFetched: boolean;
    setProductsFetched: (fetched: boolean) => void;
    fetchProducts: () => Promise<void>;
    productsLoading: boolean;
    setProductsLoading: (loading: boolean) => void;
    createProduct: (product: {
        productID: string,
        origin: string
    }, selectedRole: string, roles: Record<string, string>) => Promise<void>;
    getProductHistory: (productID: ProductHistory[]) => Promise<void>
    productHistory: ProductHistory[];
    updateProductStatus: (productID: string, newStatus: ProductStatusEnum, selectedRole: string, roles: Record<string, string>) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    productsFetched: false,
    setProductsFetched: (fetched) => set({productsFetched: fetched}),
    fetchProducts: async () => {
        set({productsLoading: true});
        try {
            const fetchedProducts = await fetchProducts();
            set({products: fetchedProducts, productsFetched: true, productsLoading: false});
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    },
    productsLoading: false,
    setProductsLoading: (loading) => set({productsLoading: loading}),
    createProduct: async (product, selectedRole, roles) => {
        if (!selectedRole || selectedRole !== "SUPPLIER_ROLE") {
            alert("Only a supplier can create products!");
            return;
        }
        console.log("data", product, selectedRole, roles, CONTRACT_ADDRESS, ABI);
        try {
            const provider = new ethers.providers.JsonRpcProvider(LOCAL_RPC_URL);
            const signer = provider.getSigner(roles[selectedRole]);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
            const tx = await contract.createProduct(product.productID, product.origin);
            await tx.wait();
            set({productsFetched: false});
            await fetchProducts();
        } catch (error) {
            console.error("Error creating product:", error);
        }
    },
    getProductHistory: async (product) => {
        try {
            const provider = new ethers.providers.JsonRpcProvider(LOCAL_RPC_URL);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
            const history = await contract.getProductHistory(product);
            set({productHistory: history});
            console.log("Product history:", history);
        } catch (error) {
            console.error("Error fetching product history:", error);
        }
    },
    productHistory: [],
    updateProductStatus: async (productID, newStatus, selectedRole, roles) => {
        try {
            const provider = new ethers.providers.JsonRpcProvider(LOCAL_RPC_URL);
            const signer = provider.getSigner(roles[selectedRole]);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
            const tx = await contract.updateStatus(productID, newStatus);
            await tx.wait();

            // Refresh the state
            set({productsFetched: false});
            await fetchProducts();
        } catch (error) {
            console.error("Error updating product status:", error);
        }
    }
}));
