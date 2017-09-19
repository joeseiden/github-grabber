const fs = require('fs');
let letter = process.argv[2].toLowerCase();

fs.readFile('./animals.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    let selectedAnimals = data.split("\n").filter((animal) => {
      if (typeof animal === "string" && animal[0]) {
        return animal[0].toLowerCase() === letter;
      }
    });
    fs.writeFile(`${letter}_animals.txt`, selectedAnimals.join("\n"), err => {
      if (err) {
        console.log(err);
      } else {
        console.log(`file successfully written to ${letter}_animals.txt!`);
      }
    })
  }
})
