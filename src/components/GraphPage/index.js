import React, { Component } from 'react'
import FilterableScatterPlot from '../FilterableScatterPlot'
import DataLoader from '../DataLoader'

import './style.scss'

class GraphPage extends Component {
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

  render() {
    return (
      <section id="graph-page">
        <h3>wonderful women</h3>
        <div className="content">
          <p>{ `There's a woman behind every single change in our history — whether you know her
          or not. We have picked a few (for know) to try and show it, by sorting them into their
          influence areas and through time.` }</p>
        </div>
        <DataLoader fetchData={this.fetchData} />
        <FilterableScatterPlot dataList={this.state.dataList} options={this.state.options} />
      </section>
    )
  }
}

export default GraphPage;
