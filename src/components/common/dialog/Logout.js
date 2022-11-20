import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Cookies from "js-cookie";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      style={{
        "border-color": "black",
        "border-width": "2px",
        "border-style": "solid",
      }}
    >
      <DialogTitle style={{ color: "red", "background-color": "#e2e2e2", "font-weight": "bold" }}>
        Are you sure
      </DialogTitle>
      <DialogContent sx={{ mx: "auto", p: 0 }}>
        <DialogContentText id="alert-dialog-slide-description">
          <p style={{ color: "black", height: "100%", padding: "10px" }}>
            Do you want to log out?
          </p>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mx: "auto", p: 2 }}>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Log out
        </Button>
        <Button
          variant="outlined"
          style={{ color: "grey", "border-color": "grey" }}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
