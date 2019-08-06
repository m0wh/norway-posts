const fs = require('fs').promises
const path = require('path')
const marked = require('marked')
const package = require('../package.json')

const postsDir = path.join(__dirname, '../posts')
const distDir = path.join(__dirname, '../dist')


let title = package.displayName || package.name
let desc = package.description || ''

const htmlHead = `<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>${title}</title>
  <style>
  body {
    margin: 0;
    background: #222;
    color: #c2c2c2;
    font-size: 1.2rem;
  }
  .post, .intro {
    max-width: 720px;
    margin: 100px auto;
  }

  small {
    font-size: 0.6em;
  }

  h1 {
    font-size: 5rem;
    color: #fff;
    margin-bottom: 0;
  }

  h2 {
    font-size: 3rem;
    color: #fff;
    margin-bottom: 0;
  }
  </style>
</head>
<body>
<section class="intro">
  <h1>${title}</h1>
  <p>${desc}</p>
</section>
`

const htmlFoot = `
</body>
</html>`

let fullHTML = htmlHead

fs.readdir(postsDir).then(files => {
  Promise.all(files.map(async file => {
    try {
      const md = await fs.readFile(path.join(postsDir, file), 'utf-8')

      const newMd = md
        .replace('<!-- ', '<small>')
        .replace('-->', '</small>')
        .replace('#', '##')

      const html = await marked(newMd)

      fullHTML += `<section class="post">` + html + "</section>"
    } catch (e) { }
    return fullHTML
  })).then(() => {
    fs.writeFile(path.join(distDir, 'index.html'), fullHTML)
  })
}).then(() => console.log('Done!')).catch()
