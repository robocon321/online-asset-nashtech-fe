export const ACTIONS = {
  ADD_ASSET: "ADD_ASSET"
};

export const addAssetAction = (asset) => (dispatch) => {
  dispatch({
    type: ACTIONS.ADD_ASSET,
    payload: asset,
  });
};