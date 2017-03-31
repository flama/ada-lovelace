import React, { Component } from 'react'

import './style.scss'

class AboutPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataList: {},
      options: []
    }
  }

  render() {
    return (
      <section id="about-page">
        <h2>they have always been there</h2>
      </section>
    )
  }
}

export default AboutPage;
