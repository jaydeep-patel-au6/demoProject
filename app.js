require('./models/db')

const express = require('express') 
const path = require('path')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const songsController = require('./controllers/songsController') // path for controllers
const PORT = process.env.PORT || 3001
const app = express()

//bodyparser middelware to use url data
app.use(bodyParser.urlencoded({
    extended: true
}))

//convert data into json
app.use(bodyParser.json())

//set view engine
app.set('views', path.join(__dirname, '/views/'))
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: './views/layouts/'}))
app.set('view engine', 'hbs')



//path localhost:3000/song
app.use('/song', songsController)

// DB Config
const db = require('./models/db').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  //server port
app.listen(PORT , ()=>{
  console.log('Server started at port 3000')
})