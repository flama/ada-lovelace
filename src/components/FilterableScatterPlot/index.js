import React, { Component } from 'react'
import ScatterPlot from '../ScatterPlot'
import Categories from '../Categories'

import './style.scss'

class FilterableScatterPlot extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeRow: -1
    }
  }

  handleUserInput = optionIndex => {
    this.setState({
      activeRow: this.props.options[optionIndex] || -1
    })
  }

  render() {
    return (
      <div className="filterable">
        <Categories
          title="Categorias" titlePosition="top" options={this.props.options}
          onChange={ index => this.handleUserInput(index) }
        />
        <ScatterPlot dataList={ this.props.dataList } all={ this.state.activeRow === -1 } />
      </div>
    )
  }
}

FilterableScatterPlot.defaultProps = {
  dataList: {}
}

FilterableScatterPlot.propTypes = {
  dataList: React.PropTypes.object
}

export default FilterableScatterPlot;
