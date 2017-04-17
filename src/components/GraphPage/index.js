import React, { Component } from 'react'
import FilterableScatterPlot from '../FilterableScatterPlot'
import DataLoader from '../DataLoader'

import './style.scss'

class GraphPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataList: {},
      options: {}
    }
  }

  fetchData = ({ dataList, options }) => {
    this.setState({ dataList, options })
  }

  styleTitle = position => {
    return `title -${position}`
  }

  render() {
    return (
      <section id="graph-page">
        <h3>wonderful women</h3>
        <div className="content">
          <p>{ `There's a woman behind every single change in our history — whether we know her or not.
          We have picked a few to try and show it, by sorting them by their influence fields and through
          time. Take a look and get surprised by how much girl power history can reveal!` }</p>
        </div>
        <div className="wrapper">
          <div className="graph-content">
          <div className="graph-head">
              <h3 className={ this.styleTitle(this.props.titlePosition) }>
                Who are the wonderful women who helped shape the world?
              </h3>
              <div className="legend">
                <span>Women</span>
              </div>
            </div>
            <DataLoader fetchData={this.fetchData} />
            <FilterableScatterPlot dataList={this.state.dataList} options={this.state.options} />
            <p className="information">{ `Information: We collected the information presented from public
            sources like <a href="https://www.wikipedia.org/" target="_blank">Wikipedia</a> and do not take
            responsability for the content in the external links.` }</p>
          </div>
        </div>
      </section>
    )
  }
}

export default GraphPage;
