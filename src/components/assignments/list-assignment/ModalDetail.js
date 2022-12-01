import { IconButton, Modal } from "@mui/material";
import { Box } from "@mui/system";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";

import Title from "../../common/title/Title";
import { useContext } from "react";
import { ListAssignmentContext } from "../../../contexts/providers/ListAssignmentProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalDetail = props => {
  const { 
    listAssignmentState,     
    changeOpenModalStatus
 } = useContext(ListAssignmentContext);
  return (
    <Modal
    keepMounted
    open={listAssignmentState.modalDetail.open}
    onClose={() => changeOpenModalStatus(false)}
    aria-labelledby="keep-mounted-modal-title"
    aria-describedby="keep-mounted-modal-description"
  >
    <Box sx={style} style={{ borderRadius: "20px", width: "700px" }}>
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid black",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title title="Detailed Asset Information" />
        <IconButton 
          onClick={() => changeOpenModalStatus(false)}
          >
          <DisabledByDefaultOutlinedIcon
            sx={{ fontSize: 40 }}
            style={{ color: "#e30613" }}
          />
        </IconButton>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <p>Asset Code</p>
          <p>Asset Name</p>
          <p>Category</p>
          <p>Installed Date </p>
          <p>State </p>
          <p>Location </p>
          <p>Specification</p>
        </div>
        <div style={{ paddingLeft: "15px" }}>
          {/* <p> {listAssignmentState.data.code}</p>
          <p> {listAssignmentState.assetDetails.name}</p>
          <p> {listAssignmentState.assetDetails.categoryName}</p>
          <p>
            {listAssignmentState.assetDetails.installedDate
              ? listAssignmentState.assetDetails.installedDate
              : "N/A"}
          </p>
          <p> {listAssignmentState.assetDetails.state}</p>
          <p> {listAssignmentState.assetDetails.location}</p>
          <p> {listAssignmentState.assetDetails.specification}</p> */}
        </div>
      </div>
    </Box>
  </Modal>

  )
}

export default ModalDetail;