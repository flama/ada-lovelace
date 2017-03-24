import React, { Component } from 'react'
import Cookies from 'js-cookie'

import { apiKey } from '../../alicia-keys'

class DataLoader extends Component {

  render() {
    return <div />
  }

  componentWillMount() {
    this.request().then(womenList => this.props.fetchData(womenList))
    return (<div />)
  }

  request = () => {
    return Cookies.getJSON('sheet-data') || fetch(this.createUrl())
      .then(response => response.json())
      .then(data => data.valueRanges)
      .then(ranges => ranges.map(range => range.values))
      .then(this.segregateColsFromSheets)
      .then(this.joinSheets)
      .then(this.removeEmptyWomen)
      .then(this.sheetToObject)
      .then(this.convertFiltersToTags)
      .then(this.transformBCToNegative)
      .then(this.removeWomenThatAreNotBorn)
      .then(this.organizeByTag)
      .catch(error => console.error(error))
  }

  segregateColsFromSheets = tables => {
    let cols = tables[0][0]
    let sheets = tables.map(table => table.slice(1))

    return { cols, sheets }
  }

  joinSheets = ({cols, sheets}) => {
    return { cols, women: sheets.reduce((acc, value) => acc.concat(value)) }
  }

  removeEmptyWomen = ({cols, women}) => {
    return { cols, women: women.filter(woman => woman[0] !== "") }
  }

  sheetToObject = ({ cols, women }) => {
    return women.map(woman => {
      let newWoman = {}
      cols.forEach((column, index) => newWoman[column] = woman[index])
      return newWoman
    })
  }

  convertFiltersToTags = women => {
    return women.map(woman => {
      let tags = []
      let tagNames = ['1','2','3','4','5']

      tagNames.forEach(filter => {
        if(woman[`Filtro ${filter}`])
        tags.push(woman[`Filtro ${filter}`])
      })

      woman.tags = tags
      return woman
    })
  }

  transformBCToNegative = women => women.map(woman => {
    let [year, bc] = woman.Born.split(" ")
    year = parseInt(year, 10)
    if(typeof bc !== "undefined")
    year = -year

    woman.Born = year
    return woman
  })

  removeWomenThatAreNotBorn = women => women.filter(woman => !isNaN(woman.Born))

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
    const regions = ['Africa', 'America Latina', 'America do Norte', 'Asia', 'Europa', 'Oceania']
    const baseAPI = 'https://sheets.googleapis.com/v4/spreadsheets'

    let values = regions.reduce((acc, value) => acc += `ranges=${value}&`, "")

    return `${baseAPI}/${spreadsheetId}/values:batchGet?${values}key=${apiKey}`
  }
}

export default DataLoader
