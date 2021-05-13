const express = require('express')
const app = express()

require('dotenv').config()

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/', require('./src/routes/user/user'));

app.listen(process.env.PORT || 3000, () => {
  console.log(`app listening at http://localhost:${process.env.PORT || 3000}`)
})