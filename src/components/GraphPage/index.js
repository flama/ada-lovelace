import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FilterableScatterPlot from '../FilterableScatterPlot'
import DataLoader from '../DataLoader'

import './style.scss'

class GraphPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataList: {},
      options: {
        categories: []
      }
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
          <p>{ `There's a woman behind every single change in our history — whether you know her
          or not. We have picked a few (for now) to try and show it, by sorting them into their
          influence areas and through time.` }</p>
        </div>
        <div className="graph-head">
          <h4 className={ this.styleTitle(this.props.titlePosition) }>
            Who are the wonderful women who helped shape the world?
          </h4>
          <div className="legend">
            <span>Women</span>
          </div>
        </div>
        <DataLoader fetchData={this.fetchData} />
        <FilterableScatterPlot dataList={this.state.dataList} options={this.state.options} />
        <p className="information">
          { `Information: We collected the information presented from public sources
            and do not take responsibility for the content in the external links.` }
        </p>
      </section>
    )
  }
}

GraphPage.propTypes = {
  titlePosition: PropTypes.oneOf(['top', 'inline'])
}

export default GraphPage;
