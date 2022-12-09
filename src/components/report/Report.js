import {
    Box,
    Button,
    Grid,
    Stack,
} from "@mui/material";
import * as React from "react";
import Title from "../common/title/Title";

import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import CustomPagination from "../common/pagination/CustomPagination";
import { ReportContext } from "../../contexts/providers/ReportProvider";



function ReportNoRowsOverlay() {
    return (
        <Stack height="100%" alignItems="center" justifyContent="center">
            No Report Found
        </Stack>
    );
}

const Report = (props) => {
    const {
        reportState,
        exportToExcel
    } = useContext(ReportContext);

    const columns = [
        {
            field: "cateName",
            headerName: "Category",
            minWidth: 150,
            flex: 1.5,
        },
        {
            field: "total",
            headerName: "Total",
            minWidth: 150,
            flex: 1.5,
        },
        {
            field: "assigned",
            headerName: "Assigned",
            minWidth: 150,
            flex: 1.5,
        },
        {
            field: "available",
            headerName: "Available",
            minWidth: 150,
            flex: 1.5,
        },
        {
            field: "notAvailable",
            headerName: "Not available",
            minWidth: 150,
            flex: 1.5,
        },
        {
            field: "waitingForRecycling",
            headerName: "Waiting for recycling",
            minWidth: 150,
            flex: 1.5,
        },
        {
            field: "recycled",
            headerName: "Recycled",
            minWidth: 200,
            flex: 2,
        },
    ];

    return (
        <>

            <Title title="Report"></Title>

            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
            >
                <Grid item>
                    <Button
                        onClick={() => exportToExcel(reportState.reports)}
                        variant="contained"
                        style={{
                            background: "#e30613",
                            borderRadius: "8px",
                            textTransform: "none",
                            width: "100px",
                        }}
                    >
                        Export
                    </Button>
                </Grid>
            </Grid>


            <div
                style={{
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
            </div>

            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={reportState.reports}
                    columns={columns}
                    components={{
                        NoRowsOverlay: ReportNoRowsOverlay,
                        Pagination: CustomPagination,
                    }}
                    pageSize={10}
                />
            </Box>

        </>
    );
};

export default Report;
