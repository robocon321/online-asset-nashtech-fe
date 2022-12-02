import { IconButton, Modal } from "@mui/material";
import { Box } from "@mui/system";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";

import Title from "../common/title/Title";
import { useContext } from "react";
import { HomeContext } from "../../contexts/providers/HomeProvider";

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

const ModalDetail = () => {
  const { homeState, changeOpenModalStatus } = useContext(HomeContext);
  return (
    <Modal
      keepMounted
      open={homeState.modalDetail.open}
      onClose={() => changeOpenModalStatus(false)}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style} style={{ borderRadius: "20px", width: "500px" }}>
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid black",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Title title="Detailed Assignment Information" />
          <IconButton onClick={() => changeOpenModalStatus(false)}>
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
            <p>Specification</p>
            <p>Assigned to</p>
            <p>Assigned by </p>
            <p>Assigned Date </p>
            <p>State</p>
            <p>Note</p>
          </div>
          <div style={{ paddingLeft: "15px" }}>
            <p> {homeState.modalDetail.data.assetCode}</p>
            <p> {homeState.modalDetail.data.assetName}</p>
            <p> {homeState.modalDetail.data.specification}</p>
            <p> {homeState.modalDetail.data.assignedTo}</p>
            <p> {homeState.modalDetail.data.assignedBy}</p>
            <p> {homeState.modalDetail.data.assignedDate}</p>
            <p> {homeState.modalDetail.data.state}</p>
            <p> {homeState.modalDetail.data.note}</p>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalDetail;
