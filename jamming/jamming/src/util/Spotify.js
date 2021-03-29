let accessToken;
const clientId = '';
const redirect = 'http://localhost:3000/'

const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        } else if(window.location.href.match("/access_token=([^&]*)//expires_in=([^&]*)/")){
            accessToken = window.location.href.match("/access_token=([^&]*");
            let expiration = window.location.href.match("/expires_in=([^&]**)");
            window.setTimeout(() => {
                accessToken = '';
            }, expiration*1000);
            window.history.pushState('Access Token', null, '/');
        }
        else{
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect}`
        }
    },

    search(searchTerm){
        fetch(`https://api.spotify.com/v1/search?type=trakc&q=${searchTerm}`, { headers: {
            Authorization: `Bearer ${accessToken}`
        }}).then(response => response.json())
        .then(response => {
            if(response.tracks.length === 0){
                return [];
            }
            else{
                let tracks = response.tracks.items.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    };
                });
                return tracks;
            }
        });
    },

    savePlaylist(name, trackURIs){
        if(name && trackURIs){
            let token = accessToken;
            let playlistId;
            let headers = {
                Authorization: `Bearer ${token}`
            };
            let userId = '';
            fetch('https://api.spotify.com/v1/me', {headers: headers})
            .then(response => response.json())
            .then(response => {
                userId = response.id
            });
            fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
            {headers: headers, method:'POST', body:{name: name }})
            .then(response => response.json())
            .then(response => {
                playlistId = response.id;
            });
            fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
            {headers: headers, method:'POST', body:{uris: trackURIs}})
            .then(response => response.json())
            .then(response => {
                playlistId = response.id;
            });
        }

        return;
    },
};

module.exports = Spotify;