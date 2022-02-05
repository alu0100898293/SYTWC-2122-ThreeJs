import { Color } from 'three'
import { createRef } from 'react'
import create from 'zustand'

const useStore = create((set, get) => {

  return {
    set,
    get,
    score: 0,
    level: 0,
    gameOver: false,
    gameStarted: false,
    musicEnabled: JSON.parse(localStorage.getItem('musicEnabled')) ?? false,
    difficult: '',
    numFigures : 0,
    coordinates: [[]],
    newLevel: false,
    successClick: false,
    playTime: false,
    sequenceLightTime : 0,
    sequenceResolveTime : 0,
    previousScores : '',
    directionalLight: createRef(),
    camera: createRef(),
    ship: createRef(),
    sun: createRef(),
    hasInteracted: false,
    setHasInteracted: () => set(strandomInRangeate => ({ hasInteracted: true })),
    incrementLevel: () => set(state => ({ level: state.level + 1,
                                          newlevel: true,
                                          playTime: false})),
    setScore: (score) => set(state => ({ score: score })),
    setPreviousScores: (diff) => set(state => ({ previousScores: localStorage.getItem('highscores'+diff) ? JSON.parse(localStorage.getItem('highscores'+diff)) : [...Array(5).fill(0)] })),
    setGameStarted: (started) => set(state => ({ gameStarted: started })),
    setGameOver: (over) => set(state => ({ gameOver: over })),
    enableMusic: (enabled) => set(state => ({ musicEnabled: enabled })),
    setDifficult: (diff) => set(state => ({ difficult: diff})),
    setNumFigures: (num) => set(state => ({ numFigures: num})),
    setPlayTime: (play) => set(state => ({ playTime: play})),
    setCoordinates: (coord) => set(state => ({ coordinates: coord})),
    setSequence: (seq) => set(state => ({ sequence: seq})),
    setNewLevel: (newLev) => set(state => ({ newLevel: newLev })),
    setSuccessClick: (success) => set(state => ({ successClick: success })),
    setSequenceLightTime: (lightTime) => set(state => ({ sequenceLightTime: lightTime })),
    setSequenceResolveTime: (resolveTime) => set(state => ({ sequenceResolveTime: resolveTime })),
  }
})

const mutation = {
  gameOver: false,
  score: 0,
  currentMusicLevel: 0,
  newLevel: false,
  showingSequence: false,
  sequence: [],
  sequenceLength : 0,
  lastClicked: 0,
  actualIndex: 0,
  sequenceResolveTimeTotal: -1,
  successClick: false,
  interactive: false
}

export { useStore, mutation }