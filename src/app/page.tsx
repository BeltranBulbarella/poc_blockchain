import ProductsTable from "@/app/components/common/ProductsTable";
import RolesSelect from "@/app/components/common/RolesSelect";
import {Box} from "@mui/material";
import {ManageProductsButtons} from "@/app/components/common/ManageProductsButtons";

export default function Page() {
    return (
        <Box>
            <ProductsTable />
            <RolesSelect />
            <ManageProductsButtons />
        </Box>
    );
}
