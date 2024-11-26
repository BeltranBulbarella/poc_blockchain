import ProductsTable from "@/app/components/common/ProductsTable";
import RolesSelect from "@/app/components/common/RolesSelect";
import {Box} from "@mui/material";

export default function Page() {
    return (
        <Box>
            <ProductsTable />
            <RolesSelect />
        </Box>
    );
}
