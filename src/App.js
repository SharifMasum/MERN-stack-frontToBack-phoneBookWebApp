import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas',
          id: 1,
        }
      ],
      newName: '',
      prevent: true
    }
  }

  addName = (event) => {
    event.preventDefault()
    if (!this.state.persons.find((person) => 
    person.name === this.state.newName)) {
      const personObject = {
        name: this.state.newName,
        id: this.state.persons.length + 1
      }
    
      const persons = this.state.persons.concat(personObject)

      this.setState({
        persons,
        newName: ''
      })
    }
  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value})
  }

  render() {
    return (
      <div>
        <h2>Phone directory</h2>
        <form onSubmit={this.addName}>
          <div>
            name: <input 
            value={this.state.newName} 
            onChange={this.handleNameChange} 
          />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Names</h2>
        <div>
        {this.state.persons.map(person =>
        <div key={person.id}>{person.name}</div>)}
        </div>
      </div>
    )
  }
}

export default App
