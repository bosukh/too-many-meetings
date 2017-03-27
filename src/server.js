'use strict'

import path from 'path'
import Express from 'express'

// initialize the server and configure support for ejs templates
const app = new Express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(Express.static(path.join(__dirname, 'static')))

app.get('/*', (req,res) => {
  res.render('index')
})


const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'production';
app.listen(port, err => {
  if (err) {
    return console.error(err)
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
})
