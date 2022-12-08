
import { ACTIONS } from "../actions/ReportAction";

const reducer = (state, { type, payload }) => {
    switch (type) {
        case ACTIONS.SET_LIST_RETURNING:
            state = { ...state, reports: payload };
            break;
        default:
            break;
    }
    return { ...state };
};

export default reducer;
