# IFTTT channel to save your favorites songs from spotify into your repo

## Setup

Log in into your [IFTTT](https://ifttt.com) account and create a new *Make a web request* from *spotify*:

`GET https://wt-51209ddc02bcaaec1e0ef3b8032054f4-0.run.webtask.io/playlists`

### Url Parameters:
```javascript
UserToken: Yours Github`s token
RepoOwner: Yours Github`s user name
RepoName: Yours Github`s repo name
TrackName: Track name
AlbumName: Album Name
ArtistName: Artist Name
```

### Body content:
```javascript
{
  TrackURL: 'link to your song'
}
```

https://wt-51209ddc02bcaaec1e0ef3b8032054f4-0.run.webtask.io/playlists?UserToken={{UserToken}}&RepoOwner={{RepoOwner}}&RepoName={{RepoName}}&TrackName={{TrackName}}&AlbumName={{AlbumName}}&ArtistName={{ArtistName}}

## References
[If This Then Node.js](https://auth0.com/blog/if-this-then-node-dot-js-extending-ifttt-with-webtask-dot-io/)
