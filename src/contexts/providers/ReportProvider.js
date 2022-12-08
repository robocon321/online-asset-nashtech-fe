import { createContext, useContext, useEffect, useReducer } from "react";
import {
    loadReportAction,
    setLoadingAction,
} from "../actions/ReportAction";

import ReportReducer from "../reducers/ReportReducer";
import { AppContext } from "./AppProvider";

export const ReportContext = createContext();

const initState = {
    reports: [],
};

const ReportProvider = (props) => {
    const [reportState, dispatch] = useReducer(
        ReportReducer,
        initState
    );

    useEffect(() => {
    }, [reportState]);
    const { setLoading } = useContext(AppContext);

    useEffect(() => {
        loadData();
    }, []);


    const loadData = async () => {
        setLoading(true);
        // setLoadingAction(true)(dispatch);
        await loadReportAction()(dispatch);
        // setLoadingAction(false)(dispatch);
        setLoading(false);
    };
    const value = {
        reportState,
    };

    return (
        <ReportContext.Provider value={value}>
            {props.children}
        </ReportContext.Provider>
    );
};

export default ReportProvider;
