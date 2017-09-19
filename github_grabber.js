const fs = require('fs');
const querystring = require('querystring');
const https = require('https');
const http = require('http');

const createOptions = (username) => {
  return {
    hostname: 'api.github.com',
    path: `/users/${username}/starred`,
    headers: {
      'User-Agent': 'github-grabber'
    }
  }
}
const githubServer = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', d => {
      body += d;
    });
    req.on('end', () => {
      const username = querystring.parse(body).username
      const ws = fs.createWriteStream(`./${username}_starred_repos.txt`);
      const options = createOptions(username);
      https.get(options, (dataStream) => {
        let repoData = '';
        dataStream.on('data', d => { repoData += d });
        dataStream.on('end', () => {
          const repos = JSON.parse(repoData).map(repo => {
            return `Repo: ${repo.name}. Stars: ${repo.stargazers_count}.`
          }).join('\n');
          ws.write(repos);
          res.end(repos);
        })
      })
    });
  } else {
    res.end("Danger, Will Robinson, this isn't a post request!");
  }
})

githubServer.listen(8080, () => console.log('Listening on 8080'));
