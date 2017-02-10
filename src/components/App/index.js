import React, { Component } from 'react'
import FilterableDataVis from '../FilterableDataVis'
import DataLoader from '../DataLoader'

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
  constructor(props) {
    super(props)

    this.state = {
      dataList: []
    }

    this.fetchData = this.fetchData.bind(this)
  }

  fetchData(dataList) {
    this.setState({ dataList })
  }

  render()
  {
    return (
      <section>
        <DataLoader fetchData={this.fetchData} />
        <FilterableDataVis dataList={women} />
      </section>
    )
  }
}

export default App;
