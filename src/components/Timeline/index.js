import React, { Component } from 'react'
import * as d3 from "d3"
import './Timeline.scss'

class Timeline extends Component {
  render() {
    let height = 1000
    let width = 1000
    let svg = d3.select("body")
      .append("svg")
      .attr("class", "timeline")
      .attr("width", width + 50)
      .attr("height", height + 50)
    let xScale = d3.scaleLinear().domain([1200, 2017]).range([0, width])
    let yScale = d3.scaleLinear().domain([0, 100]).range([0, height])

    let xAxis = d3.axisBottom(xScale)
    let yAxis = d3.axisLeft(yScale)

    svg.append("g")
      .attr("class","x axis")
      .attr("transform","translate(0," + height + ")")
      .call(xAxis)

    svg.append("g")
      .attr("class","y axis")
      .call(yAxis)

    return (<div/>)
  }
}

export default Timeline;