import { useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

import { useStore, mutation } from '../state/useStore'

import randomInRange from '../util/randomInRange'

// this is supposedly a performance improvement
const gameStartedSelector = s => s.gameStarted
const setGameOverSelector = s => s.setGameOver
const setScoreSelector = s => s.setScore

const setNumFiguresSelector = s => s.numFigures
const setSequenceResolveTime = s => s.sequenceResolveTime
const setPlayTime = s => s.playTime

export default function GameState() {
  const gameStarted = useStore(gameStartedSelector)
  const setGameOver = useStore(setGameOverSelector)
  const setScore = useStore(setScoreSelector)

  const numFigures = useStore(setNumFiguresSelector)
  const sequenceResolveTime = useStore(setSequenceResolveTime)
  const playTime = useStore(setPlayTime)

  const level = useStore(s => s.level)

  useEffect(() => {
    if (gameStarted) {
      
      mutation.sequenceResolveTimeTotal = mutation.sequenceLength * sequenceResolveTime

      //Create the initial sequence
      let tmp = []
      for(let i=0; i<mutation.sequenceLength;i++)
        tmp.push(randomInRange(1, numFigures+1))
      mutation.sequence = tmp

      //Now we need to show the new combination
      setTimeout(() => {
        mutation.showingSequence = true
      }, 1000);

      console.log('sequence: ' + mutation.sequence)
    }
  }, [gameStarted, numFigures, sequenceResolveTime])


  useEffect(() => {
    if(level > 0){
      //We need a new combination
      mutation.interactive = false

      //Increment length for the new sequence
      mutation.sequenceLength++
      mutation.sequenceResolveTimeTotal = mutation.sequenceLength * sequenceResolveTime
    
      //Create new sequence
      let tmp = []
      for(let i=0; i<mutation.sequenceLength;i++)
        tmp.push(randomInRange(1, numFigures))
      mutation.sequence = tmp
      //Adjust actualIndex
      mutation.actualIndex = 0
      //Now we need to show the new combination
      setTimeout(() => {
        mutation.showingSequence = true
      }, 1000);

    }
}, [level, numFigures, sequenceResolveTime])

  useFrame((state, delta) => {

    if(playTime && !mutation.gameOver)
    {
      mutation.sequenceResolveTimeTotal -= delta
      if(mutation.sequenceResolveTimeTotal <= 0)
        mutation.gameOver = true
    }

    if (gameStarted && mutation.gameOver) {
      setScore(level+1)
      setGameOver(true)
    }
  })

  return null
}