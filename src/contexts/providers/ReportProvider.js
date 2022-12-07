import { createContext, useEffect, useReducer } from "react";
import {
    loadReturningAction,
    setLoadingAction,
} from "../actions/ReportAction";

import ReportReducer from "../reducers/ReportReducer";

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

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoadingAction(true)(dispatch);
        await loadReturningAction()(dispatch);
        setLoadingAction(false)(dispatch);
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
