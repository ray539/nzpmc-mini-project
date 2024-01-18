const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const Person = require('./models/person')

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}));

app.post('/people', (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.DOB) {
    return res.status(400).json({error: 'data missing'})
  }

  const newPerson = new Person({
    name: body.name,
    DOB: body.DOB
  })

  newPerson.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(e => next(e))
})

app.get('/people', (req, res, next) => {
  let name = req.query.name;
  let query = {};
  if (name) {
    query.name = name;
  }
  console.log(query)
  Person.find(query)
    .then(r => res.json(r))
    .catch(e => next(e))
})

app.use((req, res, next) => {
  res.status(404).json({error: 'unknown endpoint'})
})

app.use((error, req, res, next) => {
  console.error(error.message);
  next(error);
})

const PORT = process.env.PORT || 3004
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})