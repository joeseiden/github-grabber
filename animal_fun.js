const fs = require('fs');
const http = require('http');
const querystring = require('querystring');

// let letter = process.argv[2].toLowerCase();

// fs.readFile('./animals.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     let selectedAnimals = data.split("\n").filter((animal) => {
//       if (typeof animal === "string" && animal[0]) {
//         return animal[0].toLowerCase() === letter;
//       }
//     });
//     fs.writeFile(`${letter}_animals.txt`, selectedAnimals.join("\n"), err => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(`file successfully written to ${letter}_animals.txt!`);
//       }
//     })
//   }
// })

// const server = http.createServer((req, res) => {
//   res.write('hello world');
//   res.end();
// })
//
// server.listen(8000, () => console.log("I'm listening on port 8000!"))

const cache = {}

const selectAnimals = (animalString, animalLetter) => {
  return animalString
    .split('\n')
    .filter(animal => animal.startsWith(animalLetter))
    .join('\n');
}

const animalServer = http.createServer((req, res) => {
  const query = req.url.split('?')[1];
  if (query) {
    const animalLetter = querystring.parse(query).letter.toUpperCase();

    if (animalLetter) {
      if (cache[animalLetter]) {
        res.end(cache[animalLetter]);
      }
      fs.readFile('./animals.txt', 'utf-8', (err, data) => {
        if (err) {
          console.log(err);
          res.end('IT DONE GOOFED');
          return
        }

        const animals = selectAnimals(data, animalLetter);
        cache[animalLetter] = animals;
        res.end(animals);
      })
    }
  } else {
    if (cache['animals']) {
      res.end(cache['animals']);
    }
    fs.readFile('./animals.txt', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
        res.end('IT DONE GOOFED');
        return
      }
      cache['animals'] = data;
      res.end(data);
    })
  }
})

animalServer.listen(8000, () => console.log("Listening on port 8000"));
