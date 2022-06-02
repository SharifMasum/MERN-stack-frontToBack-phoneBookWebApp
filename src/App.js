import React from 'react';
import axios from 'axios'

const Info = (props) => {
  return (
      props.persons.map(person =>
      <div key={person.id}> {person.name} {person.number} 
      <button type='button' onClick={() => props.removeNameNumber(person.id)}>Remove</button>
      </div>
    )
    
  )
}

const Form = (props) => {
  return (
    <form onSubmit={props.addNameNumber}>
          <div>
            name: <input 
            value={props.newName} 
            onChange={props.handleNameChange} 
          />
          </div>
          <div>
            number: <input 
            value={props.newNumber} 
            onChange={props.handleNumberChange} 
          />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: ''
    }
    console.log('constructor')
  }

  componentDidMount() {
    console.log('did mount')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
    })
  }

  addNameNumber = (event) => {
    event.preventDefault()
    if 
    ((!this.state.persons.find((person) => 
    person.name === this.state.newName))&&
    (!this.state.persons.find((person) => 
    person.number === this.state.newNumber))){
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber,
        id: this.state.persons.length + 1
      }

      axios.post('http://localhost:3001/persons', personObject)
      .then(response => {
        this.setState({
          persons: this.state.persons.concat(response.data),
          newPerson: ''
        })
      })
    }
  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }

  removeNameNumber = (id) => {
    
    axios.delete(`http://localhost:3001/persons/${id}`)
      .then(response => {
        this.setState({
          persons: this.state.persons.filter(person => person.id !== id)
        })
      })
  }

  render() {
    console.log('render')
    return (
      <div>
        <h2>Phone directory</h2>
        <Form
          addNameNumber={this.addNameNumber}
          newName={this.state.newName} 
          handleNameChange={this.handleNameChange} 
          newNumber={this.state.newNumber} 
          handleNumberChange={this.handleNumberChange} 
        />
        <h2>Names</h2>
        <Info persons={this.state.persons} removeNameNumber={this.removeNameNumber} />
      </div>
    )
  }
}

export default App
