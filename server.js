// console.log('Funciona!')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const ObjectId = require('mongodb').ObjectID

// Teste
const ejs = require('ejs')
// app.engine('html', require('ejs').renderFile);
const fs = require('fs')


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

// Renderiza ejs, template
app.set('view engine', 'ejs')

app.route('/') //setado a rota, e abaixo as ações a serem tomadas dentro desta rota
.get(function(req, res) {
  const cursor = db.collection('data').find()
  res.render('index.ejs')
})

.post((req, res) => {
  db.collection('data').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('Salvo no Banco de Dados')
    res.redirect('/show')
  })
})

app.route('/show')
.get((req, res) => {
  db.collection('data').find().toArray((err, results) => {
    if (err) return console.log(err)
    res.render('show.ejs', { data: results })
    // Testando ejs
    ejs.renderFile('./views/template.ejs', {
      items: ['Eder Pires', 'Batista']
    }, (err, html) => {
      fs.writeFile('template.html', html, (err) => {
        console.log('ok')
      })
      console.log(html)
    })
  })
})

app.route('/edit/:id')
.get((req, res) => {
  var id = req.params.id

  db.collection('data').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('edit.ejs', { data: result })
  })
})
.post((req, res) => {
  var id = req.params.id
  var name = req.body.name
  var surname = req.body.surname

  db.collection('data').updateOne({_id: ObjectId(id)}, {
    $set: {
      name: name,
      surname: surname
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/show')
    console.log('Atualizado no Banco de Dados')
  })
})

app.route('/delete/:id')
.get((req, res) => {
  var id = req.params.id

  db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    console.log('Deletado do Banco de Dados!')
    res.redirect('/show')
  })
})

app.route('/home')
.get((req, res) => {
    res.render('./bots')
  })

app.route('/react')
.get((req, res) => {
    res.render('./react')
  })