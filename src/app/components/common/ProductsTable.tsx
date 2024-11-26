'use client';
import React, {useEffect, useState} from "react";
import {
    Box,
    Container,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useProductStore} from "@/app/utils/useProductStore";
import ProductModal from "@/app/components/common/ProductModal";

const LoadingSkeleton = () => (
    <Box sx={{height: "max-content"}}>
        {[...Array(5)].map((_, index) => (
            <Skeleton
                key={index}
                variant="rectangular"
                height={50}
                width="100%"
                sx={{my: 1}}
            />
        ))}
    </Box>
);

const ProductsTable = () => {
    const {products, productsFetched, productsLoading, fetchProducts} = useProductStore();
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    useEffect(() => {
        if (!productsFetched) {
            fetchProducts();
        }
    }, [productsFetched]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Supply Chain Dashboard
            </Typography>
            <Paper sx={{p: 2}}>
                {productsLoading ? (
                    <LoadingSkeleton/>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product ID</TableCell>
                                <TableCell>Origin</TableCell>
                                <TableCell>Current Holder</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.productID} onClick={() => setSelectedProduct(product)}
                                          sx={{cursor: "pointer", '&:hover': {backgroundColor: "lightgray"}}}>
                                    <TableCell>{product.productID}</TableCell>
                                    <TableCell>{product.origin}</TableCell>
                                    <TableCell>{product.currentHolder}</TableCell>
                                    <TableCell>{product.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Paper>
            <ProductModal
                open={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                product={selectedProduct}
            />
        </Container>
    );
};

export default ProductsTable;
