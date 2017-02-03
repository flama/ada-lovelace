import React, { Component } from 'react'
import 'whatwg-fetch'
import './App.scss'
import Timeline from '../Timeline'

const wikipedia = {
  english: 'https://en.wikipedia.org/w/api.php?action=parse&page=List_of_feminists&format=json&origin=*'
}

class App extends Component {

  render() {
    let request = new Request(wikipedia.english, {
      header: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Origin': 'http://adalovelace.flama.me'
      })
    })

    window.fetch(request)
    .then(response => console.log(response))
    return <Timeline />
  }
}

export default App;
