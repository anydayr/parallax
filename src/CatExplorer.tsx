import {  OrbitControls } from '@react-three/drei'
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
