import PropTypes from 'prop-types'

type Props = {
  diceColor: string | undefined
  rollType: string
  diceNo: number
  value: number
}

const colors = {
  red: '#fc4a89',
  blue: '#335fdb',
  green: '#3bd0c3'
}

const Dice: React.FC<Props> = ({ diceColor = 'red', rollType, diceNo, value }) => {
  const renderDots = (numDots) => {
    const dots: JSX.Element[] = []
    for (let i = 0; i < numDots; i++) {
      dots.push(<span key={i} className="dot h-5 w-5 bg-white rounded-full"></span>)
    }
    return dots
  }

  return (
    <ol
      className={`die-list grid grid-cols-[1fr] grid-rows-[1fr] h-24 list-none w-24 cursor-pointer ${rollType}`}
      data-roll={value}
      id={`die-${diceNo}`}
    >
      {[1, 2, 3, 4, 5, 6].map((side) => (
        <li
          key={side}
          style={{ backgroundColor: diceColor }}
          className="die-item grid grid-cols-3 grid-rows-3 h-full w-full p-4"
          data-side={side}
        >
          {renderDots(side)}
        </li>
      ))}
    </ol>
  )
}

Dice.propTypes = {
  rollType: PropTypes.string.isRequired,
  diceNo: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

export default Dice
