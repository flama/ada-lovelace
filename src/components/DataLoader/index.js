import React, { Component } from 'react'
import { apiKey } from '../../alicia-keys'

import './styles.scss'

class DataLoader extends Component {

  constructor(props) {
    super(props)

    this.request()
    .then(womenList => props.fetchData(womenList))
  }

  request = () => {
    const spreadsheetId = '18VumVINXYypPAPA5aqLhw-BoFHqb5CGCrDI3JeBIs6I'
    const regions = ['Africa', 'America do Sul', 'America Central', 'America do Norte', 'Asia', 'Europa', 'Oceania']

    let tableCols = []
    let values = []

    values = regions.reduce((acc, value) => acc += `ranges=${value}&`, "")

    return fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?${values}key=${apiKey}`)
      // extracts the data
      .then(response => response.json())
      .then(data => data.valueRanges)
      .then(ranges => ranges.map(range => range.values))
      // removes column names
      .then(tables => tables.map(table => {
        tableCols = table[0]
        return table.slice(1)
      }))
      // joins multiple sheets into one
      .then(multipleArrays => multipleArrays.reduce((acc, value) => acc.concat(value)))
      // removes empty women
      .then(women => women.filter(woman => woman[0] !== ""))
      // finally, formats into object, using column names as properties
      .then(women => women.map(woman => {
        let newWoman = {}
        tableCols.forEach((property, index) => {
          newWoman[property] = woman[index]
        })
        return newWoman
      }))
      .then(women => women.map(woman => {
        let tags = []
        let tagNames = ['1','2','3','4','5']

        tagNames.forEach(filter => {
          if(woman[`Filtro ${filter}`])
            tags.push(woman[`Filtro ${filter}`])
        })

        woman.tags = tags
        return woman
      }))
      .then(women => {
        console.log(women)
        return women
      })
  }

  render() {
    return (<div />)
  }
}

export default DataLoader
