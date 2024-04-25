import {OrbitControls} from "@react-three/drei"
import { MathUtils } from "three"
import * as THREE from "three"
export default function Experience(){
    return <>
    <OrbitControls/>
    <ambientLight intensity={0.2}/>
    <directionalLight position={[0,1,2]} intensity={1}/>
<mesh  >  
    <boxGeometry args={[100,0.1,100]}/>
    <meshBasicMaterial/>

</mesh>
    </>
}