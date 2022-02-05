import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Preload } from '@react-three/drei'

import { useStore } from '../state/useStore'

// THREE components
import Cube from './Cube'
import Icosahedron from './Icosahedron'
import Octahedron from './Octahedron'
import Tetrahedron from './Tetrahedron'
import Sphere from './Sphere'
import Torus from './Torus'

import Skybox from './Skybox'

// State/dummy components
import GameState from './GameState'
import Music from './Music'
import Sound from './Sound'

// HTML components
import Overlay from './html/Overlay'
import Hud from './html/Hud'
import GameOverScreen from './html/GameOverScreen'


export default function SimonGame({ color, bgColor }) {
  const directionalLight = useStore((s) => s.directionalLight)
  const difficult = useStore((s) => s.difficult)

  function conditionalRendering() {
    if (difficult === 'Easy') {
      return(<>
              <Cube />
              <Sphere />
              <Tetrahedron />
              <Octahedron />
            </>
      );
    } 
    else {
      if (difficult === 'Medium') {
        return(<>
            <Cube />
            <Sphere />
            <Tetrahedron />
            <Octahedron />
            <Icosahedron />
          </>
        );
      }
      else 
        if (difficult === 'Hard') {
          return(<>
              <Cube />
              <Sphere />
              <Tetrahedron />
              <Octahedron />
              <Icosahedron />
              <Torus />
            </>
          );
        }
    }
  }

  return (
    <>
      <Canvas gl={{ antialias: false, alpha: false }} mode="concurrent" dpr={[1, 1.5]} style={{ background: `${bgColor}` }}>
        <Suspense fallback={null}>
          <GameState />
          <Skybox />
          <directionalLight
            intensity={0.8}
            position={[0, 2, 4]}
          />
          <ambientLight intensity={0.1} />
          {conditionalRendering()}
          <Music />
          <Sound />
          <Preload all />
        </Suspense>
      </Canvas>
      <Hud />
      <GameOverScreen />
      <Overlay />
    </>
  )
}