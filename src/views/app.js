import React, { Component } from 'react'

class App extends Component {
  state = {
    message: 'Hello!'
  }

  render () {
    const { message } = this.state

    return (
      <div>
        <h1>{ message }</h1>
      </div>
    )
  }
}

export default App
