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
import { AssetContext } from "../../../contexts/providers/AssetProvider";
import IconButton from "@mui/material/IconButton";
import { UserContext } from "../../../contexts/providers/UserProvider";
import Stack from "@mui/material/Stack";
import { ListAssetContext } from "../../../contexts/providers/ListAssetProvider";
import RemoveAsset from "../../common/dialog/removeAssets/RemoveAsset";

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
      No Asset Found
    </Stack>
  );
}
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
function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
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
function ListAsset() {
  const { assetState } = useContext(AssetContext);
  const {
    listAssetState,
    handleChange,
    changeState,
    handleSearch,
    openRemoveDialog,
    selectRemoveIdDialog,
  } = useContext(ListAssetContext);
  const states = [
    "All",
    "Assigned",
    "Available",
    "Not available",
    "Waiting for recycling",
    "Recycled",
  ];

  // Remove asset
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");

  const columns = [
    {
      field: "code",
      renderHeader: () => {
        return (
          <strong style={{ display: "flex" }}>
            <h4>Asset Code</h4>
          </strong>
        );
      },
      type: "code",
      width: 90,
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      renderHeader: () => {
        return (
          <strong style={{ display: "flex" }}>
            <h4>Asset Name</h4>
          </strong>
        );
      },
      type: "name",
      width: 150,
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "categoryName",
      renderHeader: () => {
        return (
          <strong>
            <h4>Category</h4>
          </strong>
        );
      },
      // renderCell: (params) => {
      //   // console.log(params);
      //   return <p>{params.row.category.name}</p>;
      // },
      sortComparator: (v1, v2) => {
        // console.log(v1.row.category.name, v2);
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
      type: "string",
      width: 150,
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "state",
      renderHeader: () => {
        return (
          <strong style={{ display: "flex" }}>
            <h4>State</h4>
          </strong>
        );
      },
      type: "date",
      width: 110,
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      width: 110,
      flex: 2,
      align: "center",
      renderCell: (params) => {
        // console.log()
        if (params.row.state === "Assigned") {
          return (
            <div>
              {/* <Link to={"/users/edit/" + params.id}> */}
              <GridActionsCellItem
                disabled
                icon={<EditRoundedIcon />}
                label="edit"
              />
              {/* </Link> */}
              <GridActionsCellItem
                disabled
                icon={<HighlightOffRoundedIcon style={{ color: "red" }} />}
                label="Delete"
              />
            </div>
          );
        } else {
          return (
            <div>
              {/* <Link to={"/users/edit/" + params.id}> */}
              <GridActionsCellItem icon={<EditRoundedIcon />} label="edit" />
              {/* </Link> */}
              <GridActionsCellItem
                icon={<HighlightOffRoundedIcon style={{ color: "red" }} />}
                label="Delete"
                onClick={() => {
                  openRemoveDialog();
                  selectRemoveIdDialog(params.row.id);
                }}
              />
            </div>
          );
        }
      },
    },
  ];
  return (
    <div>
      <Title title="Asset List"></Title>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            // marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            width: "25vw",
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
                  value={listAssetState.assetState}
                  onChange={changeState}
                  renderValue={() => listAssetState.assetState.toString()}
                  sx={{ width: "160px" }}
                >
                  {states.map((state) => {
                    // const cateFilter=[]
                    console.log(state, listAssetState.assetState);
                    return (
                      <MenuItem key={state} value={state}>
                        <Checkbox
                          checked={
                            listAssetState.assetState.indexOf(state) > -1
                          }
                        />
                        <ListItemText primary={state} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div>
            <Box>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  IconComponent={() => <FilterAltIcon />}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  multiple
                  value={listAssetState.assetCategory}
                  onChange={handleChange}
                  renderValue={() => listAssetState.assetCategory.toString()}
                  sx={{ width: "160px" }}
                >
                  <MenuItem value={"All"}>
                    <Checkbox
                      checked={listAssetState.assetCategory.indexOf("All") > -1}
                    />
                    <ListItemText primary={"All"} />
                  </MenuItem>
                  {assetState.categories.map((cate) => {
                    // const cateFilter=[]
                    console.log(cate, listAssetState.assetCategory);
                    return (
                      <MenuItem key={cate.name} value={cate.name}>
                        <Checkbox
                          checked={
                            listAssetState.assetCategory.indexOf(cate.name) > -1
                          }
                        />
                        <ListItemText primary={cate.name} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </div>
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
                Create new asset
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={assetState.assets.filter((item) => {
            console.log(item);
            if (
              listAssetState.assetState.length &&
              listAssetState.assetState[0] !== "All" &&
              !listAssetState.assetState.includes(item.state)
            ) {
              return false;
            }
            if (
              listAssetState.assetCategory.length &&
              listAssetState.assetCategory[0] !== "All" &&
              !listAssetState.assetCategory.includes(item.categoryName)
            ) {
              return false;
            }
            if (
              !(
                item.code
                  .toUpperCase()
                  .includes(listAssetState.search.toUpperCase()) ||
                item.categoryName
                  .toUpperCase()
                  .includes(listAssetState.search.toUpperCase())
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

      <RemoveAsset open={open} setOpen={setOpen} id={id} />
    </div>
  );
}

export default ListAsset;
