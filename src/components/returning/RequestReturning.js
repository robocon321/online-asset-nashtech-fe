import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ReplayIcon from "@mui/icons-material/Replay";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import Title from "../common/title/Title";
import SearchIconWrapper from "../common/search/SearchIconWrapper";
import StyledInputBase from "../common/search/StyledInputBase";
import Search from "../common/search/Search";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RequestReturningContext } from "../../contexts/providers/RequestReturningProvider";
import { useContext } from "react";
import {
  compareDate,
  convertDateByFormatEdit_v2,
} from "../../utils/DateUtils";

const columns = [
  {
    field: "id",
    headerName: "No.",
    minWidth: 50,
    flex: 0.5,
  },
  {
    field: "assetCode",
    headerName: "Asset Code",
    minWidth: 150,
    flex: 1.5,
  },
  {
    field: "assetName",
    headerName: "Asset Name",
    minWidth: 200,
    flex: 2,
  },
  {
    field: "requestedBy",
    headerName: "Requested by",
    minWidth: 150,
    flex: 1.5,
  },
  {
    field: "assignedDate",
    headerName: "Assigned Date",
    minWidth: 150,
    flex: 1.5,
  },
  {
    field: "acceptedBy",
    headerName: "Accepted by",
    minWidth: 150,
    flex: 1.5,
  },
  {
    field: "returnedDate",
    headerName: "Returned Date",
    minWidth: 150,
    flex: 1.5,
  },
  {
    field: "state",
    headerName: "State",
    minWidth: 200,
    flex: 2,
  },
  {
    headerName: "",
    minWidth: 150,
    flex: 1.5,
    renderCell: (params) => {
      return (
        <div>
          <GridActionsCellItem
            icon={<DoneIcon style={{ color: "red" }} />}
            label="Delete"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Delete: ", params.id)
            }}
          />
          <GridActionsCellItem
            icon={<CloseIcon style={{ color: "black" }} />}
            label="Return"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Return: ", params.id)
            }}
          />
        </div>
      );
    },
  },
];

function RequestReturningNoRowsOverlay() {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      No Request Returning Found
    </Stack>
  );
}

const states = ["All", "Accepted", "Waiting for acceptance"];

const RequestReturning = (props) => {
  const {
    requestReturningState,
    changeTypeCondition,
    changeDateCondition,
    changeSearchCondition,
    changeOpenModalStatus
  } = useContext(RequestReturningContext);

  return (
    <>
      <Title title="Request List"></Title>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Box>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                IconComponent={() => <FilterAltIcon />}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                multiple
                value={requestReturningState.conditions.states}
                renderValue={() =>
                  requestReturningState.conditions.states.join(", ")
                }
                sx={{ width: "150px" }}
              >
                {states.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      <Checkbox
                        name="state"
                        value={item}
                        checked={requestReturningState.conditions.states.includes(
                          item
                        )}
                        onChange={(e) => changeTypeCondition(e.target.value)}
                      />
                      <ListItemText primary={item} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl style={{ marginLeft: "10px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={requestReturningState.conditions.assignedDate}
                  inputFormat="DD/MM/YYYY"
                  onChange={(newValue) => {
                    changeDateCondition(
                      newValue == null
                        ? ""
                        : `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`
                    );
                  }}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        id="assignedDate"
                        name="assignedDate"
                        error={false}
                      />
                    );
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <form autoComplete="off">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  style={{ border: "1px solid black", borderRadius: "8px" }}
                  placeholder="Search…"
                  type="search"
                  onChange={(e) => changeSearchCondition(e.target.value)}
                  inputProps={{
                    "aria-label": "search",
                    maxLength: 50,
                  }}
                />
              </Search>
            </form>
          </div>
        </div>
      </div>
      <Box sx={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={requestReturningState.returnings.filter((item) => {
            return (
              (requestReturningState.conditions.states.includes("All") ||
                requestReturningState.conditions.states.includes(item.state)) &&
              (requestReturningState.conditions.assignedDate == null ||
                requestReturningState.conditions.assignedDate == "" ||
                compareDate(
                  new Date(requestReturningState.conditions.assignedDate),
                  new Date(
                    convertDateByFormatEdit_v2(item.assignedDate, "yyyy/MM/dd")
                  )
                )) &&
              (item.assetCode
                .toUpperCase()
                .includes(
                  requestReturningState.conditions.search.toUpperCase()
                ) ||
                item.assetName
                  .toUpperCase()
                  .includes(
                    requestReturningState.conditions.search.toUpperCase()
                  ) ||
                item.assignedTo
                  .toUpperCase()
                  .includes(
                    requestReturningState.conditions.search.toUpperCase()
                  ))
            );
          })}
          columns={columns}
          components={{ NoRowsOverlay: RequestReturningNoRowsOverlay }}
          pageSize={10}
          disableSelectionOnClick
          onRowClick={() => changeOpenModalStatus(true)        
          }
        />
      </Box>
    </>
  );
};

export default RequestReturning;
