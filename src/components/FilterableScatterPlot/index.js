import React, { Component } from 'react'
import ScatterPlot from '../ScatterPlot'
import Categories from '../Categories'
import SelectInput from '../SelectInput'

import './style.scss'

class FilterableScatterPlot extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeRow: -1,
      activeContinent: "-1"
    }
  }

  handleCategoryChange = newCategory => {
    this.setState({
      ...this.state,
      activeRow: this.props.options.categories[newCategory] || -1
    })
  }

  handleUserSelect = newContinent => {
    this.setState({
      ...this.state,
      activeContinent: newContinent
    })
  }

  filterContinent = data => {
    if(this.state.activeContinent === "-1") return data

    let finalData = {}

    Object.keys(data).forEach(dataKey => {
      let datum = data[dataKey]

      finalData[dataKey] = {...data[dataKey]}
      finalData[dataKey].array = datum.array.filter(woman => woman.Continent === this.state.activeContinent)

      Object.keys(datum.division).forEach(divisionKey => {
        let subdivision = datum.division[divisionKey] || []
        finalData[dataKey].division[divisionKey] = subdivision.filter(woman => woman.Continent === this.state.activeContinent)
      })
    })

    return {...data, ...finalData}
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

  closeBubble = () => {
    const radius = 5
    let bubble = document.getElementById('details-bubble')
    let balls = document.getElementsByClassName('d3-point')

    for(let i=0; i<balls.length; ++i)
    {
      balls[i].classList.remove('shrinking')
      balls[i].classList.remove('faded')
      balls[i].setAttribute('r', radius)
    }

    bubble.classList.remove('show')
  }

  render() {
    return (
      <div className="filterable">
        <div className="filters">
          <Categories
            title="Categorias" titlePosition="top" options={this.props.options.categories}
            onChange={ index => this.handleCategoryChange(index) }
            closeBubble={ () => this.closeBubble() }
          />
          <SelectInput options={this.props.options.continents}
            onChange={ index => this.handleUserSelect(index) }
          />
        </div>
        <ScatterPlot
          dataList={ this.selectCategory(this.filterContinent(this.props.dataList)) }
          all={ this.state.activeRow === -1 }
          closeBubble={ () => this.closeBubble() }
        />
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
