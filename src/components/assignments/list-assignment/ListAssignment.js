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
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ReplayIcon from "@mui/icons-material/Replay";

import Title from "../../common/title/Title";
import { Link } from "react-router-dom";
import SearchIconWrapper from "../../common/search/SearchIconWrapper";
import StyledInputBase from "../../common/search/StyledInputBase";
import Search from "../../common/search/Search";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ListAssignmentContext } from "../../../contexts/providers/ListAssignmentProvider";
import { useContext } from "react";
import {
  compareDate,
  convertDateByFormatEdit_v2,
} from "../../../utils/DateUtils";
import ModalDetail from "./ModalDetail";

const columns = [
  {
    field: "id",
    headerName: "No.",
    minWidth: 100,
    flex: 1,
  },
  {
    field: "assetCode",
    headerName: "Asset Code",
    minWidth: 100,
    flex: 1.5,
  },
  {
    field: "assetName",
    headerName: "Asset Name",
    minWidth: 200,
    flex: 2,
  },
  {
    field: "assignedTo",
    headerName: "Assigned to",
    minWidth: 150,
    flex: 1.5,
  },
  {
    field: "assignedBy",
    headerName: "Assigned by",
    minWidth: 150,
    flex: 1.5,
  },
  {
    field: "assignedDate",
    headerName: "Date",
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
          <Link to={"/assignments/edit/" + params.id}>
            <GridActionsCellItem icon={<EditRoundedIcon />} label="edit" />
          </Link>
          <GridActionsCellItem
            icon={<HighlightOffRoundedIcon style={{ color: "red" }} />}
            label="Delete"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Delete: ", params.id)
            }}
          />
          <GridActionsCellItem
            icon={<ReplayIcon style={{ color: "blue" }} />}
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

function AssignmentNoRowsOverlay() {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      No Assignment Found
    </Stack>
  );
}

const states = ["All", "Accepted", "Waiting for acceptance"];

const ListAssignment = (props) => {
  const {
    listAssignmentState,
    assignmentState,
    changeTypeCondition,
    changeDateCondition,
    changeSearchCondition,
    changeOpenModalStatus
  } = useContext(ListAssignmentContext);

  return (
    <>
      <ModalDetail />
      <Title title="Assignment List"></Title>
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
                value={listAssignmentState.conditions.states}
                renderValue={() =>
                  listAssignmentState.conditions.states.join(", ")
                }
                sx={{ width: "150px" }}
              >
                {states.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      <Checkbox
                        name="state"
                        value={item}
                        checked={listAssignmentState.conditions.states.includes(
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
                  value={listAssignmentState.conditions.assignedDate}
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
            width: "30vw",
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
          <div>
            <Link to="/assignments/create" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                style={{
                  background: "#e30613",
                  borderRadius: "8px",
                  textTransform: "none",
                }}
              >
                Create new assignment
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Box sx={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={assignmentState.assignments.filter((item) => {
            return (
              (listAssignmentState.conditions.states.includes("All") ||
                listAssignmentState.conditions.states.includes(item.state)) &&
              (listAssignmentState.conditions.assignedDate == null ||
                listAssignmentState.conditions.assignedDate == "" ||
                compareDate(
                  new Date(listAssignmentState.conditions.assignedDate),
                  new Date(
                    convertDateByFormatEdit_v2(item.assignedDate, "yyyy/MM/dd")
                  )
                )) &&
              (item.assetCode
                .toUpperCase()
                .includes(
                  listAssignmentState.conditions.search.toUpperCase()
                ) ||
                item.assetName
                  .toUpperCase()
                  .includes(
                    listAssignmentState.conditions.search.toUpperCase()
                  ) ||
                item.assignedTo
                  .toUpperCase()
                  .includes(
                    listAssignmentState.conditions.search.toUpperCase()
                  ))
            );
          })}
          columns={columns}
          components={{ NoRowsOverlay: AssignmentNoRowsOverlay }}
          pageSize={10}
          disableSelectionOnClick
          onRowClick={() => changeOpenModalStatus(true)        
          }
        />
      </Box>
    </>
  );
};

export default ListAssignment;
