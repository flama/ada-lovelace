import React from 'react'
import PropTypes from 'prop-types'

import ScatterRow from '../ScatterRow'

import './styles.scss'

const ExpansibleScatterRow = props => {

  let classNames = () => {
    return `expansible-scatter-row${!props.data.active && !props.all ? ' hidden':''}`
  }

  let topics, subtopics

  if(props.data.active) {
    subtopics = Object.keys(props.data.division).map(subcategory => {
      return (<ScatterRow
        data={ props.data.division[subcategory] || [] }
        domain={ props.domain }
        title={ subcategory }
        hidden={ true }
        key={ subcategory }
      />)
    })
  } else {
    topics = (<ScatterRow
      data={ props.data.array }
      domain={ props.domain }
      title={ props.title }
      hidden={ !props.all }
    />)
  }

  return (<div className={ classNames() }> { topics || subtopics } </div>)
}

ExpansibleScatterRow.propTypes = {
  data: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    division: PropTypes.object.isRequired,
    array: PropTypes.array.isRequired
  }).isRequired,
  domain: PropTypes.object.isRequired,
  title: PropTypes.string,
  all: PropTypes.bool
}

export default ExpansibleScatterRow
