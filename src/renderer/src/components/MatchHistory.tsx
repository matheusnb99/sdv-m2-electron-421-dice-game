import { FunctionComponent } from 'react'

type MatchHistoryProps = {
  history: { diceValues: string; result: string }[]
}

const MatchHistory: FunctionComponent<MatchHistoryProps> = ({ history }) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        {history.map((diceValues, index) => (
          <div key={index} className="flex justify-between">
            <p className="text-white">{diceValues.diceValues}</p>
            <p className="text-white">{diceValues.result}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default MatchHistory
