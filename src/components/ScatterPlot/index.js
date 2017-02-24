import React, { Component } from 'react'
import ScatterRow from '../ScatterRow'

import './styles.scss'

const Data = {
  Arts : [
    {
      Name: 'Ana',
      Born: '1992',
      tags: ['theater', 'literature'],
      target: () => console.log('Ana')
    },
    {
      Name: 'Marcela',
      Born: '1989',
      tags: ['theater', 'caricature'],
      target: () => console.log('Marcela')
    },{
      Name: 'Gabriela',
      Born: '1950',
      tags: ['music', 'dance'],
      target: () => console.log('Gabriela')
    },{
      Name: 'Julia',
      Born: '1888',
      tags: ['dance', 'literature'],
      target: () => console.log('Julia')
    }
  ]
}

const domain = {
  x: [1800, 2000],
  y: [0, 1]
}

class ScatterPlot extends Component {

  render() {

    //TODO: change to actual data
    let topics = Object.keys(Data).map(category => {
      return (<ScatterRow
        data={ Data[category] }
        domain={ domain }
        title={ category }
        key={ category }
      />)
    })

    return (
      <div className="scatter-plot">
        { topics }
      </div>
    )
  }
}

export default ScatterPlot
