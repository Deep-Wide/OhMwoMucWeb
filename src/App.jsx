import { useState } from 'react'
import './App.css'
import {Outlet} from "react-router-dom";
import {Topbar} from "./common/Topbar.jsx";

function App() {
  return (
      <div className={"default-layout"}>
          <Topbar></Topbar>
          <Outlet/>
      </div>
  )
}

export default App
