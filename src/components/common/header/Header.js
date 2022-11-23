import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import styles from "./Header.module.css";
import ChangePassword from "../dialog/changepassword/Changepassword";
import ChangePasswordLoginFirstTimeDialog from "../dialog/change-password-login-first-time/ChangePasswordLoginFirstTimeDialog";
import Logout from "../dialog/Logout";
import { AppContext } from "../../../contexts/providers/AppProvider";

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = (props) => {
  const { appState } = React.useContext(AppContext);

  const [open, setOpen] = React.useState(false);
  const [logout, setLogout] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setAnchorEl(null);
  };

  const handleClickOpenLogout = () => {
    setLogout(true);
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleClickOpen}>Change password</MenuItem>
      <MenuItem onClick={handleClickOpenLogout}>Logout</MenuItem>
    </Menu>
  );

  const [openSnack, setOpenSnack] = React.useState(false);

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleCloseSnack}>
        OK
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <AppBar
      position="fixed"
      open={true}
      style={{ backgroundColor: "var(--primary_color)" }}
    >
      <ChangePassword
        open={open}
        setOpen={setOpen}
        setOpenSnack={setOpenSnack}
      />
      <Snackbar
        open={openSnack}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
        message="Your password has been changed successfully"
        action={action}
      />
      <ChangePasswordLoginFirstTimeDialog />
      <Logout open={logout} setOpen={setLogout} />
      <Toolbar className={styles["topbar"]}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, display: "none" }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          NASHTECH
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { md: "flex" } }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <span>{appState.user.username}</span>
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
      {renderMenu}
    </AppBar>
  );
};

export default Header;
