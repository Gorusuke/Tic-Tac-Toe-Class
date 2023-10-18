import { useState } from 'react';
import confetti from 'canvas-confetti'
import './App.css'
import { Square } from './components/Square'
import { TURNS } from './constants';
import { checkWinner } from './logic/checkWinner'; 

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.O);
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if(board[index] !== null || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.O ? TURNS.X : TURNS.O
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (!newBoard.includes(null)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.O);
    setWinner(null)
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className='game'>
        {board.map((_, index) => 
          <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
          >
            {board[index]}
          </Square>
        )}
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      </section>
      {
        winner !== null &&
        <section className='winner'>
            <div className='text'>
              <h2>{winner === false ? 'Empato' : 'Gano'}</h2>
                {winner &&
                  <header className='win'>
                   <Square>{winner}</Square>
                  </header>
                }
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>    
        </section>
      }
    </main>
  )
}

export default App
