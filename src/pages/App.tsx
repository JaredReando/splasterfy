import React, {useState} from 'react';
import './App.css';
import { Artist, Artists, GetInfoResponse } from "../api/last_fm/artists";
import { TextField } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  input: {
    background: 'white'
  }
});

// function createData(name: string) {
//   return { name };
// }

// const rows = [
//   createData('Frozen yoghurt'),
//   createData('Ice cream sandwich'),
//   createData('Eclair'),
//   createData('Cupcake'),
//   createData('Gingerbread')
// ];

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
  const classes = useStyles();
  const artist = new Artists()

  const [input, setInput] = useState<string>('')
  const [response, setResponse] = useState<Artist[] | null>(null);
  const getArtistsInfo = async (artists: Array<Artist>) => {
    console.time('timer')
    const infoPromiseArray = []
    for (const a of artists) {
      const info: Promise<GetInfoResponse> = artist.getInfo({
        artist: a.name,
        mbid: a.mbid,
      })
      infoPromiseArray.push(info)
    }
    console.timeEnd('timer')
    console.time('allPromises')
    const results = await Promise.all(infoPromiseArray)
    console.timeEnd('allPromises')

    return results
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={async (e: React.SyntheticEvent<HTMLFormElement>) => {
          e.preventDefault()
          const response = await artist.getSimilar({artist: input})
          // debugger
          if ('error' in response) {
            console.log('that artist could not be found, please try another search')
            return
          }
          const { similarartists: {artist:  similarArtists} } = response
          console.time('form')
          console.log(similarArtists);
          if(!similarArtists) {
            console.log('artists um failed..')
          }
          const artistInfo = await getArtistsInfo(similarArtists)
          console.log('artists info: ', artistInfo)
          setResponse(similarArtists)
          console.timeEnd('form')
        }}>
          <label htmlFor='artist'>Artist</label>
          <TextField
            className={classes.input}
            variant="outlined"
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
              <TableContainer component={Paper}>
                <Table stickyHeader className={classes.table} aria-label="similar-artists">
                  <TableHead>
                    <TableRow>
                      <TableCell>Artist</TableCell>
                      <TableCell>Match</TableCell>
                      <TableCell>Image</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {response.map((artist: any, i: number) => {
                      return (
                          <TableRow key={artist.name}>
                            <TableCell component="th" scope="row">
                              {artist.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {artist.match}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              <img src={artist.image[0]["#text"]} alt={artist.name}/>
                            </TableCell>
                          </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
          )}
        </div>
    </div>
  );
}

export default App;
