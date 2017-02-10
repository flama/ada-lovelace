import React, { Component } from 'react'

import './styles.scss'

class DataVis extends Component {
  render() {
    let rows = []

    let items = this.props.dataList.filter(item => filterTags.filter(tag => {
      let itemHasTag = ~item.tags.indexOf(tag)
      return itemHasTag
    }).length)

    items.each(item => {
    })

    return (
      <ul>
        {rows}
      </ul>
    )
  }
}

export default DataVis
