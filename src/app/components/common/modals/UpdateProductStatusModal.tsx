'use client';
import React, {useEffect, useState} from "react";
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Typography} from "@mui/material";
import {Product, useProductStore} from "@/app/utils/useProductStore";
import {ProductStatusEnum, RolesEnum} from "@/app/utils/Enums";
import {useAppStore} from "@/app/utils/appStore";

interface UpdateProductStatusModalProps {
    open: boolean;
    onClose: () => void;
}

const UpdateProductStatusModal: React.FC<UpdateProductStatusModalProps> = ({open, onClose}) => {
    const {products, updateProductStatus} = useProductStore();
    const {selectedRole, roles} = useAppStore();
    const [selectedProduct, setSelectedProduct] = useState("");
    const [oldStatus, setOldStatus] = useState<ProductStatusEnum | null>(null);
    const [newStatus, setNewStatus] = useState<ProductStatusEnum | null>(null);

    useEffect(() => {
        let determinedOldStatus: ProductStatusEnum | null = null;
        let determinedNewStatus: ProductStatusEnum | null = null;

        if (selectedRole === RolesEnum.MANUFACTURER_ROLE) {
            determinedOldStatus = ProductStatusEnum.CREATED;
            determinedNewStatus = ProductStatusEnum.MANUFACTURED;
        } else if (selectedRole === RolesEnum.LOGISTICS_ROLE) {
            determinedOldStatus = ProductStatusEnum.MANUFACTURED;
            determinedNewStatus = ProductStatusEnum.IN_TRANSIT;
        } else if (selectedRole === RolesEnum.RETAILER_ROLE) {
            determinedOldStatus = ProductStatusEnum.IN_TRANSIT;
            determinedNewStatus = ProductStatusEnum.AVAILABLE;
        }

        setOldStatus(determinedOldStatus);
        setNewStatus(determinedNewStatus);

    }, [selectedRole, products]);

    const handleUpdateStatus = () => {
        if (selectedProduct && newStatus && selectedRole) {
            updateProductStatus(selectedProduct, newStatus, selectedRole, roles);
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose} sx={{top: "20%"}}>
            <Box
                sx={{
                    p: 3,
                    backgroundColor: "white",
                    margin: "auto",
                    maxWidth: 400,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Update Product Status
                </Typography>
                <FormControl fullWidth sx={{mb: 2}}>
                    <InputLabel id="product-select-label">Select Product</InputLabel>
                    <Select
                        labelId="product-select-label"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        disabled={!oldStatus} // Disable if oldStatus is not set
                    >
                        {products
                            .filter((product: Product) => product.status === oldStatus)
                            .map((product: Product) => (
                                <MenuItem key={product.productID} value={product.productID}>
                                    {product.productID}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleUpdateStatus}
                    disabled={!selectedProduct || !newStatus} // Disable if no product or newStatus
                >
                    Update Status
                </Button>
            </Box>
        </Modal>
    );
};

export default UpdateProductStatusModal;

