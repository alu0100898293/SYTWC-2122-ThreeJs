import { useProgress } from '@react-three/drei'
import { useState, useEffect } from 'react'

import Loader from './CustomLoader'
import Author from './Author'

import '../../styles/gameMenu.css'

import { useStore, mutation } from '../../state/useStore'

import {  EASYCOORDINATES, MEDIUMCOORDINATES, HARDCOORDINATES,
          EASYSEQUENCELENGTH, EASYSEQUENCELIGHT, EASYSEQUENCERESOLVE, 
          MEDIUMSEQUENCELENGTH, MEDIUMSEQUENCELIGHT, MEDIUMSEQUENCERESOLVE,
          HARDSEQUENCELENGTH, HARDSEQUENCELIGHT, HARDSEQUENCERESOLVE,
        } from '../../constants'

const Overlay = () => {
  const [shown, setShown] = useState(true)
  const [opaque, setOpaque] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const { active, progress } = useProgress()

  const gameStarted = useStore(s => s.gameStarted)
  const gameOver = useStore(s => s.gameOver)
  const setGameStarted = useStore(s => s.setGameStarted)
  const setDifficult = useStore(s => s.setDifficult)
  const setNumFigures = useStore(s => s.setNumFigures)
  const setCoordinates = useStore(s => s.setCoordinates)
  const setSequenceLightTime = useStore(s => s.setSequenceLightTime)
  const setSequenceResolveTime = useStore(s => s.setSequenceResolveTime)

  const musicEnabled = useStore(s => s.musicEnabled)
  const enableMusic = useStore(s => s.enableMusic)
  const setHasInteracted = useStore(s => s.setHasInteracted)
  const setPreviousScores = useStore(s => s.setPreviousScores)

  useEffect(() => {
    if (gameStarted || gameOver) {
      setShown(false)
    } else if (!gameStarted) {
      setShown(true)
    }
  }, [gameStarted, active, gameOver])

  useEffect(() => {
    let t
    if (hasLoaded === opaque) t = setTimeout(() => setOpaque(!hasLoaded), 300)
    return () => clearTimeout(t)
  }, [hasLoaded, opaque])

  useEffect(() => {
    localStorage.setItem('musicEnabled', JSON.stringify(musicEnabled))
  }, [musicEnabled])

  useEffect(() => {
    if (progress >= 100) {
      setHasLoaded(true)
    }
  }, [progress])

  const handleStartEasy = () => {

    mutation.sequenceLength = EASYSEQUENCELENGTH
    
    setDifficult('Easy')
    setNumFigures(EASYSEQUENCELENGTH)
    setCoordinates(EASYCOORDINATES)
    setSequenceLightTime(EASYSEQUENCELIGHT)
    setSequenceResolveTime(EASYSEQUENCERESOLVE)

    setGameStarted(true)
    setPreviousScores('Easy')
  }

  const handleStartMedium = () => {
    
    mutation.sequenceLength = MEDIUMSEQUENCELENGTH

    setDifficult('Medium')
    setNumFigures(MEDIUMSEQUENCELENGTH)
    setCoordinates(MEDIUMCOORDINATES)
    setSequenceLightTime(MEDIUMSEQUENCELIGHT)
    setSequenceResolveTime(MEDIUMSEQUENCERESOLVE)

    setGameStarted(true)
    setPreviousScores('Medium')
  }

  const handleStartHard = () => {
    
    mutation.sequenceLength = HARDSEQUENCELENGTH

    setDifficult('Hard')
    setNumFigures(HARDSEQUENCELENGTH)
    setCoordinates(HARDCOORDINATES)
    setSequenceLightTime(HARDSEQUENCELIGHT)
    setSequenceResolveTime(HARDSEQUENCERESOLVE)

    setGameStarted(true)
    setPreviousScores('Hard')
  }

  const handleMusic = () => {
    enableMusic(!musicEnabled)
  }


  const [showInstructions, setShowInstructions] = useState(false)
  
  const handleShowInstructions = () => {
    setShowInstructions(!showInstructions)
  }

  function renderContent() {
    if(!showInstructions)
      return (<>
        <button onClick={handleStartEasy} className="game__menu-button">{'EASY'}</button>
        <button onClick={handleStartMedium} className="game__menu-button">{'MEDIUM'}</button>
        <button onClick={handleStartHard} className="game__menu-button">{'HARD'}</button>
        <div className="game__menu-options">
          <button onClick={handleMusic} className="game__menu-button game__menu-button-music">{`TURN MUSIC > ${musicEnabled ? 'OFF' : 'ON'}`}</button>
          <button onClick={handleShowInstructions} className="game__menu-button-instructions">{'SHOW INSTRUCTIONS'}</button>

          <Author />
        </div>
      </>)
      
    else
      return (<>
        <span className="game__menu-controls">
            <h1>Instructions</h1>
            <p> A sequence of figures is going to be highlighted, you must to repeat the sequence 
              in te correct order</p>
            <p>If you fail the sequence or you get out of time, and you will get a Game Over</p>
            <p>Enable the music to hear the sounds effects</p>
        </span>
        <button onClick={handleShowInstructions} className="game__menu-button">{'BACK'}</button>
      </>)
  }


  return shown ? (
    <div onClick={() => setHasInteracted()} className={`game__container`} style={{ opacity: shown ? 1 : 0, background: opaque ? '#141622FF' : '#141622CC' }}>
      <div className="game__menu">
        <h1 className="game__menu-title">SIMON GAME ON THREE.JS</h1>
        <div className="game__subcontainer">
          {!hasLoaded ? (
            <Loader active={active} progress={progress} />
          ) : (
              <>
              {renderContent() }
              </>
            )}
        </div>
      </div>
    </div >
  ) : null
}

export default Overlay