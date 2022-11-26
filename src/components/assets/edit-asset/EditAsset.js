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
  TextField,
} from "@mui/material";
import styles from "./EditAsset.module.css";
import Title from "../../common/title/Title";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Divider from "@mui/material/Divider";

import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { useContext, useState } from "react";

import { EditAssetContext } from "../../../contexts/providers/EditAssetProvider";

const EditAsset = (props) => {
  const {
    editAssetState,
    changeField,
    changeNewCategoryField,
    openNewCategoryField,
    closeNewCategoryField,
    addNewCategory,
    changeCategoryField,
    submit,
    navigate
  } = useContext(EditAssetContext);

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
                onChange={changeField}
                inputProps={{ maxLength: 50 }}
              />
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="label-category">Category</FormLabel>
              <TextField
                disabled
                onClick={handleClick}
                value={editAssetState.form.categoryName}
                inputProps={{
                  maxLength: 50,
                  endAdornment: <ArrowDropDownIcon />,
                }}
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
                  style={{ width: "500px", maxHeight: "200px", overflow: "auto" }}
                >
                  {editAssetState.categories.map((item) => (
                    <MenuItem
                      key={item.code}
                      onClick={() => changeCategoryField(item.code)}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </MenuList>
                <Divider />
                <div className={styles["new-category"]}>
                  {editAssetState.newCategory.isShowInput ? (
                    <div className={styles["wrap-input-new-category"]}>
                      <div className={styles["input-new-category"]}>
                        <TextField
                          className={styles["category-name"]}
                          id="newCategoryName"
                          name="name"
                          onChange={changeNewCategoryField}
                          value={editAssetState.newCategory.name}
                          placeholder="Name"
                          inputProps={{ maxLength: 50 }}
                        />
                        <TextField
                          className={styles["category-code"]}
                          id="newCategoryCode"
                          name="code"
                          value={editAssetState.newCategory.code}
                          onChange={changeNewCategoryField}
                          placeholder="Code"
                          inputProps={{ maxLength: 4 }}
                        />
                      </div>
                      <div className={styles["error"]}>{editAssetState.newCategory.error.name}</div>
                      <div className={styles["error"]}>{editAssetState.newCategory.error.code}</div>
                      <div className={styles["btn-new-category"]}>
                        <Button
                          color="success"
                          onClick={addNewCategory}
                          disabled={
                            !editAssetState.newCategory
                              .enableSubmit
                          }
                        >
                          <DoneIcon />
                        </Button>
                        <Button color="error" onClick={closeNewCategoryField}>
                          <CloseIcon />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={styles["link-category"]}
                      onClick={openNewCategoryField}
                    >
                      Add New Category
                    </div>
                  )}
                </div>
              </Popover>
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="label-specification">Specification</FormLabel>
              <TextField
                className={styles["input"]}
                id="specification"
                name="specification"
                onChange={changeField}
                multiline
                rows={3}
                inputProps={{ maxLength: 150 }}
              />
            </FormControl>

            <FormControl className={styles["input"]}>
              <FormLabel id="label-installedDate">Installed Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={editAssetState.form.installedDate}
                  renderInput={(params) => {
                    return (
                      <TextField
                        className={styles["input"]}
                        id="installedDate"
                        name="installedDate"
                        inputProps={{ max: "9999-12-31" }}
                        onChange={changeField}
                        onKeyUp={changeField}
                        value={editAssetState.form.installedDate}
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
                defaultValue={"AVAILABLE"}
                onChange={changeField}
              >
                <FormControlLabel
                  value={"AVAILABLE"}
                  control={<Radio />}
                  label="Available"
                />
                <FormControlLabel
                  value={"NOT AVAILABLE"}
                  control={<Radio />}
                  label="Not Available"
                />
              </RadioGroup>
            </FormControl>
            <div className={styles["btn"]}>
              <Button
                variant="contained"
                color="error"
                disabled={!editAssetState.enableSubmit}
                onClick={submit}
              >
                Save
              </Button>
              <Button variant="contained" color="success" onClick={() => navigate('/assets')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default EditAsset;
