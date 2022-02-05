import { useState, useEffect} from 'react'

import '../../styles/gameMenu.css'

import { useStore } from '../../state/useStore'

const GameOverScreen = () => {
  const difficult = useStore(s => s.difficult)
  const previousScores = useStore(s => s.previousScores)

  const [shown, setShown] = useState(false)
  const [opaque, setOpaque] = useState(false)
  const [highScores, setHighscores] = useState(previousScores)

  const gameOver = useStore(s => s.gameOver)
  const score = useStore(s => s.score)


  useEffect(() => {
    let t
    if (gameOver !== opaque) t = setTimeout(() => setOpaque(gameOver), 500)
    return () => clearTimeout(t)
  }, [gameOver, opaque])

  useEffect(() => {
    setHighscores(previousScores)
  }, [previousScores])

  useEffect(() => {
    if (gameOver) {
      setShown(true)
    } else {
      setShown(false)
    }
  }, [gameOver])

  useEffect(() => {
    if (gameOver) {
      if (highScores.some(previousScore => score > previousScore)) {
        const sortedScores = highScores.sort((a, b) => a - b)
        sortedScores[0] = score.toFixed(0)
        const resortedScores = sortedScores.sort((a, b) => b - a)

        setHighscores(resortedScores)
        localStorage.setItem('highscores'+difficult, JSON.stringify(resortedScores))
      }
    }
  }, [difficult, gameOver, highScores, score])

  const handleRestart = () => {
    window.location.reload() // TODO: make a proper restart
  }

  return shown ? (
    <div className="game__container" style={{ opacity: shown ? 1 : 0, background: opaque ? '#141622FF' : '#141622CC' }}>
      <div className="game__menu">
        <h1 className="game__score-gameover">GAME OVER</h1>
        <div className="game__scorecontainer">
          <div className="game__score-left">
            <h1 className="game__score-title">SCORE</h1>
            <h1 className="game__score">{score.toFixed(0)}</h1>
          </div>
          <div className="game__score-right">
            <h1 className="game__score-title">HIGH SCORES OF {difficult.toUpperCase()}</h1>
            {highScores.map((newScore, i) => (
              <div key={`${i}-${score}`} className="game__score-highscore">
                <span className="game__score-number">{i + 1}</span>
                <span style={{ textDecoration: score.toFixed(0) === newScore ? 'underline' : 'none' }} className="game__score-score">{newScore > 0 ? newScore : '-'}</span>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleRestart} className="game__menu-button">RESTART</button>
      </div>
    </div>
  ) : null
}

export default GameOverScreen