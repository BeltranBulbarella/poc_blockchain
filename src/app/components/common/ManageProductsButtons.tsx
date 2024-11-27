'use client';
import {useAppStore} from "@/app/utils/appStore";
import {Box, Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import CreateProductModal from "@/app/components/common/modals/CreateProductModal";
import {RolesEnum} from "@/app/utils/Enums";
import UpdateProductStatusModal from "@/app/components/common/modals/UpdateProductStatusModal";


export const ManageProductsButtons = () => {
    const {selectedRole, roles} = useAppStore();
    const [modals, setModals] = useState({
        createProduct: false,
        updateProductStatus: false,
    });

    const handleOpenModal = (modalName: keyof typeof modals) => {
        setModals((prev) => ({...prev, [modalName]: true}));
    };

    const handleCloseModal = (modalName: keyof typeof modals) => {
        setModals((prev) => ({...prev, [modalName]: false}));
    };

    return (
        <Box sx={{display: "flex", justifyContent: "center", gap: 2}}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenModal("createProduct")}
                disabled={selectedRole !== RolesEnum.SUPPLIER_ROLE}
                startIcon={<AddIcon/>}
            >
                Create Product
            </Button>
            <CreateProductModal
                open={modals.createProduct}
                onClose={() => handleCloseModal("createProduct")}
                roles={roles}
                selectedRole={selectedRole}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenModal("updateProductStatus")}
                disabled={selectedRole !== (RolesEnum.MANUFACTURER_ROLE || RolesEnum.LOGISTICS_ROLE || RolesEnum.RETAILER_ROLE)}
                startIcon={<AddIcon/>}
            >
                Update Product Status
            </Button>
            <UpdateProductStatusModal
                open={modals.updateProductStatus}
                onClose={() => handleCloseModal("updateProductStatus")}
            />
        </Box>
    );
};
