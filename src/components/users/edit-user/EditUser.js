import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import { useContext } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { EditUserContext } from "../../../contexts/providers/EditUserProvider";
import dayjs from "dayjs";
import styles from "./EditUser.module.css";
import Title from "../../common/title/Title";
import { addUser, setUserInput } from "../../../contexts/actions/UserAction";
import UserProvider from "../../../contexts/providers/UserProvider";
const EditUser = (props) => {
  const { changeField, editUserState, submit, navigate } =
    useContext(EditUserContext);

  // const [state, dispatch] = useContext(UserProvider);

  // const handleAdd = () => {
  //   dispatch(addUser(state.userInput));
  // };

  return (
    <div className={styles["create-user"]}>
      <Title title="Create New User" />
      {!editUserState.status.success && (
        <Alert severity="error">{editUserState.status.message}</Alert>
      )}
      <Card>
        <CardContent>
          <form>
            <FormControl className={styles["input"]}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                First Name
              </FormLabel>
              <TextField
                onChange={changeField}
                className={styles["input"]}
                error={editUserState.error.firstName != null}
                helperText={editUserState.error.firstName}
                value={editUserState.form.firstName}
                disabled
                id="firstName"
                name="firstName"
              />
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Last Name
              </FormLabel>
              <TextField
                onChange={changeField}
                value={editUserState.form.lastName}
                disabled
                className={styles["input"]}
                error={editUserState.error.lastName != null}
                helperText={editUserState.error.lastName}
                id="lastName"
                name="lastName"
              />
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Date of birth
              </FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={editUserState.form.dob}
                  renderInput={(params) => {
                    return (
                      <TextField
                        className={styles["input"]}
                        value={editUserState.form.dob}
                        onChange={changeField}
                        onKeyUp={changeField}
                        error={editUserState.error.dob != null || params.error}
                        helperText={editUserState.error.dob}
                        id="dob"
                        name="dob"
                        type="date"
                      />
                    );
                  }}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                onChange={changeField}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                id="gender"
                name="gender"
                value={editUserState.form.gender}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Joined Date
              </FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={editUserState.form.joinedDate}
                  renderInput={(params) => {
                    return (
                      <TextField
                        value={editUserState.form.joinedDate}
                        onChange={changeField}
                        onKeyUp={changeField}
                        className={styles["input"]}
                        error={
                          editUserState.error.joinedDate != null || params.error
                        }
                        helperText={editUserState.error.joinedDate}
                        id="joinedDate"
                        name="joinedDate"
                        type="date"
                      />
                    );
                  }}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Role
              </FormLabel>
              <Select
                onChange={changeField}
                value={editUserState.form.role}
                id="role"
                name="role"
              >
                <MenuItem value={"STAFF"}>Staff</MenuItem>
                <MenuItem value={"ADMIN"}>Admin</MenuItem>
              </Select>
            </FormControl>
            <div className={styles["btn"]}>
              <Button variant="contained" color="error" onClick={submit}>
                Submit
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => navigate("/users")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditUser;
