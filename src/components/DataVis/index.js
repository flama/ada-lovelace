import React, { Component } from 'react'

import './styles.scss'

class DataVis extends Component {
  render() {
    let rows = []

    let items = this.props.dataList.filter(item => this.props.filterTags.filter(tag => {
      let itemHasTag = ~item.tags.indexOf(tag)
      return itemHasTag
    }).length)

    items.forEach(item => {
      rows.push(<li key={item.name}>{item.name}</li>)
    })

    return (
      <ul>
        {rows}
      </ul>
    )
  }
}

export default DataVis
