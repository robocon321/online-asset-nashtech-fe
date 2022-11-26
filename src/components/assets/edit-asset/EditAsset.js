import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel, Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Title from "../../common/title/Title";
import styles from "./EditAsset.module.css";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { useContext } from "react";

import { EditAssetContext } from "../../../contexts/providers/EditAssetProvider";

const EditAsset = (props) => {
  const {
    editAssetState,
    changeField,
    submit,
    navigate
  } = useContext(EditAssetContext);


  return (
    <>
      <Title title="Edit Asset" />
      <Card>
        <CardContent>
          <form className={styles["create-asset"]}>
            <FormControl className={styles["input"]}>
              <FormLabel id="label-name">Name</FormLabel>
              <TextField
                className={styles["input"]}
                id="name"
                name="name"
                value={editAssetState.form.name}
                onChange={changeField}
                inputProps={{ maxLength: 50 }}
              />
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="label-category">Category</FormLabel>
              <TextField
                disabled
                variant="filled"
                value={editAssetState.form.categoryName}
                inputProps={{
                  maxLength: 50,
                  endAdornment: <ArrowDropDownIcon />,
                }}
              />
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
                value={editAssetState.form.specification}
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
                value={editAssetState.form.state}
                onChange={changeField}
                inputProps={{
                  maxLength: 50,
                  endAdornment: <ArrowDropDownIcon />,
                }}
              >
                <FormControlLabel
                  value={"Available"}
                  control={<Radio />}
                  label="Available"
                />
                <FormControlLabel
                  value={"Not available"}
                  control={<Radio />}
                  label="Not available"
                />
                <FormControlLabel
                  value={"Waiting for recycling"}
                  control={<Radio />}
                  label="Waiting for recycling"
                />
                <FormControlLabel
                  value={"Recycled"}
                  control={<Radio />}
                  label="Recycled"
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
