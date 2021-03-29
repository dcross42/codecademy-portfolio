//import logo from './logo.svg';
import './App.css';
import React from 'react';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {searchResults: [
      {
        'name': 'Tiny Dancer',
        'artist': 'Elton John',
        'album': 'Madman Across The Water',
      },
      {
        'name': 'Tiny Dancer',
        'artist': 'Tim McGraw',
        'album': 'Love Story',
      }
    ],
    playlistName: 'My Favorite Playlist',
    playlistTracks: [
      {
        'name': 'Tiny Dancer',
        'artist': 'Elton John',
        'album': 'Madman Across The Water',
      },
      {
        'name': 'Tiny Dancer',
        'artist': 'Tim McGraw',
        'album': 'Love Story',
      }
    ],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.search = this.search.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks} 
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }

  addTrack(track){
    if(this.state.playlistTracks.find( savedTrack => savedTrack.id === track.id)){
      return;
    }
    this.setState((state, props) => ({
      playlistTracks: state.playlistTracks.push(track)
    }));

  }

  removeTrack(track){
    let newPlaylist = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({playlistTracks: newPlaylist});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(){
    let trackURIs = [];
    this.state.playlistTracks.forEach(track => {
      trackURIs.push(track.uri);
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({playlistName: 'New Playlist', playlistTracks: []});
    
  }

  search(searchTerm){
    this.setState({ searchResults: Spotify.search(searchTerm)});
    console.log(searchTerm);
  }

}


export default App;
