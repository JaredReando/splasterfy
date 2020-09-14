import React, {useState} from 'react';
import './App.css';
import { Artist, Artists } from "../api/last_fm/artists";


interface Detail {
  bio: {
    links: any, 
    published: string; 
    summary: string;
    content: string
  }
  image: any;
  mbid: string;
  name: string;
  ontour: string;
  similar: any;
  stats: {
    listeners: string;
    playcount: string;
  }
  streamable: string;
  tags: {
    tag: any;
  }
  url: string;
}

function App() {
  const artist = new Artists()

  const [input, setInput] = useState<string>('')
  const [response, setResponse] = useState<Artist[] | null>(null);

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={async (e: React.SyntheticEvent<HTMLFormElement>) => {
          e.preventDefault()
          const { similarartists: {artist:  similarArtists} } = await artist.getSimilar({artist: input})
          console.log(similarArtists);
          setResponse(similarArtists)
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
        <div style={{
          display: 'flex', 
          flexDirection: 'column', 
          flexGrow: 1,
          width: "100%",
          overflow: 'auto', 
          border: '1px solid lightgrey',
          padding: '20px',
        }}>
          {response && (
            <ul>
              {response.map((artist: any, i: number) => {
                return (
                  <li style={{display: 'flex', 
                  color: 'lightgrey', justifyContent: 'space-between'}} key={artist.url}>
                    <h3>{artist.name}</h3>
                {/*<h4>{`Listeners: ${artist.fullDetails.stats.listeners}`}</h4>*/}
                  </li>
                )
              })}
            </ul>
          )}  
        </div>
    </div>
  );
}

export default App;
