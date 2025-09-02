import React from 'react'
import { useGLTF } from '@react-three/drei'

export function CatModel(props) {
  const { nodes, materials } = useGLTF('./models/cat.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        scale={20}
        geometry={nodes.Object_4.geometry}
        material={materials['Material_0.006']}
        position={[-5, -24.2, -0.017]}
        rotation={[-Math.PI, 1.562, -Math.PI]}
      />
    </group>
  )
}

useGLTF.preload('./models/cat.glb')
