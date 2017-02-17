import React, { Component } from 'react'
import FilterableDataVis from '../FilterableDataVis'
import DataLoader from '../DataLoader'

import D3Chart from '../D3Chart'

import './App.scss'

let sampleData = [
  {id: '5fbmzmtc', x: 7, y: 41, z: 6},
  {id: 's4f8phwm', x: 11, y: 45, z: 9},
  {id: 'abacate', x:13, y: 10, z: 23 }
]

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataList: [],
      data: sampleData,
      domain: { x: [0, 30], y: [0, 100] }
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
        <FilterableDataVis dataList={this.state.dataList} />
        <D3Chart data={this.state.data} domain={this.state.domain} />
      </section>
    )
  }
}

export default App;
