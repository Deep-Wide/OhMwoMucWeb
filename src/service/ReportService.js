import {fetchGet, fetchPost} from "./fetch.js";

const serverHost = import.meta.env.VITE_SERVER_HOST;
const REPORT_API_URL = `${serverHost}/api/report`

export const fetchGetReportTitleList = () => {
    return fetchGet(`${REPORT_API_URL}/title`)
}

export const fetchPostAddReport = (report) => {
    console.log("report: ", report)
    return fetchPost(REPORT_API_URL, report)
}