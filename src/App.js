import React from 'react';
import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const Info = (props) => {
  return (
    props.persons.map(person =>
      <table className='table'>
        <tr>
          <td><div key={person.id}> {person.name}</div></td>
          <td><div key={person.id}> {person.number}</div></td>
          <td><button className='removebtn' type='button' onClick={() => props.removeNameNumber(person.id)}>Remove</button></td>
        </tr>
      </table>
    )
  )
}

const Form = (props) => {
  return (
    <form className='form' onSubmit={props.addNameNumber}>
      <div className='name'>
        Name: <input
          value={props.newName}
          onChange={props.handleNameChange}
        />
      </div>
      <div className='number'>
        Number: <input
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
      </div>
      <div className='add'>
        <button className='addbtn' type="submit">add</button>
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
      .get('http://localhost:3001/api/persons')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
      })
  }

  addNameNumber = (event) => {
    event.preventDefault()
    if
      ((!this.state.persons.find((person) =>
        person.name === this.state.newName)) &&
      (!this.state.persons.find((person) =>
        person.number === this.state.newNumber))) {
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber,
        id: this.state.persons.length + 1
      }

      axios.post('http://localhost:3001/api/persons', personObject)
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

    axios.delete(`http://localhost:3001/api/persons/${id}`)
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
        <header>Phone directory</header>
        <h2 className='input'>Input</h2>
        <Form
          addNameNumber={this.addNameNumber}
          newName={this.state.newName}
          handleNameChange={this.handleNameChange}
          newNumber={this.state.newNumber}
          handleNumberChange={this.handleNumberChange}
        />
        <h2 className='entries'>Entries</h2>
        <table>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Remove</th>
          </tr>
        </table>
        <Info persons={this.state.persons} removeNameNumber={this.removeNameNumber} />
        <footer className='footer'>Copyright &copy; Md Shariful Islam, 2022</footer>
      </div>
    )
  }
}

export default App
