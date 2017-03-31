import React, { Component } from 'react'
import ScatterRow from '../ScatterRow'

import './styles.scss'

class ExpansibleScatterRow extends Component {
  render() {
    console.log('extensible', this.props.data)

    let topics = (<ScatterRow
      data={ this.props.data.array }
      domain={ this.props.domain }
      title={ this.props.title }
      active={ this.props.data.active }
    />)

    // let subtopics = Object.keys(this.props.data.division).map(subcategory => {
    //   return (<ScatterRow
    //     data={ this.props.data[subcategory].array }
    //     doman={ this.props.domain }
    //     title={ subcategory }
    //     active={ this.props.data[subcategory].array }
    //     />)
    //   })

    return (
      <div className="expansible-scatter-row">
        { topics }
      </div>
    )
  }
}

export default ExpansibleScatterRow
