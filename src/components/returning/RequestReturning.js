import {
  Box,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ReplayIcon from "@mui/icons-material/Replay";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import Title from "../common/title/Title";
import SearchIconWrapper from "../common/search/SearchIconWrapper";
import StyledInputBase from "../common/search/StyledInputBase";
import Search from "../common/search/Search";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RequestReturningContext } from "../../contexts/providers/RequestReturningProvider";
import { useContext } from "react";
import { compareDate, convertDateByFormatEdit_v2 } from "../../utils/DateUtils";
import CustomPagination from "../common/pagination/CustomPagination";

function RequestReturningNoRowsOverlay() {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      No Request Returning Found
    </Stack>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const states = ["All", "Completed", "Waiting for returning"];

const RequestReturning = (props) => {
  const {
    requestReturningState,
    changeTypeCondition,
    changeDateCondition,
    changeSearchCondition,
    changeOpenModalStatus,
    changeDeleteId,
    changeOpenDelete,
    deleteSubmit,
    changeAcceptId,
    changeOpenAccept,
    acceptSubmit,
  } = useContext(RequestReturningContext);

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
      minWidth: 150,
      flex: 1.5,
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
        const isTick = params.row.state == "Waiting for returning";
        const isCancel = params.row.state == "Waiting for returning";

        return (
          <div>
            <GridActionsCellItem
              disabled={!isTick}
              icon={
                <DoneIcon
                  style={{
                    color: isTick ? "red" : "#F6B4B8",
                  }}
                />
              }
              label="Completed"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Complete: ", params.id);
                changeOpenAccept(true);
                changeAcceptId(params.id);
              }}
            />
            <GridActionsCellItem
              disabled={!isCancel}
              icon={
                <CloseIcon style={{ color: isCancel ? "black" : "#BCBCBC" }} />
              }
              label="Cancel"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Cancel: ", params.id);
                changeOpenDelete(true);
                changeDeleteId(params.id);
              }}
            />
          </div>
        );
      },
    },
  ];

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
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                IconComponent={() => <FilterAltIcon />}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                multiple
                value={requestReturningState.conditions.states}
                onChange={(e) => changeTypeCondition(e.target.value)}
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
                        checked={requestReturningState.conditions.states.includes(
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
                  value={requestReturningState.conditions.returnedDate}
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
                        id="returnedDate"
                        name="returnedDate"
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
              (requestReturningState.conditions.returnedDate == null ||
                requestReturningState.conditions.returnedDate == "" ||
                compareDate(
                  new Date(requestReturningState.conditions.returnedDate),
                  new Date(
                    convertDateByFormatEdit_v2(item.returnedDate, "yyyy/MM/dd")
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
                  ))
            );
          })}
          columns={columns}
          components={{
            NoRowsOverlay: RequestReturningNoRowsOverlay,
            Pagination: CustomPagination,
          }}
          pageSize={10}
          disableSelectionOnClick
          onRowClick={() => changeOpenModalStatus(true)}
        />
      </Box>

      <Dialog
        //open={listAssignmentState.modalDelete.open}
        open={requestReturningState.modalDelete.open}
        //TransitionComponent={Transition}
        keepMounted
        //onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to cancel this returning request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={() => deleteSubmit()}>Delete</Button>
          <Button onClick={() => changeOpenDelete(false)}>Cancel</Button> */}
          <Button onClick={() => deleteSubmit()}>Yes</Button>
          <Button onClick={() => changeOpenDelete(false)}>No</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={requestReturningState.modalAccept.open}
        //TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to mark this returning request as "Completed"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => acceptSubmit()}>Yes</Button>
          <Button onClick={() => changeOpenAccept(false)}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RequestReturning;
