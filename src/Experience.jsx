import { Environment, OrbitControls, SoftShadows, Sky } from "@react-three/drei"
import { MathUtils } from "three"
import * as THREE from "three"
import Character from "./Character"
import { useThree } from "@react-three/fiber"
import { Physics, RigidBody } from '@react-three/rapier'
import { Perf } from "r3f-perf"
import React, { useEffect, useRef } from 'react'
import { Model as Stage } from "./Stage"
import { useFrame } from "@react-three/fiber"
import { Colleague } from "./Colleague"
import { DEG2RAD } from"three/src/math/MathUtils"
function FollowShadowLight({ refLight, ...props},refCharacterRigid) {

    useFrame(() => {
        // console.log(refRigid)
        // if (refCharacterRigid.current) {

        //     const { x: cx, y: cy, z: cz } = refCharacterRigid.current.translation();
        //     const cPos = new THREE.Vector3(cx, cy, cz);
        //     const lightRevDir = new THREE.Vec(0, 1, 2).normalize();
        //     const newPos = lightRevDir.multiplyScalar(10).add(cPos);
        //     if (refLight.current) {
        //         refLight.current.target.position.set(cPos);
        //         refLight.current.position.copy(newPos);
        //     }
        // }
    },[]);
}

const Colleagues = [
    { name: "test1", animationName: "run", position: [2.5, 1, 0], rotationY: DEG2RAD * 0},
    { name: "test2", animationName: "run", position: [-2.5, 1, 0], rotationY: DEG2RAD * 45 },
    { name: "test3", animationName: "walk", position: [0, 1, 2.5], rotationY: DEG2RAD * 228 }
    ]
    
export default function Experience() {
    const { gl, scene } = useThree(({ gl, scene }) => ({ gl, scene }));
    useEffect(() => { gl.toneMappingExposure = 0.7 }, [gl, scene]);
    const refOrbitControls = useRef();
    const refLight = useRef();
    const refShadowCameraHelper = useRef();
    const refCharacterRigid = useRef();
    useEffect(() => {
        refShadowCameraHelper.current = new THREE.CameraHelper(refLight.current.shadow.camera);
        scene.add(refShadowCameraHelper.current);
        scene.add(refLight.current.target);
        return () => {
            scene.remove(refShadowCameraHelper.current);
            scene.remove(refLight.current.target);
        }
    }, [refLight.current]);

    // const shadowCameraSize = 20;
    return <>
        <Perf position="bottom-left"></Perf>
        <OrbitControls ref={refOrbitControls} />
        {/* <ambientLight intensity={0.2}/> */}
        <directionalLight castShadow ref={refLight} position={[0, 1, 2]} intensity={1} 
        // shadow-normalBias={0.1}
        // shadow-mapSize={[1024 * 4, 1024 * 4]}
        // shadow-camera-near={1}
        // shadow-camera-far={25}
        // shadow-camera-top={shadowCameraSize}
        // shadow-camera-bottom={shadowCameraSize}
        // shadow-camera-left={shadowCameraSize}
        // shadow-camera-right={shadowCameraSize}
        />
        <Environment preset="city" />
        <Sky />
        <SoftShadows size={2} focus={0} samples={8} />
        <Physics>
            <Character ref={refCharacterRigid} refOrbitControls={refOrbitControls} 
            name="metamong" position={[0,1,0]} />
            {/* <RigidBody type="fixed">
            <mesh receiveShadow>  
                <boxGeometry args={[100,0.1,100]}/>
                <meshBasicMaterial color="#5d6d72"/>

            </mesh>
            </RigidBody> 
            */}
             { Colleagues.map((item, idx) =><Colleague key={idx}{...item}/>) }
            <RigidBody type="fixed" colliders="trimesh">
                <Stage position={[0,-1,0]}/>
            </RigidBody>
            <RigidBody colliders="ball" position={[0, 2, 0]}>
                <mesh>
                    <sphereGeometry />
                    <meshStandardMaterial />
                </mesh>
            </RigidBody>
        </Physics>
        <FollowShadowLight refLight={refLight} ref={refCharacterRigid}/>
    </>
}