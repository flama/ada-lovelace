import React, { Component } from 'react'
import FilterableDataVis from '../FilterableDataVis'
import DataLoader from '../DataLoader'

import './App.scss'

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
        <FilterableDataVis dataList={this.state.dataList} />
      </section>
    )
  }
}

export default App;
