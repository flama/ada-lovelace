import React, { Component } from 'react'
import himalaya from 'himalaya'

import 'whatwg-fetch'
import './App.scss'

const wikipedia = {
  english: 'https://en.wikipedia.org/w/api.php?action=parse&page=List_of_feminists&format=json&origin=*'
}

class App extends Component {

  render() {
    let request = new Request(wikipedia.english, {
      header: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    })

    window.fetch(request)
      .then(response => response.json())
      .then(json => json.parse.text['*'])
      .then(html => himalaya.parse(html))
      .then(tables => tables.filter(table =>
        table.tagName === "table" &&
        typeof table.attributes !== "undefined" &&
        table.attributes.border === 1
      ))
      .then(wikitables => console.log(wikitables))
      .catch(error => console.error(error))

    return (<div/>)
  }
}

export default App;
