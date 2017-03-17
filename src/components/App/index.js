import React, { Component } from 'react'
import FilterableScatterPlot from '../FilterableScatterPlot'
import DataLoader from '../DataLoader'
import Home from '../Home'

// temp
import Categories from '../Categories'

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
      dataList: {},
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
    let options = ['Artes', 'Negócios', 'Exploração']
    return (
      <div id="app">
        <Home />
        <section>
          <Categories
            title="Categorias" titlePosition="top" options={options}
            onChange={ index => console.log('selected', index) }
          />
          <Categories
            title="Organizar por" titlePosition="inline" options={options}
            onChange={ index => console.log('selected', index) }
          />
          <DataLoader fetchData={this.fetchData} />
          <FilterableScatterPlot dataList={this.state.dataList} />
        </section>
      </div>
    )
  }
}

export default App;
