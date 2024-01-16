const { readdir, rename } = require('fs').promises

readdir('./')
.then(filenames => {
  filenames.forEach(filename => {
    let index = filename.lastIndexOf('.')
    let extend = filename.substring(index)
    if(filename === 'rename.js') return false;
    let newName = generateRandomString()
    console.log(['rename: '+filename])
    rename('./'+filename, './'+newName+extend.toLocaleLowerCase())
    .then(em => console.log(['rename: '+filename+' success']))
    .catch(console.error)
  })
})

function generateRandomString() {
  const possibleChars = "0123456789abcdef";
  let randomString = "";
  for (let i = 0; i < 16; i++) {
    randomString += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }
  return randomString;
}
