import { useState } from 'react'
import './App.css'
import {Button} from "flowbite-react";

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="App">
          <Button color="blue">Flowbite React 버튼</Button>
      </div>
  )
}

export default App
