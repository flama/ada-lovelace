import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ScatterPlot from '../ScatterPlot'
import Categories from '../Categories'
import SelectInput from '../SelectInput'

import './style.scss'

const ALL = "-1"
const radius = 5

class FilterableScatterPlot extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeRow: ALL,
      activeContinent: ALL
    }
  }

  handleCategoryChange = newCategory => {
    this.setState({
      ...this.state,
      activeRow: this.props.options.categories[newCategory] || ALL
    })
  }

  handleUserSelect = newContinent => {
    this.setState({
      ...this.state,
      activeContinent: newContinent
    })
  }

  filterContinent = data => {
    if(this.state.activeContinent === ALL) return data

    let finalData = {}

    Object.keys(data).forEach(dataKey => {
      let datum = data[dataKey]

      finalData[dataKey] = {
        active: datum.active,
        array: datum.array.filter(woman => woman.Continent === this.state.activeContinent),
        division: {...datum.division}
      }

      Object.keys(datum.division).forEach(divisionKey => {
        let subdivision = datum.division[divisionKey] || []

        finalData[dataKey].division[divisionKey] = subdivision.filter(woman => woman.Continent === this.state.activeContinent)
      })
    })

    return {...data, ...finalData}
  }

  selectCategory = data => {
    if(this.state.activeRow === ALL) return data

    let finalData = {}

    Object.keys(data).forEach(dataKey => {
      finalData[dataKey] = { ...data[dataKey] }

      if(dataKey === this.state.activeRow)
        finalData[dataKey].active = true
    })

    return {...data, ...finalData}
  }

  closeBubble = ev => {
    let contain = (el, list) => {
      if(!el) return true
      for(let i=0; i<list.length; ++i) {
        if(el === list.item(i)) return true
      }
      return false
    }

    ev = ev || {}
    let bubble = document.getElementById('details-bubble')
    let balls = document.getElementsByClassName('d3-point')

    // checks if ball is being clicked
    if(!contain(ev.target, balls))
    {
      for(let i=0; i<balls.length; ++i)
      {
        balls[i].classList.remove('shrinking')
        balls[i].classList.remove('faded')
        balls[i].setAttribute('r', radius)
      }
    }

    bubble && bubble.classList.remove('show')
  }

  render() {
    return (
      <div className="filterable">
        <div className="filters">
          <Categories
            title="Categorias" titlePosition="top" options={this.props.options.categories}
            onChange={ index => this.handleCategoryChange(index) }
            closeBubble={ this.closeBubble }
          />
          <SelectInput options={this.props.options.continents}
            onChange={ index => this.handleUserSelect(index) }
            closeBubble={ this.closeBubble }
          />
        </div>
        <ScatterPlot
          dataList={ this.selectCategory(this.filterContinent(this.props.dataList)) }
          all={ this.state.activeRow === ALL }
          closeBubble={ this.closeBubble }
        />
      </div>
    )
  }
}

FilterableScatterPlot.defaultProps = {
  dataList: {},
  options: {
    categories: []
  }
}

FilterableScatterPlot.propTypes = {
  dataList: PropTypes.object,
  options: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
}

export default FilterableScatterPlot
