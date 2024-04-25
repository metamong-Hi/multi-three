import {Environment, OrbitControls} from "@react-three/drei"
import { MathUtils } from "three"
import * as THREE from "three"
import{Character} from "./Character"
export default function Experience(){
    return <>
    <OrbitControls/>
    <ambientLight intensity={0.2}/>
    <directionalLight position={[0,1,2]} intensity={0.1}/>
    <Environment preset="city" background/>
    <Character/>
<mesh  >  
    <boxGeometry args={[100,0.1,100]}/>
    <meshBasicMaterial color="#5d6d72"/>

</mesh>
    </>
}