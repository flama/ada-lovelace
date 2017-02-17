import React, { Component } from 'react'

import './styles.scss'

class DataVis extends Component {
  render() {
    let rows = []

    this.props.dataList.forEach(item => {
      rows.push(<li key={item.Name}>{item.Name}</li>)
    })

    return (
      <ul>
        {rows}
      </ul>
    )
  }
}

export default DataVis
