import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas',
          number: '040-12345678',
          id: 1,
        }
      ],
      newName: '',
      newNumber: ''
    }
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
    
      const persons = this.state.persons.concat(personObject)

      this.setState({
        persons,
        newName: '',
        newNumber: ''
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

  render() {
    return (
      <div>
        <h2>Phone directory</h2>
        <form onSubmit={this.addNameNumber}>
          <div>
            name: <input 
            value={this.state.newName} 
            onChange={this.handleNameChange} 
          />
          </div>
          <div>
            number: <input 
            value={this.state.newNumber} 
            onChange={this.handleNumberChange} 
          />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Names</h2>
        <div>
        {this.state.persons.map(person =>
        <div key={person.id}>{person.name} {person.number}</div>)}
        </div>
      </div>
    )
  }
}

export default App
