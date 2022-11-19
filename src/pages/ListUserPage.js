import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";

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
const columns = [
  {
    field: "id",
    renderHeader: () => {
      return (
        <strong>
          <h4>Staff Code</h4>
        </strong>
      );
    },
    width: 90,
    sortable: false,
    flex: 2,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "fullName",
    renderHeader: () => {
      return (
        <strong>
          <h4>Full Name</h4>
        </strong>
      );
    },
    width: 150,
    sortable: false,
    flex: 2,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "userName",
    renderHeader: () => {
      return (
        <strong>
          <h4>Username</h4>
        </strong>
      );
    },
    width: 150,
    sortable: false,
    flex: 2,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "joinDate",
    renderHeader: () => {
      return (
        <strong>
          <h4>Joined Date</h4>
        </strong>
      );
    },
    type: "number",
    width: 110,
    sortable: false,
    flex: 2,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "type",
    renderHeader: () => {
      return (
        <strong>
          <h4>Type</h4>
        </strong>
      );
    },
    width: 110,
    sortable: false,
    flex: 2,
    headerAlign: "center",
    align: "center",
  },
  {
    // field: "disable",
    width: 110,
    flex: 2,
    align: "center",
    sortable: false,
    renderCell: (params) => {
      console.log(params.row.id);
      return (
        <div>
          <GridActionsCellItem
            icon={<EditRoundedIcon />}
            label="edit"
            //   onClick={deleteUser(params.id)}
          />
          <GridActionsCellItem
            icon={<HighlightOffRoundedIcon style={{ color: "red" }} />}
            label="Delete"
            //   onClick={deleteUser(params.id)}
          />
        </div>
      );
    },
  },
];

const rows = [
  {
    id: "SD0001",
    fullName: "Pham Phu Hung",
    userName: "hungpp1",
    joinDate: "17/11/2022",
    type: "Admin",
  },
  {
    id: "SD0002",
    fullName: "Pham Phu Hung",
    userName: "hungpp1",
    joinDate: "17/11/2022",
    type: "Admin",
  },
  {
    id: "SD0003",
    fullName: "Pham Phu Hung",
    userName: "hungpp1",
    joinDate: "17/11/2022",
    type: "Admin",
  },
  {
    id: "SD0004",
    fullName: "Pham Phu Hung",
    userName: "hungpp1",
    joinDate: "17/11/2022",
    type: "Admin",
  },
];
const roles = ["All", "Admin", "Staff"];

function ListUserPage() {
  const [check, setCheck] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [userRole, setUserRole] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserRole(event);

    setUserRole(typeof value === "string" ? value.split(",") : value);
    setCheck(!check);
  };

  useEffect(() => {
    if (userRole[userRole.length - 1] === "All") {
      setUserRole(["All"]);
    } else if (userRole[0] === "All") {
      userRole.splice(0, 1);
      setUserRole(userRole);
      setCheck2(!check2);
    }
    console.log(userRole);
  }, [check]);
  useEffect(() => {}, [check2]);

  return (
    <div>
      <div style={{ color: "#e30613" }}>
        <h3>User List</h3>
      </div>
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
                value={userRole}
                onChange={handleChange}
                renderValue={() => "Type"}
                sx={{ width: "120px" }}
              >
                {roles.map((role) => {
                  console.log(userRole);
                  return (
                    <MenuItem key={role} value={role}>
                      <Checkbox checked={userRole.indexOf(role) > -1} />
                      <ListItemText primary={role} />
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
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </div>
          <div>
            <Button
              variant="contained"
              style={{ background: "#e30613", borderRadius: "8px" }}
            >
              Create new user
            </Button>
          </div>
        </div>
      </div>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          disableColumnMenu
          rows={rows}
          columns={columns}
          pageSize={20}
          // rowsPerPageOptions={[20]}
        />
      </Box>
    </div>
  );
}

export default ListUserPage;
