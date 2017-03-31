import React, { Component } from 'react'
import ScatterRow from '../ScatterRow'

import './styles.scss'

class ExpansibleScatterRow extends Component {
  render() {
    let topics, subtopics

    if(this.props.data.active) {
      subtopics = Object.keys(this.props.data.division).map(subcategory => {
        return (<ScatterRow
          data={ this.props.data.division[subcategory] || [] }
          domain={ this.props.domain }
          title={ subcategory }
          hidden={ false }
          key={ subcategory }
          />)
        })
    } else {
      topics = (<ScatterRow
        data={ this.props.data.array }
        domain={ this.props.domain }
        title={ this.props.title }
        hidden={ !this.props.data.active && !this.props.all }
      />)
    }


    return (
      <div className="expansible-scatter-row">
        { topics || subtopics }
      </div>
    )
  }
}

export default ExpansibleScatterRow
