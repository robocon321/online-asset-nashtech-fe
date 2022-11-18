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
  CardContent
} from "@mui/material";
import { useContext } from "react";
import { CreateUserContext } from "../../contexts/providers/CreateUserProvider";

import styles from "./CreateUser.module.css";

const CreateUser = (props) => {
  const { changeField, createUserState, submit, navigate } = useContext(CreateUserContext);

  return (
    <div className={styles["create-user"]}>
      <h1>Create New User</h1>
      <Card >
        <CardContent>
        <form>
          <FormControl className={styles["input"]}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              First Name
            </FormLabel>
            <TextField
              onChange={changeField}
              className={styles["input"]}
              error={false}
              id="outlined-error"
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
              error={false}
              id="outlined-error"
              name="lastName"
            />
          </FormControl>
          <FormControl className={styles["input"]}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Date of birth
            </FormLabel>
            <TextField
              onChange={changeField}
              className={styles["input"]}
              error={createUserState.error.dob != null}
              helperText={createUserState.error.dob}
              id="outlined-error"
              name="dob"
              type="date"
            />
          </FormControl>
          <FormControl className={styles["input"]}>
            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              onChange={changeField}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender"
              defaultValue={true}
            >
              <FormControlLabel              
                value={true}
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value={false} control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          <FormControl className={styles["input"]}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Joined Date
            </FormLabel>
            <TextField
              onChange={changeField}
              className={styles["input"]}
              error={createUserState.error.joinedDate != null}
              helperText={createUserState.error.joinedDate}
              id="outlined-error"
              name="joinedDate"
              type="date"
            />
          </FormControl>
          <FormControl className={styles["input"]}>
            <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
            <Select
              onChange={changeField}
              value={"Admin"}
              name="role"
            >
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
            <Button variant="contained" color="success" onClick={() => navigate('/users')}>
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
