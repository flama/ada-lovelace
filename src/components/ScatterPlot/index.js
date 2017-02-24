import React, { Component } from 'react'
import ScatterRow from '../ScatterRow'

import './styles.scss'

// const Data = {
//   Arts : {
//     Literature: [{
//       Name: 'Ana',
//       Born: '1992'
//     },{
//       Name: 'Marcela',
//       Born: '1989'
//     }],
//     Theater: [{
//       Name: 'Gabriela',
//       Born: '1950'
//     }, {
//       Name: 'Julia',
//       Born: '1888'
//     }]
//   }
// }

const Data = [
  {
    id: 'Arts',
    x: 1992,
    y: 'Ana',
    z: 5
  },
  {
    id: 'Technology',
    x: 1950,
    y: 'Julia',
    z: 5
  },
  {
    id: 'Science',
    x: 1900,
    y: 'Marcela',
    z: 5
  }
]

const domain = {
  x: [1800, 2000],
  y: ['A', 'Z']
}

class ScatterPlot extends Component {

  render() {

    //TODO: change to actual data
    let topics = Data.map(category => {
      return (<ScatterRow
        data={ category }
        domain={ domain }
        key={ category.id }
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
