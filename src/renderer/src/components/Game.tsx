import Dice from '@renderer/components/Dice'
import MatchHistory from '@renderer/components/MatchHistory'
import useDice from '@renderer/hooks/useDice'
import { FunctionComponent, useState } from 'react'

type GameProps = {
  id: number
  luckyDraw?: boolean
}
const getRollType = (index) => {
  return index % 2 === 0 ? 'even' : 'odd'
}

const Game: FunctionComponent<GameProps> = ({ id, luckyDraw = false }) => {
  const { won, diceValues, gameOver, restartGame, rollDices } = useDice(luckyDraw ?? false)

  const [diceNumber, setDiceNumber] = useState(3)

  const [gameHistory, setGameHistory] = useState<{ diceValues: string; result: string }[]>([])

  console.log('diceValues', gameOver)

  return (
    <div className="flex">
      <div className="w-1/6 p-4">
        <MatchHistory history={gameHistory} />
      </div>

      <div className="w-5/6 pr-4">
        <div className="z-30 relative items-center flex justify-evenly flex-wrap pr-8  py-8 pattern-dots-sm white">
          {Array.from({ length: diceNumber }, (_, i) => i).map((i) => (
            <Dice key={i} rollType={getRollType(i)} diceNo={id} value={diceValues[i]} />
          ))}
        </div>

        <div className="z-30 elative  flex justify-center items-center flex-wrap gap-12 px-8 py-0">
          {!gameOver && (
            <button
              className={`hover:cursor-pointer`}
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
                setGameHistory((prev) => [
                  ...prev,
                  {
                    diceValues: diceValues.join(', '),
                    result: won.valueOf() ? 'Won' : 'Lost'
                  }
                ])
              }}
            >
              Restart (game over)
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Game
