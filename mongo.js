const mongoose = require('mongoose')

const Person = require('./models/config')

require('dotenv').config()

console.log(process.env)

const savePersons = (name, number) => {
  const person = new Person({
    name: name,
    number: number
  })

  person
    .save()
    .then(result => {
      console.log(`${person.name}`)
      console.log(`${person.number}`)
      console.log('person saved!')
      mongoose.connection.close()
    })
}

const listPersons = () => {
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
}

mongoose.connect(process.env.MONGO_URL).then(res => console.log("It works!")).catch(e => console.log("It doesnt work!", e))

if (process.argv.length == 2) {
  listPersons()
} else if (process.argv.length == 4) {
  savePersons(process.argv[2], process.argv[3])
} else {
  console.log("Invalid input")
}