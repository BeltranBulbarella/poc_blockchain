'use client';
import React, {useEffect} from "react";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import {useAppStore} from "@/app/utils/appStore";

const RolesSelect: React.FC = () => {
    const { roles, selectedRole, setSelectedRole, rolesLoading, fetchedRoles, setRoles } = useAppStore();

    useEffect(() => {
        if (!fetchedRoles) {
            setRoles();
        }
    }, [fetchedRoles]);


    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4">Supply Chain Management</Typography>
            {rolesLoading ? (
                <Typography>Loading...</Typography>
            ) : (
                <>
                    <Typography variant="h6">Select Role:</Typography>
                    <Select
                        value={selectedRole || ""}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        fullWidth
                    >
                        {Object.entries(roles).map(([role, account]) => (
                            <MenuItem key={role} value={role}>
                                {role} ({account})
                            </MenuItem>
                        ))}
                    </Select>
                </>
            )}
        </Box>
    );
};

export default RolesSelect;
