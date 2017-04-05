import React, { Component } from 'react'
import ScatterPlot from '../ScatterPlot'
import Categories from '../Categories'
import SelectInput from '../SelectInput'

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

  selectCategory = data => {
    if(this.state.activeRow === -1) return data

    let finalData = {}


    Object.keys(data).forEach(dataKey => {
      finalData[dataKey] = { ...data[dataKey] }

      if(dataKey === this.state.activeRow)
        finalData[dataKey].active = true
    })

    return {...data, ...finalData}
  }

  render() {
    return (
      <div className="filterable">
        <div className="filters">
          <Categories
            title="Categorias" titlePosition="top" options={this.props.options.categories}
            onChange={ index => this.handleUserInput(index) }
          />
          <SelectInput options={this.props.options.continents}/>
        </div>
        <ScatterPlot dataList={ this.selectCategory(this.props.dataList) } all={ this.state.activeRow === -1 } />
      </div>
    )
  }
}

FilterableScatterPlot.defaultProps = {
  dataList: {}
}

FilterableScatterPlot.propTypes = {
  dataList: React.PropTypes.object,
  options: React.PropTypes.object
}

export default FilterableScatterPlot;
