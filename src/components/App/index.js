import React, { Component } from 'react'
import FilterableDataVis from '../FilterableDataVis'

import './App.scss'

const women = [
  {
    name: "Cora Coralina",
    tags: ["poetry", "literature"]
  },
  {
    name: "Leila Diniz",
    tags: ["theater", "feminism"]
  },
  {
    name: "Bertha Lutz",
    tags: ["science", "education", "literature", "feminism"]
  }
]

class App extends Component {

  render() {
    return (
      <section>
        <FilterableDataVis dataList={women} />
      </section>
    )
  }
}

export default App;
