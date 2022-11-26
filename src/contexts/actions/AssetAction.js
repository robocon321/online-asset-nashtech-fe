export const ACTIONS = {
  ADD_ASSET: "ADD_ASSET",
  EDIT_ASSET: "EDIT_ASSET"
};

export const addAssetAction = (asset) => (dispatch) => {
  dispatch({
    type: ACTIONS.ADD_ASSET,
    payload: asset,
  });
};

export const editAssetAction = (asset) => (dispatch) => {
  dispatch({
    type: ACTIONS.EDIT_ASSET,
    payload: asset
  })
}