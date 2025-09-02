import React from 'react'
import { useGLTF } from '@react-three/drei'
import { CatModel } from './CatModel'

export function CabinModel(props) {
  const { nodes, materials } = useGLTF('./models/cabin.glb')

  return (
    <group {...props} position={[25, -25, 25]} dispose={null}>
      <mesh
        geometry={nodes.Loww_Poly_house2Mesh_initialShadingGroup_0.geometry}
        material={materials.initialShadingGroup}
        scale={18}
      />
      <CatModel position={[0, 0, 0]} scale={0.1} />{' '}
    </group>
  )
}

useGLTF.preload('./models/cabin.glb')
