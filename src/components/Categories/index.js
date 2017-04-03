import React, { Component } from 'react'

import './styles.scss'

const ALL = -1

class Categories extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selected: ALL
    }
  }

  styleTitle = position => {
    return `title -${position}`
  }

  styleButton = index => {
    return `button ${index === this.state.selected? 'selected':''}`
  }

  choose = selected => {
    this.setState({ selected })
    this.props.onChange(selected)
  }

  render() {
    let options = this.props.options.map((option, index) => {
      return (
        <button className={ this.styleButton(index) }
          key={ option }
          onClick={ () => this.choose(index)}
        >
          { option }
        </button>
      )
    })

    return (
      <div className="categories">
        <div className="content">
          <h4 className={ this.styleTitle(this.props.titlePosition) }>
            Who are the wonderful women who helped shape the world?
          </h4>
          <div className="legend">
            <span>Women</span>
          </div>
        </div>
        <div className="main">
          <button className={ this.styleButton(ALL) }
            onClick={ () => this.choose(ALL) }
          >
            { this.props.all }
          </button>
          { options }
        </div>
      </div>
    )
  }
}

Categories.defaultProps = {
  onChange: _=>_,
  options: [],
  all: "All",
  titlePosition: "inline"
}

Categories.propTypes = {
  onChange: React.PropTypes.func,
  title: React.PropTypes.string.isRequired,
  options: React.PropTypes.arrayOf(React.PropTypes.string),
  all: React.PropTypes.string,
  titlePosition: React.PropTypes.oneOf(['top', 'inline']),
}

export default Categories
