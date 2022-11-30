import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { styled, alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import InputLabel from "@mui/material/InputLabel";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Title from "../../common/title/Title";
import InputBase from "@mui/material/InputBase";
import Pagination from "@mui/material/Pagination";
import Modal from "@mui/material/Modal";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import { useContext } from "react";
import { ListUserContext } from "../../../contexts/providers/ListUserProvider";
import IconButton from "@mui/material/IconButton";
import { UserContext } from "../../../contexts/providers/UserProvider";
import Stack from "@mui/material/Stack";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
function NoRowsOverlay() {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      No User Found
    </Stack>
  );
}

const compareStrings = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;

  return 0;
};
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ListUser() {
  const {
    listUserState,
    handleChange,
    handleOnCellClick,
    handleClose,
    handleSearch,
    handleOnCellClickEdit,
    hanldeClickDelete,
    handleCloseDelete,
    disableUser,
  } = useContext(ListUserContext);
  const { userState } = useContext(UserContext);
  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    // const page = 0;
    return (
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
        showFirstButton
        showLastButton
      />
    );
  }
  const columns = [
    {
      field: "code",
      renderHeader: () => {
        return (
          <strong style={{ display: "flex" }}>
            <h4>Staff Code</h4>
          </strong>
        );
      },
      renderCell: (params) => {
        return (
          <div
            style={{ width: "100%", height: "100%", textAlign: "center" }}
            onClick={() => handleOnCellClick(params.id)}
          >
            <p>{params.row.code}</p>
          </div>
        );
      },
      type: "code",
      width: 90,
      // sortComparator: (v1, v2) => v1.code.localeCompare(v2.code),
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fullName",
      renderHeader: () => {
        return (
          <strong style={{ display: "flex" }}>
            <h4>Full Name</h4>
          </strong>
        );
      },
      renderCell: (params) => {
        return (
          <div
            style={{ width: "100%", height: "100%", textAlign: "center" }}
            onClick={() => handleOnCellClick(params.id)}
          >
            <p>{params.row.fullName}</p>
          </div>
        );
      },
      sortComparator: (v1, v2) => {
        const d1 = v1.split(" ");
        const d2 = v2.split(" ");
        let check;
        if (!(d1[0] === d2[0])) {
          if (d1[0] > d2[0]) {
            return 1;
          }
          return -1;
        }
        const name1 = d1.join(",");
        const name2 = d2.join(",");
        check = name1.localeCompare(name2);
        return check ? 1 : -1;
      },
      width: 150,
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "username",
      renderHeader: () => {
        return (
          <strong>
            <h4>Username</h4>
          </strong>
        );
      },
      renderCell: (params) => {
        return (
          <div
            style={{ width: "100%", height: "100%", textAlign: "center" }}
            onClick={() => handleOnCellClick(params.id)}
          >
            <p>{params.row.username}</p>
          </div>
        );
      },

      type: "username",
      width: 150,
      flex: 2,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "joinedDate",
      renderHeader: () => {
        return (
          <strong style={{ display: "flex" }}>
            <h4>Joined Date</h4>
          </strong>
        );
      },
      renderCell: (params) => {
        return (
          <div
            style={{ width: "100%", height: "100%", textAlign: "center" }}
            onClick={() => handleOnCellClick(params.id)}
          >
            <p>{params.row.joinedDate}</p>
          </div>
        );
      },
      width: 110,
      flex: 2,
      sortComparator: (v1, v2) => {
        const d1 = v1.split("/");
        const d2 = v2.split("/");
        const date1 = new Date(d1[2], d1[1] - 1, d1[0]);
        const date2 = new Date(d2[2], d2[1] - 1, d2[0]);
        return date1 > date2 ? 1 : -1;
      },
      headerAlign: "center",
      align: "center",
    },
    {
      field: "role",
      renderHeader: () => {
        return (
          <strong style={{ display: "flex" }}>
            <h4>Type</h4>
          </strong>
        );
      },
      renderCell: (params) => {
        return (
          <div
            style={{ width: "100%", height: "100%", textAlign: "center" }}
            onClick={() => handleOnCellClick(params.id)}
          >
            <p>{params.row.role}</p>
          </div>
        );
      },
      disableSelectionOnClick: false,
      type: "role",
      width: 110,
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      width: 110,
      flex: 2,
      align: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div style={{ zIndex: "9" }}>
            <Link to={"/users/edit/" + params.id}>
              <GridActionsCellItem icon={<EditRoundedIcon />} label="edit" />
            </Link>
            <GridActionsCellItem
              onClick={() => hanldeClickDelete(params.id)}
              icon={<HighlightOffRoundedIcon style={{ color: "red" }} />}
              label="Delete"
            />
          </div>
        );
      },
    },
  ];
  const roles = ["ALL", "ADMIN", "STAFF"];
  const gender = ["MALE", "FEMALE"];
  return (
    <div>
      <Title title="User List"></Title>
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
                value={listUserState.userRole}
                onChange={handleChange}
                renderValue={() => listUserState.userRole.toString()}
                sx={{ width: "150px" }}
              >
                {roles.map((userrole) => {
                  return (
                    <MenuItem key={userrole} value={userrole}>
                      <Checkbox
                        checked={listUserState.userRole.indexOf(userrole) > -1}
                      />
                      <ListItemText primary={userrole} />
                    </MenuItem>
                  );
                })}
              </Select>
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
            {" "}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                style={{ border: "1px solid black", borderRadius: "8px" }}
                placeholder="Search…"
                onChange={handleSearch}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </div>
          <div>
            <Link to={"create"} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                style={{
                  background: "#e30613",
                  borderRadius: "8px",
                  textTransform: "none",
                }}
              >
                Create new user
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          // labelRowsPerPage=""
          // disableColumnMenu
          rows={userState.users.filter((item) => {
            if (
              listUserState.userRole.length &&
              listUserState.userRole[0] !== "ALL" &&
              !listUserState.userRole.includes(item.role.toUpperCase())
            ) {
              return false;
            }

            if (
              !(
                item.fullName
                  .toUpperCase()
                  .includes(listUserState.search.toUpperCase()) ||
                item.code
                  .toUpperCase()
                  .includes(listUserState.search.toUpperCase())
              )
            ) {
              return false;
            }

            return true;
          })}
          columns={columns}
          pageSize={20}
          // onCellClick={handleOnCellClick}
          components={{
            Pagination: CustomPagination,
            NoRowsOverlay,
          }}
        ></DataGrid>
      </Box>

      <Modal
        keepMounted
        open={listUserState.open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} style={{ borderRadius: "20px" }}>
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid black",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Title title="Detailed User Information" />
            <IconButton onClick={handleClose}>
              <DisabledByDefaultOutlinedIcon
                sx={{ fontSize: 40 }}
                style={{ color: "#e30613" }}
              />
            </IconButton>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p>Staff Code</p>
              <p>Full Name</p>
              <p>UserName</p>
              <p>Date of Birth </p>
              <p>Gender </p>
              <p>Joined Date </p>
              <p>Type</p>
              <p>Location </p>
            </div>
            <div>
              <p> {listUserState.userDetail.code}</p>
              <p> {listUserState.userDetail.fullName}</p>
              <p> {listUserState.userDetail.username}</p>
              <p> {listUserState.userDetail.dob}</p>
              <p> {gender[+listUserState.userDetail.gender]}</p>
              <p> {listUserState.userDetail.joinedDate}</p>
              <p> {listUserState.userDetail.role}</p>
              <p> {listUserState.userDetail.location}</p>
            </div>
          </div>
        </Box>
      </Modal>
      {listUserState.checkDelete === 1 ? (
        <Modal
          keepMounted
          open={listUserState.openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style} style={{ borderRadius: "20px" }}>
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid black",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Title title="Can not disable user" />
              <IconButton onClick={handleCloseDelete}>
                <DisabledByDefaultOutlinedIcon
                  sx={{ fontSize: 40 }}
                  style={{ color: "#e30613" }}
                />
              </IconButton>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p>There are valid assignments belonging to this user.</p>
                <p>Please close all assignments before disabling user.</p>
              </div>
            </div>
          </Box>
        </Modal>
      ) : (
        <Modal
          keepMounted
          open={listUserState.openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style} style={{ borderRadius: "20px" }}>
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid black",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Title title="Are you sure?" />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p>Do you want to disable this user?</p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => disableUser(listUserState.checkId)}
                    style={{ fontSize: "15px" }}
                  >
                    Disable
                  </Button>
                  <Button
                    onClick={handleCloseDelete}
                    variant="contained"
                    color="success"
                    style={{ marginRight: "100px", fontSize: "15px" }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default ListUser;
