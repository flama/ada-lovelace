import React, { Component } from 'react'
import { apiKey } from '../../alicia-keys'

class DataLoader extends Component {

  render() {
    this.request().then(womenList => this.props.fetchData(womenList))
    return (<div />)
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
    .then(this.transformBCToNegative)
    .then(this.removeWomenThatAreNotBorn)
    .then(this.organizeByTag)
    .catch(error => console.error(error))
  }

  joinSheets = sheets => sheets.reduce((acc, value) => acc.concat(value))
  removeEmptyWomen = women => women.filter(woman => woman[0] !== "")
  removeWomenThatAreNotBorn = women => women.filter(woman => !isNaN(woman.Born))

  sheetToObject = columnNames => {
    return women => {
      let newWoman = {}
      columnNames.forEach((column, index) => newWoman[column] = women[index])
      return newWoman
    }
  }

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

  transformBCToNegative = women => women.map(woman => {
    let [year, bc] = woman.Born.split(" ")
    year = parseInt(year)
    if(typeof born !== "undefined")
      year = -year

    woman.Born = year
    return woman
  })

  organizeByTag = women => women.reduce((aggrupped, woman) => {
    woman.tags.forEach(tag => {
      if(typeof aggrupped[tag] !== "undefined")
      aggrupped[tag].push(woman)
      else
      aggrupped[tag] = [ woman ]
    })
    return aggrupped
  }, {})

  createUrl = () => {
    const spreadsheetId = '18VumVINXYypPAPA5aqLhw-BoFHqb5CGCrDI3JeBIs6I'
    const regions = ['Africa', 'America do Sul', 'America Central', 'America do Norte', 'Asia', 'Europa', 'Oceania']
    const baseAPI = 'https://sheets.googleapis.com/v4/spreadsheets'

    let values = regions.reduce((acc, value) => acc += `ranges=${value}&`, "")

    return `${baseAPI}/${spreadsheetId}/values:batchGet?${values}key=${apiKey}`
  }
}

export default DataLoader
