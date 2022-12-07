import axios from "axios";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const ACTIONS = {
    SET_LIST_RETURNING: "SET_LIST_RETURNING",
    SET_LOADING: "SET_LOADING",
};



export const loadReturningAction = () => async (dispatch) => {
    // await axios
    //     .get(`${API_ENDPOINT}/v1/return-requests`)
    //     .then((res) => {
    //         dispatch({
    //             type: ACTIONS.SET_LIST_RETURNING,
    //             payload: res.data,
    //         });
    //     })
    //     .catch((err) => console.log(err.data));

    const rows = [];

    await setTimeout(() => {
        for (var i = 0; i < 30; i++) {
            rows.push({
                id: i + 1,
                categoryName: "Category " + i,
                total: 1000 + i,
                assigned: 100 + i,
                avalable: 100 + i + 2,
                notAvailable: 100 * i,
                waitingForRecycling: 100,
                recycled: 200
            })
        }
        dispatch({
            type: ACTIONS.SET_LIST_RETURNING,
            payload: rows,
        });
    }, 1000)

    // const rows = [];
    // const states = ["All", "Accepted", "Waiting for acceptance"];

    // await setTimeout(() => {
    //   for (var i = 0; i < 30; i++) {
    //     rows.push({
    //       id: i,
    //       assetCode: "Asset code " + i,
    //       assetName: "Asset Name " + i,
    //       requestedBy: "username" + i,
    //       assignedBy: "Assigned By " + i,
    //       assignedDate: `${Math.floor(Math.random() * 30 + 1)}/${Math.floor(
    //         Math.random() * 11 + 1
    //       )}/${Math.floor(Math.random() * 2 + 2020)}`,
    //       acceptedBy: "username" + Math.floor(Math.random()*100),
    //       returnedDate: `${Math.floor(Math.random() * 30 + 1)}/${Math.floor(
    //         Math.random() * 11 + 1
    //       )}/${Math.floor(Math.random() * 2 + 2020)}`,
    //       state: `${states[Math.floor(Math.random() * 2 + 1)]}`,
    //     });
    //   }

    //   dispatch({
    //     type: ACTIONS.SET_LIST_RETURNING,
    //     payload: rows
    //   })
    // }, 1000);
};

export const setLoadingAction = (isLoading) => (dispatch) => {
    dispatch({
        type: ACTIONS.SET_LOADING,
        payload: isLoading,
    });
};

