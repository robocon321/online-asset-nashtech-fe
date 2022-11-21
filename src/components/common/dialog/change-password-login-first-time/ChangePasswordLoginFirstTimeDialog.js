import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { AppContext } from "../../../../contexts/providers/AppProvider";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid white",
  boxShadow: 24,
  p: 4,
};

const ChangePasswordLoginFirstTimeDialog = (props) => {
  const {
    appState,
    handleChange_ModalLoginFirstTime,
    setShowPassword_ModalLoginFirstTime,
  } = useContext(AppContext);

  return (
    <Modal
      open={!appState.user.enabled}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <b>Change password</b>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          This is the first time you logged in. You have to change your password
          to continue
          <FormControl
            sx={{ width: "100%", my: 2 }}
            variant="outlined"
            error={appState.modalLoginFirstTime.error != null}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={
                appState.modalLoginFirstTime.showPassword ? "text" : "password"
              }
              value={appState.modalLoginFirstTime.password}
              onChange={handleChange_ModalLoginFirstTime}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setShowPassword_ModalLoginFirstTime(
                        !appState.modalLoginFirstTime.showPassword
                      )
                    }
                    edge="end"
                  >
                    {appState.modalLoginFirstTime.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {appState.modalLoginFirstTime.error != null && (
            <Alert severity="error">{appState.modalLoginFirstTime.error}</Alert>
          )}
        </Typography>
        <Typography id="modal-btn" sx={{ mt: 2 }}>
          <Button
            variant="contained"
            disabled={appState.modalLoginFirstTime.error != null}
          >
            Submit
          </Button>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ChangePasswordLoginFirstTimeDialog;
