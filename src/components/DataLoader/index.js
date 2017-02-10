import React, { Component } from 'react'
import { load } from './helpers'

import './styles.scss'

class DataLoader extends Component {

  render() {
    load()

    return (<div />)
  }
}

export default DataLoader
