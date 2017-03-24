import React, { Component } from 'react'
import FilterableScatterPlot from '../FilterableScatterPlot'
import DataLoader from '../DataLoader'
import Home from '../Home'

import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataList: {},
      options: []
    }
  }

  fetchData = ({ dataList, options }) => {
    this.setState({ dataList, options })
  }

  render()
  {
    return (
      <div id="app">
        <Home />
        <section>
          <DataLoader fetchData={this.fetchData} />
          <FilterableScatterPlot dataList={this.state.dataList} options={this.state.options} />
        </section>
      </div>
    )
  }
}

export default App;
