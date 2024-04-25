import { useState } from 'react'
import './App.css'
import Experience from './Experience'
import {Canvas} from "@react-three/fiber"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Canvas shadows>
      <Experience/>
     </Canvas>
    </>
  )
}

export default App
