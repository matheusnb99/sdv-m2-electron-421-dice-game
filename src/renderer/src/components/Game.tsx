import Dice from '@renderer/components/Dice'
import useDice from '@renderer/hooks/useDice'
import { FunctionComponent } from 'react'

interface GameProps {
  id: number
}

const Game: FunctionComponent<GameProps> = ({ id }) => {
  const { diceValues, won, lost, gameOver, score, restartGame, rollDices } = useDice()

  return (
    <>
      <div className="z-30 relative items-center flex justify-evenly flex-wrap p-8 pattern-dots-sm white">
        <Dice diceColor={'#fc4a89'} rollType="even-roll" diceNo={id} value={diceValues[0]} />
        <Dice diceColor={'#335fdb'} rollType="even-roll" diceNo={id} value={diceValues[1]} />
        <Dice diceColor={'#3bd0c3'} rollType="odd-roll" diceNo={id} value={diceValues[2]} />
      </div>

      <div className="z-30 elative  flex justify-center items-center flex-wrap gap-12 px-8 py-0">
        {!gameOver && (
          <button
            className={`hover:cursor-pointer ${
              lost ? 'e.target.style.filter = "grayscale(100%)"' : ''
            }`}
            onClick={() => rollDices(id)}
            id="roll-button"
          >
            Roll
          </button>
        )}
        {gameOver && (
          <button
            className="hover:cursor-pointer"
            onClick={(e) => {
              restartGame()
            }}
          >
            Restart (game over)
          </button>
        )}
      </div>

      <p className="text-white">{won && <>win streak {score}</>}</p>
      <p className="text-white">{lost && <>lost streak {score}</>}</p>
    </>
  )
}

export default Game
