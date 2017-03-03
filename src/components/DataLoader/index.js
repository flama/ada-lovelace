import React, { Component } from 'react'
import { apiKey } from '../../alicia-keys'

import './styles.scss'

class DataLoader extends Component {

  joinSheets = sheets => {
    return sheets.reduce((acc, value) => acc.concat(value))
  }

  sheetToObject = columnNames => {
    return women => {
      let newWoman = {}
      columnNames.forEach((column, index) => newWoman[column] = women[index])
      return newWoman
    }
  }

  removeEmptyWomen = women => women.filter(woman => woman[0] !== "")

  convertFiltersToTags = women => women.map(woman => {
    let tags = []
    let tagNames = ['1','2','3','4','5']

    tagNames.forEach(filter => {
      if(woman[`Filtro ${filter}`])
        tags.push(woman[`Filtro ${filter}`])
    })

    woman.tags = tags
    return woman
  })

  createUrl = () => {
    const spreadsheetId = '18VumVINXYypPAPA5aqLhw-BoFHqb5CGCrDI3JeBIs6I'
    const regions = ['Africa', 'America do Sul', 'America Central', 'America do Norte', 'Asia', 'Europa', 'Oceania']
    const baseAPI = 'https://sheets.googleapis.com/v4/spreadsheets'

    let values = regions.reduce((acc, value) => acc += `ranges=${value}&`, "")

    return `${baseAPI}/${spreadsheetId}/values:batchGet?${values}key=${apiKey}`
  }

  request = () => {
    let tableCols = []

    return fetch(this.createUrl())
      .then(response => response.json())
      .then(data => data.valueRanges)
      .then(ranges => ranges.map(range => range.values))
      .then(tables => tables.map(table => {
        tableCols = table[0]
        return table.slice(1)
      }))
      .then(this.joinSheets)
      .then(this.removeEmptyWomen)
      .then(this.sheetToObject(tableCols))
      .then(this.convertFiltersToTags)
  }

  render() {
    this.request().then(womenList => props.fetchData(womenList))
    return (<div />)
  }
}

export default DataLoader
