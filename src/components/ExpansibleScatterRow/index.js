import React, { Component } from 'react'
import ScatterRow from '../ScatterRow'

import './styles.scss'

class ExpansibleScatterRow extends Component {
  classNames = () => {
    return `expansible-scatter-row ${!this.props.data.active && !this.props.all ? 'hidden':''}`
  }

  render() {
    let topics, subtopics

    if(this.props.data.active) {
      subtopics = Object.keys(this.props.data.division).map(subcategory => {
        return (<ScatterRow
          data={ this.props.data.division[subcategory] || [] }
          domain={ this.props.domain }
          title={ subcategory }
          hidden={ true }
          key={ subcategory }
          />)
        })
    } else {
      topics = (<ScatterRow
        data={ this.props.data.array }
        domain={ this.props.domain }
        title={ this.props.title }
        hidden={ !this.props.all }
      />)
    }


    return (
      <div className={ this.classNames() }>
        { topics || subtopics }
      </div>
    )
  }
}

ExpansibleScatterRow.propTypes = {
  data: React.PropTypes.object,
  domain: React.PropTypes.object,
  title: React.PropTypes.string,
  hidden: React.PropTypes.bool,
  all: React.PropTypes.bool
}

export default ExpansibleScatterRow
