import { OrbitControls } from '@react-three/drei'
import { CabinModel } from './CabinModel'

export default function HouseExplore() {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight />

      <OrbitControls />
      <mesh>
        <CabinModel />
        <meshNormalMaterial />
      </mesh>
    </>
  )
}
