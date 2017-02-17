import React, { Component } from 'react'
import { apiKey } from '../../alicia-keys'

import './styles.scss'

class DataLoader extends Component {

  request = () => {
    const spreadsheetId = '18VumVINXYypPAPA5aqLhw-BoFHqb5CGCrDI3JeBIs6I'
    return fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${apiKey}`)
      .then(response => response.json())
      .then(spread => spread.sheets)
  }

  render() {
    this.request()
    .then(data => console.log(data))

    return (<div />)
  }
}

export default DataLoader
