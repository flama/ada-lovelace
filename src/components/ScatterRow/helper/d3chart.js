import * as d3 from 'd3'
import Ball from './ball-manipulator'

const radius = 5

export default
class d3ChartHelper {

  constructor(el, props, state, deps) {
    this.balls = deps || Ball

    let svg = d3.select(el).append('svg')
      .attr('class', 'd3 scatter-row-svg')
      .attr('width', props.width)
      .attr('height', props.height)

    this.g = svg.append('g')
      .attr('class', 'd3-points')

    this.t = state.test?0:1
    this.id = state.id

    this.update(el, state)
  }

  update(el, state) {
    let scales = this._scales(el, state.domain)
    this._drawPoints(el, this._format(state.data, scales))
  }

  destroy() {}

  _format = (data, scales) => data.map(value => {
    return {
      x: scales.x(value.Born),
      y: scales.y(value.Informations.length % 10),
      extended: value
    }
  })

  _drawPoints = (el, data) => {
    let balls = this.balls

    let simulation = d3.forceSimulation(data)
      .force("collide", d3.forceCollide(radius + 1))
      .stop()

    for(let i=0; i<120; ++i) simulation.tick()

    let cells = this.g.selectAll("circle")
      .data(simulation.nodes())
    let id = this.id

    let strokes = cells.enter().append("circle")
    strokes.exit().remove()

    strokes
      .attr("r", radius*2/3)
      .attr("class", "d3-point-stroke")
      .attr("id", d => `stroke-${id}/${d.index}`)
      .attr("fill", "transparent")
    .merge(cells)
      .attr("r", radius*2/3)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)

    let points = cells.enter().append("circle")
    points.exit().transition()
      .duration(250*this.t)
      .delay((d,i) => i*5*this.t)
      .attr("r", 0)
      .remove()

    points
      .on("mouseenter", function(){ balls.grow(this) })
      .on("mouseleave", () => balls.shrink())
      .on("click", function(d) { balls.open(this, d.extended) })
      .attr("class", "d3-point")
      .attr("id", d => `ball-${id}/${d.index}`)
      .attr("r", 0)
    .merge(cells)
      .attr("r", 0)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .transition()
        .duration(250*this.t)
        .delay((d,i) => i*5*this.t)
        .attr("r", radius)
  }

  _scales(el, domain) {
    if(!domain) return null

    let width = el.offsetWidth
    let height = el.offsetHeight

    let x = d3.scaleLinear()
      .range([0, width])
      .domain(domain.x)

    let y = d3.scaleLinear()
      .range([height, 0])
      .domain([-15, 25])

    return { x, y }
  }
}
