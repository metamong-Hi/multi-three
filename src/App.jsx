import { useState } from 'react'
import './App.css'
import Experience from './Experience'
import {Canvas} from "@react-three/fiber"
import { KeyboardControls } from '@react-three/drei'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <KeyboardControls map={[
      {name:"forward",keys:["ArrowUp","KeyW"]},
      {name:"backward",keys:["ArrowDown","KeyS"]},
      {name:"leftward",keys:["ArrowLeft","KeyA"]},
      {name:"rightward",keys:["ArrowRight","KeyD"]},
      {name:"walk",keys:["Shift"]},


    ]}>
     <Canvas shadows>
      <Experience/>
     </Canvas>
     </KeyboardControls>
    </>
  )
}

export default App
