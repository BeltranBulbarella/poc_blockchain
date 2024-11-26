import {create} from "zustand";
import {fetchProducts} from "@/app/utils/supplyChain";

export interface Product {
    productID: string;
    origin: string;
    currentHolder: string;
    status: string;
}

interface ProductStore {
    products: Product[];
    setProducts: (products: Product[]) => void;
    productsFetched: boolean;
    setProductsFetched: (fetched: boolean) => void;
    fetchProducts: () => Promise<void>;
    productsLoading: boolean;
    setProductsLoading: (loading: boolean) => void;
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
}));
// const createProduct = async () => {
//     if (!selectedRole || selectedRole !== "SUPPLIER_ROLE") {
//         alert("Only a supplier can create products!");
//         return;
//     }
//
//     try {
//         const provider = new ethers.providers.JsonRpcProvider(LOCAL_RPC_URL);
//         const signer = provider.getSigner(roles[selectedRole]);
//         const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
//
//         await contract.createProduct(`product_${Date.now()}`, "Test Origin");
//         alert("Product created!");
//     } catch (error) {
//         console.error("Error creating product:", error);
//     }
// };
