/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 frame2.glb -o ./frame2.jsx 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/frame2.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-1.757, -0.363, 1.147]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <group position={[10.049, 0.087, 6.25]} rotation={[0, 1.571, 0]}>
              <mesh geometry={nodes.Paper_Paper1_0_1.geometry} material={materials.Paper1} />
              <mesh geometry={nodes.Paper_Paper1_0_2.geometry} material={materials.Printable} />
            </group>
            <mesh geometry={nodes.Frame_Frame1_0.geometry} material={materials.Frame1} />
            <mesh geometry={nodes.Plexiglass_Plexiglass1_0.geometry} material={materials.Plexiglass1} position={[-6.611, 7.515, 1.174]} />
            <mesh geometry={nodes.Wood_Wood1_0.geometry} material={materials.Wood1} position={[0.391, 0.031, 0.227]} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/frame2.glb')