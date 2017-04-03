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
        <div className="content">
          <p>We’ve come to a time when the pursuit of gender equality might seem close to an end. There are few spots left that women deliberately can't reach, and plenty of people working to change that. </p>
          <p>Gender bias, though, is a much more complex and subtle evil. It happens even though we don't want to, and it takes a long way until we take it to pieces. Cultural bias is what's preventing women from getting to the same places as men, even though it looks like all the opportunities are there.</p>
          <p>Many of the women rights taken for granted today were conquered no longer than 100 years ago. To achieve a true state of gender equality takes conscious effort, and that's what we're going for with this initiative. We know women have hugely contributed to the world we live in. But we also know that the lack of female representatives in various fields nourishes the idea that they haven't. History has a lot of examples that have been hidden or not properly appraised. We're here to help change that.</p>
          <p>We believe in role models and how they can promote change and social equality. And we believe that bringing these fantastic women to light will motivate others to do so — and also show there are no limits to what a girl can do.</p>
          <p>This is Wikimina. This is the place to see that women are increasingly making the changes we want to see in the world, but also to not forget they have always been there.</p>
          </div>
      </section>
    )
  }
}

export default AboutPage;
