import { getRandomNumber, toggleClasses } from '@renderer/utils'
import { useEffect, useState } from 'react'

const useDice = () => {
  const initialDiceState = 6
  const [diceValues, setDiceValues] = useState([
    initialDiceState,
    initialDiceState,
    initialDiceState
  ])
  const [locks, setLocks] = useState([false, false, false])
  const [gameStatus, setGameStatus] = useState({ won: false, lost: false, gameOver: false })
  const [score, setScore] = useState(0)
  const [lostStreak, setLostStreak] = useState(0)
  const [luckyDraw, setLuckyDraw] = useState(false)

  const restartGame = () => {
    setDiceValues([initialDiceState, initialDiceState, initialDiceState])
    setLocks([false, false, false])
    setGameStatus({ won: false, lost: false, gameOver: false })
  }

  const checkWinCondition = (values) => {
    const winningCombinations = [
      [1, 3, 4],
      [1, 4, 3],
      [3, 1, 4],
      [3, 4, 1],
      [4, 1, 3],
      [4, 3, 1]
    ]
    return winningCombinations.some((combination) =>
      combination.every((val, index) => val === values[index])
    )
  }

  const updateGameStatus = () => {
    const gameOver = locks.every((lock) => lock)
    const isWon = checkWinCondition(diceValues)

    if (isWon) {
      setGameStatus({ won: true, lost: false, gameOver: true })
      setScore(score + 1)
      setLostStreak(0)
      console.log('You won!')
    } else if (gameOver) {
      setGameStatus({ won: false, lost: true, gameOver: true })
      setScore(0)
      setLostStreak(lostStreak + 1)
      console.log('Game over!')
      if (lostStreak > 2) {
        setLuckyDraw(true)
      }
    }
  }

  useEffect(updateGameStatus, [diceValues, locks, lostStreak])

  const rollDice = (dice) => {
    const value = getRandomNumber(1, 6)
    dice.dataset.roll = value
    toggleClasses(dice)
    return value
  }

  const rollAndSetValue = (dice, index) => {
    if (!locks[index]) {
      const value = rollDice(dice)
      setDiceValues((prev) => {
        const newValues = [...prev]
        newValues[index] = value
        return newValues
      })
      if (value !== 6) {
        setLocks((prev) => {
          const newLocks = [...prev]
          newLocks[index] = true
          return newLocks
        })
      }
    }
  }

  const rollDices = (id) => {
    const dices = document.querySelectorAll(`#die-${id}`)
    dices.forEach((dice, index) => rollAndSetValue(dice, index))

    if (luckyDraw) {
      setDiceValues([1, 3, 4])
    }
  }

  return {
    ...gameStatus,
    diceValues,
    locks,
    score,
    lostStreak,
    luckyDraw,
    restartGame,
    rollDices
  }
}

export default useDice
