const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { request } = require('express')
const cors = require('cors')
//const Person = require('./models/person')

app.use(cors())

const logger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(logger)
app.use(bodyParser.json())
//app.use(express.static('build'))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Martti Rienari",
        number: "040-123456",
        id: 2
    },
    {
        name: "Arto Jarvinen",
        number: "040-123456",
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
    }
]

/*const formatPerson = (person) => {
  const formattedPerson = { ...person._doc, id: person._id }
  delete formattedPerson._id
  delete formattedPerson.__v

  return formattedPerson
}*/

app.get('/api/persons', (request, response) => {
    response.json(persons)
    /*Person
      .find({})
      .then(persons => {
        response.json(persons.map(formatPerson))
      })*/
})

app.get('/api/persons/:id', (request, response) => {
    /*Person
      .findById(request.params.id)
      .then(person => {
        if (person) {
          response.json(formatPerson(person))
        } else {
          response.status(404).end()
        }
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformed id' })
      })*/

    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    min = Math.ceil(5)
    max = Math.floor(10000)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    /*const person = new Person({
      name: body.name,
      number: body.number,
      id: generateId()
    })*/

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if (persons.find(p =>
        p.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    if (persons.find(p =>
        p.number === body.number)) {
        return response.status(400).json({
            error: 'number must be unique'
        })
    }

    /*person
      .save()
      .then(savedPerson => {
        response.json(formatPerson(savedPerson))
      })*/

    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()

    /*Person
      .findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => {
        response.status(400).send({ error: 'malformed id' })
      })*/
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//const PORT = 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})