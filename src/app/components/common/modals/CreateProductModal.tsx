'use client';
import React, {useState} from "react";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {useProductStore} from "@/app/utils/useProductStore";

interface ProductModalProps {
    open: boolean;
    onClose: () => void;
    roles: Record<string, string>;
    selectedRole: string | null;
}

const CreateProductModal: React.FC<ProductModalProps> = ({open, onClose, roles, selectedRole}) => {
    const [productID, setProductID] = useState('');
    const [origin, setOrigin] = useState('');
    const {createProduct} = useProductStore();

    const handleCreateProduct = () => {
        if (selectedRole) {
            createProduct({productID, origin}, selectedRole, roles).then(() => {
                onClose();
            });
        }
    };

    return (
        <Modal open={open} onClose={onClose} sx={{top: "20%"}}>
            <Box sx={{
                p: 3,
                backgroundColor: "white",
                margin: "auto",
                maxWidth: 500,
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}>
                <Typography variant="h6" sx={{display: "flex", justifyContent: "center"}}>Create Product</Typography>
                <TextField variant='outlined' label="Product ID" value={productID}
                           onChange={(e) => setProductID(e.target.value)}/>
                <TextField variant='outlined' label="Origin" value={origin}
                           onChange={(e) => setOrigin(e.target.value)}/>
                <Button variant="contained" color="primary" onClick={handleCreateProduct} disabled={!productID || !origin}>
                    Create
                </Button>
            </Box>
        </Modal>
    );
};

export default CreateProductModal;
