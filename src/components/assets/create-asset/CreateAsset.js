import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  MenuList,
  Popover,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import styles from "./CreateAsset.module.css";
import Title from "../../common/title/Title";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Divider from "@mui/material/Divider";

import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useState } from "react";

const CreateAsset = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Title title="Create New Asset" />
      <Card>
        <CardContent>
          <form className={styles["create-asset"]}>
            <FormControl className={styles["input"]}>
              <FormLabel id="label-name">Name</FormLabel>
              <TextField
                className={styles["input"]}
                id="name"
                name="name"
                inputProps={{ maxLength: 50 }}
              />
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="label-category">Category</FormLabel>
              <TextField 
                disabled
                onClick={handleClick}
                InputProps={{ maxLength: 50, endAdornment: <ArrowDropDownIcon /> }}
              />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
              <MenuList
                id="category"
                name="category"
              >
                <MenuItem value={"STAFF"}>STAFF</MenuItem>
                <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
              </MenuList>
              <Divider />
                <div className={styles["new-category"]}>
                  {/* <div className={styles["link-category"]}>Add New Category</div> */}
                  <TextField
                    className={styles["input"]}
                    id="newCategory"
                    name="newCategory"
                    InputProps={{ maxLength: 50, endAdornment: "Haha" }}
                  />
                  <Button color="success">
                    <DoneIcon />
                  </Button>
                  <Button color="error">
                    <CloseIcon />
                  </Button>
                </div>  


              </Popover>
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="label-specification">Specification</FormLabel>
              <TextField
                className={styles["input"]}
                id="specification"
                name="specification"
                multiline
                maxRows={4}
                inputProps={{ maxLength: 12 }}
              />
            </FormControl>

            <FormControl className={styles["input"]}>
              <FormLabel id="label-installedDate">Installed Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  renderInput={(params) => {
                    return (
                      <TextField
                        className={styles["input"]}
                        id="installedDate"
                        name="installedDate"
                        type="date"
                      />
                    );
                  }}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="label-state">State</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                id="state"
                name="state"
                defaultValue={true}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Available"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Not Available"
                />
              </RadioGroup>
            </FormControl>
            <div className={styles["btn"]}>
              <Button variant="contained" color="error">
                Submit
              </Button>
              <Button variant="contained" color="success">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateAsset;
