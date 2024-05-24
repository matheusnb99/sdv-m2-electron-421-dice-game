import Game from '@renderer/components/Game'

const App = () => {
  // States

  return (
    <>
      <div className="relative w-[100vw] h-[100vh] overflow-hidden">
        <Game id={1} />
        <Game id={2} />
      </div>
    </>
  )
}

export default App
