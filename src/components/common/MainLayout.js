import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

import Header from "../../components/common/header/Header";
import Sidebar from "../../components/common/sidebar/Sidebar";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const MainLayout = (props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Header  />
      <Sidebar open={true}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
