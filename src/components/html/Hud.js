import { useEffect, useState, useRef } from 'react'
import { addEffect } from '@react-three/fiber'

import { useStore, mutation } from '../../state/useStore'

import '../../styles/hud.css'

const getRemainingTime = () => `${mutation.sequenceResolveTimeTotal.toFixed(0)}`

export default function Hud() {
  
  const level = useStore(s => s.level)
  const difficult = useStore(s => s.difficult)
  const playTime = useStore(s => s.playTime)

  const gameOver = useStore(s => s.gameOver)
  const gameStarted = useStore(s => s.gameStarted)

  const [shown, setShown] = useState(false)

  const timeRef = useRef()
  const stateRef = useRef()

  let currentTime = getRemainingTime()
  let currentState = 'WAIT'

  useEffect(() => addEffect(() => {
    if(playTime && !mutation.gameOver)
    {
      timeRef.current.innerText = getRemainingTime()
    }
  }))

  useEffect(() => {
    if (playTime) {
      if(stateRef.current)
        stateRef.current.innerText = 'GO!'
    }
    else{
      if(stateRef.current)
        stateRef.current.innerText = 'WAIT'
    }
  }, [playTime])

  useEffect(() => {
    if (gameStarted && !gameOver) {
      setShown(true)
    } else {
      setShown(false)
    }
  }, [gameStarted, gameOver])

  return shown ? (
    <div className="hud">
      <div className="bottomLeft">
        <div className={`score`}>
          <h3 className="score__title">LEVEL</h3>
          <h1 className="score__number">{level + 1}</h1>
          <h3 className="score__title">TIME</h3>
          <h1 ref={timeRef} className="score__number">{currentTime}</h1>
          <h3 className="score__title">STATE</h3>
          <h1 ref={stateRef} className="score__number">{currentState}</h1>
          <h3 className="score__title">MODE</h3>
          <h2 className="score__mode">{difficult}</h2>
        </div>
      </div>
    </div>
  ) : null
}