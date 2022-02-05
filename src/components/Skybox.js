import { Suspense, useRef, useMemo, useLayoutEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useTexture, Stars } from '@react-three/drei'
import { Color, BackSide, MirroredRepeatWrapping } from 'three'

import galaxyTexture from '../textures/galaxy.jpg'

import { useStore } from '../state/useStore'

import { COLORS } from '../constants'

function Sun() {
  const { clock } = useThree()

  const sun = useStore((s) => s.sun)

  const sunColor = useMemo(() => new Color(1, 0.694, 0.168), [])

  useFrame((state, delta) => {

    sun.current.scale.x += Math.sin(clock.getElapsedTime() * 3) / 3000
    sun.current.scale.y += Math.sin(clock.getElapsedTime() * 3) / 3000

  })

  return (
    <mesh ref={sun} position={[0, 0, -2000]}>
      <sphereGeometry attach="geometry" args={[300, 30, 30]} />
      <meshStandardMaterial fog={false} emissive={sunColor} emissiveIntensity={1} attach="material" color={COLORS[2].three} />
    </mesh>
  )
}

function Sky() {
  const texture = useTexture(galaxyTexture)
  const sky = useRef()
  const stars = useRef()

  useLayoutEffect(() => {
    texture.wrapS = texture.wrapT = MirroredRepeatWrapping
    texture.repeat.set(1.8, 1.8)
    texture.anisotropy = 16
  }, [texture])


  useFrame((state, delta) => {
    sky.current.rotation.z += delta * 0.02 
    stars.current.rotation.z += delta * 0.02 
  })


  return (
    <>
      <Stars ref={stars} radius={600} depth={100} count={10000} factor={40} saturation={1} fade />
      <mesh ref={sky} position={[0, 10, -50]} rotation={[0, 0, Math.PI]}>
        <hemisphereLight intensity={0.7} />
        <sphereGeometry attach="geometry" args={[2000, 10, 10]} />
        <meshPhongMaterial emissive={COLORS[2].three} emissiveIntensity={0.1} fog={false} side={BackSide} attach="material" map={texture} />
      </mesh>
    </>
  )
}

export default function Skybox() {

  return (
    <Suspense fallback={null}>
      <Sun />
      <Sky />
    </Suspense>
  )
}