
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations, Capsule, Html } from '@react-three/drei'
import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { SkeletonUtils } from 'three-stdlib'
import { useGraph } from '@react-three/fiber'
import { useMemo } from 'react'
import { DEG2RAD } from 'three/src/math/MathUtils'
import { useFrame } from '@react-three/fiber'
const CHARACTER_HEIGHT = 1.79
const CAPSULE_RADIUS = 0.3

function ApplyShadow({ refTarget }) {
    useEffect(() => {
        refTarget.current?.traverse((obj) => {
            if (obj.isMesh) {
                obj.castShadow = true
                obj.receiveShadow = true
            }
        })
    }, [])
}

// function Animation({ actions, refModel, refRigid, animationName, position, rotationY }) {
//     useEffect(() => {
//         const action = actions[animationName]
//         action.reset().fadeIn(0.5).play()
//         return () => {
//             action.fadeOut(0.5)
//         }
//     }, [animationName])
//     useFrame((state, delta) => {
//         // 회전
//         if (refModel.current) {
//             const rotateQuarternion = new THREE.Quaternion()
//             rotateQuarternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotationY)
//             refModel.current.quaternion.rotateTowards(rotateQuarternion, DEG2RAD * 5)
//         }
//         // 위치
//         if (refRigid.current) {
//             const cy = refRigid.current.translation().y
//             refRigid.current.setTranslation({ x: position[0], y: cy, z: position[2] });
//         }
//     })
// }
export function Colleague({ name = "익명", position, animationName = "walk", rotationY = 0 }) {
    // const group = useRef();
    const refModel = useRef();
    const refRigid = useRef();

    const { scene, materials, animations } = useGLTF('/Robot.glb')
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
    const { nodes } = useGraph(clone)
    const { actions } = useAnimations(animations, refModel)
    return (
        <>
            <RigidBody ref={refRigid} colliders={false} position={position}>
                <group ref={refModel}>
                    <CapsuleCollider args={[CHARACTER_HEIGHT / 2 - CAPSULE_RADIUS, CAPSULE_RADIUS]} />
                    <group position-y={-CHARACTER_HEIGHT / 2} dispose={null}>
                        <group name="Scene">
                            <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                                <primitive object={nodes.mixamorigHips} />
                                <skinnedMesh name="Alpha_Joints" geometry={nodes.Alpha_Joints.geometry} material={materials.Alpha_Joints_MAT} skeleton={nodes.Alpha_Joints.skeleton} />
                                <skinnedMesh name="Alpha_Surface" geometry={nodes.Alpha_Surface.geometry} material={materials.Alpha_Body_MAT} skeleton={nodes.Alpha_Surface.skeleton} />
                            </group>
                        </group>
                    </group>
                </group>
                <Html wrapperClass="character-name" position-y={CHARACTER_HEIGHT + CHARACTER_HEIGHT / 13} center>
                    {name}
                </Html>
            </RigidBody>
            <ApplyShadow refTarget={refModel} />
            {/* <Animation actions={actions} refModel={refModel} refRigid={refRigid}
                animationName={animationName} position={position} rotationY={rotationY} /> */}
        </>
    )
}
useGLTF.preload('/Robot.glb')