import '../styling/App.css';
import { useState } from 'react';

function App() {
  const [gameStart, setGameStart] = useState(false);
  const startGame = () => {
    setGameStart(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          NBA Guessing Game
        </p>
        {!gameStart && (
          <button onClick = {startGame}>
            Start Game
          </button>
        )}
        {gameStart && (
          <p>
            
          </p>
        )}
        </header>
    </div>
  );
}

export default App;
