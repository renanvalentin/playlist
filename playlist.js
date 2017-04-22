const GitHubApi = require('github')
const Promise = require('bluebird')

module.exports = function (ctx, done) {
  const github = setupGitHub(ctx.data)

  createSongCategories(github, ctx.data)
    .then(() => saveTrack(github, ctx.data))
    .finally(() => done(null, 'Track saved!'))
}

function setupGitHub(data) {
  const github = new GitHubApi({
    debug: false,
    protocol: 'https',
    host: 'api.github.com',
    headers: {
      'user-agent': 'My-Cool-GitHub-App'
    },
    Promise: Promise,
    followRedirects: false,
    timeout: 5000
  })

  github.authenticate({
    type: 'token',
    token: data.UserToken
  });

  return github
}

function createSongCategories(github, data) {
  return new Promise((resolve, reject) => {
    Promise.all([
      createLabel(github, data.RepoOwner, data.RepoName, data.AlbumName),
      createLabel(github, data.RepoOwner, data.RepoName, data.ArtistName)
    ]).finally(() => resolve())
  })
}

function saveTrack(github, data) {
  return github.issues.create({
    owner: data.RepoOwner,
    repo: data.RepoName,
    title: `${data.TrackName} from ${data.AlbumName} by ${data.ArtistName}`,
    body: `Song [url](${data.TrackURL})`,
    labels: [data.AlbumName, data.ArtistName]
  })
}

function createLabel(github, repoOwner, repoName, label) {
  return github.issues.createLabel({
    owner: repoOwner,
    repo: repoName,
    name: label,
    color: stringToColor(label)
  })
}

function stringToColor(str) {
  let hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 3) - hash)
  }

  const color = Math.abs(hash).toString(16).substring(0, 6)

  return '000000'.substring(0, 6 - color.length) + color
}