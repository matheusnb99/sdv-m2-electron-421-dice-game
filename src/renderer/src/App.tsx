import Game from '@renderer/components/Game'
import { useState } from 'react'

const App = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(1)
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNumberOfPlayers(Number(event.target.value))
  }

  return (
    <div className="relative w-[100vw] h-[100vh] overflow-hidden p-8">
      <div className="mb-8">
        <label htmlFor="player-select" className="mr-4 text-white">
          Select number of players:
        </label>
        <select
          id="player-select"
          value={numberOfPlayers}
          onChange={handleSelectChange}
          className="p-2 rounded bg-gray-700 text-white"
        >
          <option value={1}>1 player</option>
          <option value={2}>2 players</option>
        </select>
      </div>

      <div className="flex flex-col gap-8">
        <Game id={1} luckyDraw={true} />
        {numberOfPlayers === 2 && <Game id={2} />}
      </div>
    </div>
  )
}

export default App
