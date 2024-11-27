'use client';
import React, {useEffect} from "react";
import {Box, List, ListItem, ListItemText, Modal, Typography} from "@mui/material";
import {useProductStore} from "@/app/utils/useProductStore";


interface ProductModalProps {
    open: boolean;
    onClose: () => void;
    product: any;
}

const ProductModal: React.FC<ProductModalProps> = ({open, onClose, product}) => {
    const {getProductHistory, productHistory} = useProductStore();

    useEffect(() => {
        if (product) {
            getProductHistory(product.productID);
        }
    }, [product]);

    if (!product || !productHistory) {
        return null;
    }

    return (
        <Modal open={open} onClose={onClose} sx={{top: "20%"}}>
            <Box sx={{p: 3, backgroundColor: "white", margin: "auto", maxWidth: 500, borderRadius: 2, boxShadow: 3}}>
                <Typography variant="h6" gutterBottom>Product Details</Typography>
                <Typography>ID: {product.productID}</Typography>
                <Typography>Origin: {product.origin}</Typography>
                <Typography>Status: {product.status}</Typography>
                <Typography>Holder: {product.currentHolder}</Typography>

                <Typography variant="h6" sx={{mt: 3}}>Product History</Typography>
                <List>
                    {productHistory.map((entry: any, index: number) => (
                        <ListItem key={index} sx={{borderBottom: '1px solid #e0e0e0'}}>
                            <ListItemText
                                primary={`Status: ${entry.status}`}
                                secondary={
                                    <>
                                        <Typography component="span" variant="body2" color="text.primary">
                                            Updated By: {entry.updatedBy}
                                        </Typography>
                                        <br />
                                        <Typography component="span" variant="body2" color="text.secondary">
                                            Timestamp: {new Date(Number(entry.timestamp) * 1000).toLocaleString()}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Modal>
    );
};

export default ProductModal;
