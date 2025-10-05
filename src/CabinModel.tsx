
import { useGLTF } from '@react-three/drei'
import { CatModel } from './CatModel'
import { GroupProps } from '@react-three/fiber'

interface CabinModelProps extends GroupProps {}

export function CabinModel(props: CabinModelProps) {
  const { nodes, materials } = useGLTF('./models/cabin.glb') as any

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
