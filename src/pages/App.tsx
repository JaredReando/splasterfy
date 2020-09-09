import React, {useState} from 'react';

import './App.css';

function App() {
  const [input, setInput] = useState('')
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => {
            e.preventDefault()
            console.log("form data submitted: ", input)
        }}>
          <label htmlFor='artist'>Artist</label>
          <input 
            type="text" 
            id="artist"
            onChange={e => setInput(e.currentTarget.value)}
            value={input}
          />
          <button type="submit" className="App-link">Search</button>
        </form>
      </header>
    </div>
  );
}

export default App;
