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
import ReturnDialog from "./ReturnDialog";

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
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
import CustomPagination from "../../common/pagination/CustomPagination";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    showDetailAssignment,
    returnAssignment,
    navigate,
    changeOpenDelete,
    changeDeleteId,
    deleteSubmit,
  } = useContext(ListAssignmentContext);

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
      sortable: false,
      renderCell: (params) => {
        const isEdit = params.row.state == "Waiting for acceptance";
        const isDelete =
          (params.row.state == "Waiting for acceptance" ||
            params.row.state == "Declined") &&
          !params.row.stateReturnRequest;
        const isReturn =
          params.row.state == "Accepted" && !params.row.stateReturnRequest;

        return (
          <div>
            <GridActionsCellItem
              onClick={(e) => {
                e.stopPropagation();
                navigate("/assignments/edit/" + params.id);
              }}
              icon={<EditRoundedIcon />}
              disabled={!isEdit}
              style={{
                color: isEdit ? "black" : "#BCBCBC",
              }}
              label="edit"
            />
            <GridActionsCellItem
              disabled={!isDelete}
              icon={
                <HighlightOffRoundedIcon
                  style={{
                    color: isDelete ? "red" : "#F6B4B8",
                  }}
                />
              }
              label="Delete"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Delete: ", params.id);
                changeOpenDelete(true);
                changeDeleteId(params.id);
              }}
            />
            <GridActionsCellItem
              disabled={!isReturn}
              icon={
                <ReplayIcon style={{ color: isReturn ? "blue" : "#BCBCBC" }} />
              }
              label="Return"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Return: ", params.id);
                returnAssignment(params.id);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <ModalDetail />
      <ReturnDialog />
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
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                IconComponent={() => <FilterAltIcon />}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                multiple
                value={listAssignmentState.conditions.states}
                onChange={(e) => changeTypeCondition(e.target.value)}
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
                        checked={listAssignmentState.conditions.states.includes(
                          item
                        )}
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
          components={{
            NoRowsOverlay: AssignmentNoRowsOverlay,
            Pagination: CustomPagination,
          }}
          pageSize={10}
          disableSelectionOnClick
          onRowClick={(params) => showDetailAssignment(params.id)}
        />
      </Box>

      <Dialog
        open={listAssignmentState.modalDelete.open}
        //TransitionComponent={Transition}
        keepMounted
        //onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to delete this assignment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteSubmit()}>Delete</Button>
          <Button onClick={() => changeOpenDelete(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListAssignment;
