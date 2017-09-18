const fs = require('fs');

// fs.readFile('./animals.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(data);
// })
//

fs.writeFile('./example.txt', 'I will be written to example.txt', err => {
  if (err) {
    console.log(err);
  } else {
    console.log("file successfully written!");
  }
})
