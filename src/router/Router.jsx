import {Route, Routes} from "react-router-dom";
import App from "../App.jsx";
import Muamucmuamuc from "../community/Muamucmuamuc.jsx";
import NewContent from "../community/NewContent.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import Content from "../community/Content.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../login/Signup.jsx";
import Email from "../login/Email.jsx";
import Information from "../login/Information.jsx";

export default function Router() {

    return (
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path={"login"} element={<Login />}/>
                <Route path="/signup">
                    <Route path="/signup" element={<Signup />}/>
                    <Route path="/signup/email" element={<Email />}/>
                    <Route path="/signup/info" element={<Information />}/>
                </Route>
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