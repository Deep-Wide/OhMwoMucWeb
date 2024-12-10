import {Route, Routes} from "react-router-dom";
import App from "../App.jsx";
import Muamucmuamuc from "../community/Muamucmuamuc.jsx";
import NewContent from "../community/NewContent.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import Content from "../community/Content.jsx";

export default function Router() {

    return (
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path="/muamuc">
                    <Route path="/muamuc/" element={<Muamucmuamuc />} />
                    <Route path="/muamuc/newcontent" element={<NewContent/>}/>
                    <Route path="/muamuc/content" element={<Content/>}/>
                </Route>
            </Route>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    )

}