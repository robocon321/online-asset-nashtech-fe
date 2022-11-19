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
} from "@mui/material";
import { useContext, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { CreateUserContext } from "../../contexts/providers/CreateUserProvider";

import styles from "./CreateUser.module.css";

const CreateUser = (props) => {
  const { changeField, createUserState, submit, navigate } =
    useContext(CreateUserContext);

  return (
    <div className={styles["create-user"]}>
      <h1>Create New User</h1>
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
                error={createUserState.error.firstName != null}
                helperText={createUserState.error.firstName}
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
                className={styles["input"]}
                error={createUserState.error.lastName != null}
                helperText={createUserState.error.lastName}
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
                  value={createUserState.form.dob}
                  renderInput={(params) => {
                    return (
                      <TextField
                        className={styles["input"]}
                        value={createUserState.form.dob}
                        onChange={changeField}
                        onKeyUp={changeField}
                        error={
                          createUserState.error.dob != null || params.error
                        }
                        helperText={createUserState.error.dob}
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
                defaultValue={true}
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
                  value={createUserState.form.joinedDate}
                  renderInput={(params) => {
                    return (
                      <TextField                      
                        value={createUserState.form.joinedDate}
                        onChange={changeField}
                        onKeyUp={changeField}
                        className={styles["input"]}
                        error={createUserState.error.joinedDate != null || params.error}
                        helperText={createUserState.error.joinedDate}
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
                Type
              </FormLabel>
              <Select onChange={changeField} value={"Admin"} id="role" name="role">
                <MenuItem value={"Staff"}>Staff</MenuItem>
                <MenuItem value={"Admin"}>Admin</MenuItem>
              </Select>
            </FormControl>
            <div className={styles["btn"]}>
              <Button
                variant="contained"
                color="error"
                disabled={!createUserState.enableSubmit}
                onClick={submit}
              >
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

export default CreateUser;
