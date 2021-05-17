const express = require('express')
const app = express()

require('dotenv').config()

// Cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

// Load routes
app.use('/api/', require('./src/routes/user/user'));
app.use('/api/', require('./src/routes/login/login'));
app.use('/api/', require('./src/routes/game/game'));

app.listen(process.env.PORT || 3000, () => {
  console.log(`app listening at http://localhost:${process.env.PORT || 3000}`)
})
