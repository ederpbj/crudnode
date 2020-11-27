// console.log('Funciona!')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const ObjectId = require('mongodb').ObjectID

// Mongo 
const MongoClient = require('mongodb').MongoClient;

// conectar ao monog, pegar na net
const uri = "mongodb+srv://ederpbj:098098ml@cluster0.09fe3.mongodb.net/<dbname>?retryWrites=true&w=majority"

// extrai os dados do elemento form
app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect(uri, (err, client) => {
   if(err) return console.log(err)
   db = client.db('crud-nodejs') //node do meu db
   // Inicia servidor
   app.listen(3000, function(){
      console.log('server running on port 3000')
   })
})

// Renderiza ejs
app.set('view engine', 'ejs')

// Rota padrão
app.get('/', (req, res) => {
   // res.send('Heloo World')
   res.render('index.ejs')
})


app.get('/', (req, res) => {
   let cursor = db.collection('data').find()
})

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})

app.post('/show', (req, res) => {
   // console.log('Hello again..')
   // console.log(req.body)
   db.collection('data').save(req.body, (err, result) => {
      if(err) return console.log(err)

      console.log('salvo no banco de dados')
      res.redirect('/show')
   })
})

