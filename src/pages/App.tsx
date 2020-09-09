import React, {useState} from 'react';

import './App.css';


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
  const [input, setInput] = useState<string>('')
  const [response, setResponse] = useState<any | null>(null);
  
  const BASE_LAST_FM_URL = "http://ws.audioscrobbler.com/2.0"
  const getSimiliarArtist = async (artist: string) => {
    const requestUrl = BASE_LAST_FM_URL + `?method=artist.getsimilar&artist=${encodeURI(artist)}&api_key=${process.env.REACT_APP_LAST_FM_KEY}&format=json`
    const similarArtists = await fetch(requestUrl)
      .then(res => res.json())
    const artistDetails = similarArtists.similarartists.artist.map(async (artist: any) => {
      return await fetch(BASE_LAST_FM_URL + `?method=artist.getinfo&mbid=${artist.mbid}&api_key=${process.env.REACT_APP_LAST_FM_KEY}&format=json`)
            .then(res => res.json())
    })
    const fullDetails = await Promise.all(artistDetails)

    const everything = similarArtists.similarartists.artist.map((a: any) => {
      const newA = {...a}
      const details: any = fullDetails.find((d: any) => d.artist.mbid === a.mbid)
      newA.fullDetails = details.artist;
       return newA
   })
    setResponse(everything)
    console.log('erythig: ', everything)
    return everything;
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={async (e: React.SyntheticEvent<HTMLFormElement>) => {
          e.preventDefault()
          await getSimiliarArtist(input)
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
      {response && (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <ul>
            {response.map((artist: any, i: number) => {
              return (
                <li key={artist.url}>
                  <h3>{artist.name}</h3>
              <h4>{`Listeners: ${artist.fullDetails.stats.listeners}`}</h4>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
