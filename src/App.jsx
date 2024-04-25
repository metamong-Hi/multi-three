import { useState } from 'react'
import './App.css'
import Experience from './Experience'
import {Canvas} from "@react-three/fiber"
import { KeyboardControls, Loader } from '@react-three/drei'


function App() {
  const [count, setCount] = useState(0)
  const [loaded,setLoaded] = useState(false);
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
     <Loader dataInterpolation={(v)=>{
      if(v>=100){
        setLoaded(true);
        return parseInt(v)+"% 다운로드 중입니다"
      }
     }}/>
    </>
  )
}

export default App
