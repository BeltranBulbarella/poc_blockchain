import React from "react";
import { Box, Modal, Typography } from "@mui/material";

interface ProductModalProps {
    open: boolean;
    onClose: () => void;
    product: any;
}

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, product }) => {
    if (!product) return null;

    return (
        <Modal open={open} onClose={onClose} sx={{top: "20%"}}>
            <Box sx={{ p: 3, backgroundColor: "white", margin: "auto", maxWidth: 500 }}>
                <Typography variant="h6">Product Details</Typography>
                <Typography>ID: {product.productID}</Typography>
                <Typography>Origin: {product.origin}</Typography>
                <Typography>Status: {product.status}</Typography>
                <Typography>Holder: {product.currentHolder}</Typography>
            </Box>
        </Modal>
    );
};

export default ProductModal;
