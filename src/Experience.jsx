import {Environment, OrbitControls, SoftShadows} from "@react-three/drei"
import { MathUtils } from "three"
import * as THREE from "three"
import Character  from "./Character"
import {useThree} from "@react-three/fiber"
import { Physics, RigidBody } from'@react-three/rapier'
import {Perf} from "r3f-perf"
import React, { useEffect, useRef } from 'react'

import { useFrame } from "@react-three/fiber"

function FollowShadowLight({refLight,refCharacterRigid}){
    useFrame(()=>{
        
    });
}


export default function Experience(){
    const {gl,scene}=useThree(({gl,scene})=>({gl,scene}));
    useEffect(()=>{gl.toneMappingExposure=0.7},[gl,scene]);
    const refOrbitControls=useRef();
    const refLight=useRef();
    const refShadowCameraHelper=useRef();
    const refCharacterRigid=useRef();
    const refRigid=useRef();
    useEffect(()=>{
        refShadowCameraHelper.current=new THREE.CameraHelper(refLight.current.shadow.camera);
        scene.add(refShadowCameraHelper.current);
        scene.add(refLight.current.target);
        return ()=>{
            scene.remove(refShadowCameraHelper.current);
            scene.remove(refLight.current.target);
        }
    },[refLight.current]);

    return <>
    <Perf position="bottom-left"></Perf>
    <OrbitControls ref={refOrbitControls}/>
    {/* <ambientLight intensity={0.2}/> */}
    <directionalLight castShadow ref={refLight} position={[0,1,2]} intensity={1}/>
    <Environment preset="city" background/>
    <SoftShadows size={2} focus={0} samples={8}/>
    <Physics debug>
    <Character ref={refRigid} refOrbitControls={refOrbitControls}/>
    <RigidBody type="fixed">
<mesh receiveShadow>  
    <boxGeometry args={[100,0.1,100]}/>
    <meshBasicMaterial color="#5d6d72"/>

</mesh>
</RigidBody>
<RigidBody colliders="ball" position={[0,2,0]}>
<mesh>
    <sphereGeometry/>
    <meshStandardMaterial/>
</mesh>
</RigidBody>
</Physics>
<FollowShadowLight refLight={refLight} ref={refCharacterRigid}/>
    </>
}