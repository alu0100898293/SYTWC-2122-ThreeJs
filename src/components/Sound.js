import { AudioListener, AudioLoader } from 'three'
import { useRef, useEffect, useState, Suspense } from 'react'
import { useLoader } from '@react-three/fiber'

import { useStore } from '../state/useStore'

import correct from '../audio/correct.mp3'
import incorrect from '../audio/incorrect.mp3'

function Sound() {
  const sound = useRef()
  const soundOrigin = useRef()


  const camera = useStore(s => s.camera)
  const musicEnabled = useStore(s => s.musicEnabled)
  const level = useStore(s => s.level)
  const gameStarted = useStore(s => s.gameStarted)
  const gameOver = useStore(s => s.gameOver)
  const successClick = useStore(s => s.successClick)

  const [listener] = useState(() => new AudioListener())

  const correctSound = useLoader(AudioLoader, correct)
  const incorrectSound = useLoader(AudioLoader, incorrect)

  const setSuccessClick = useStore(s => s.setSuccessClick)

  useEffect(() => {

    if (musicEnabled) {
      sound.current.setVolume(0.5)
    } else {
      sound.current.setVolume(0)
    }

    if (camera.current) {
      const cam = camera.current
      cam.add(listener)
      return () => cam.remove(listener)
    }
  }, [musicEnabled, camera, listener])

  useEffect(() => {
    if (gameOver) {
      sound.current.setBuffer(incorrectSound)
      sound.current.play()
    }
  }, [gameOver, incorrectSound])

  useEffect(() => {
    if (successClick) {
      console.log('sound')
      sound.current.setBuffer(correctSound)
      sound.current.play()
      setSuccessClick(false)
    }
  }, [successClick, correctSound, setSuccessClick])

  return (
    <group ref={soundOrigin}>
      <audio ref={sound} args={[listener]} />
    </group>
  )
}

export default function SuspenseSound() {

  return (
    <Suspense fallback={null}>
      <Sound />
    </Suspense>
  )
}