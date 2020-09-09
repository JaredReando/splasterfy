import React, {useState} from 'react';

import './App.css';

const BASE_LAST_FM_URL = "http://ws.audioscrobbler.com/2.0"
const getSimiliarArtist = async (artist: string) => {
  const requestUrl = BASE_LAST_FM_URL + `?method=artist.getsimilar&artist=${encodeURI(artist)}&api_key=${process.env.REACT_APP_LAST_FM_KEY}&format=json`
  const response = await fetch(requestUrl)
    .then(res => res.json())
  return response;
}

function App() {
  const [input, setInput] = useState('')
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={async (e: React.SyntheticEvent<HTMLFormElement>) => {
          e.preventDefault()
          const search = await getSimiliarArtist(input)
          console.log("url: ", search)
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
