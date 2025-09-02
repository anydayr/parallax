import { Lightformer, OrbitControls } from '@react-three/drei'
import { CabinModel } from './CabinModel'
import { CatModel } from './CatModel'

export default function CatExplore() {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight />

      <OrbitControls />
      <mesh>
        <CatModel />
        <meshNormalMaterial />
      </mesh>
    </>
  )
}
