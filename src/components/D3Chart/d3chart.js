import d3 from "d3"

export default
class d3Chart {

  constructor(el, props, state) {
    super(el, props, state)

    let svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', props.width)
      .attr('height', props.height)

    svg.append('g')
      .attr('class', 'd3-points')

    this.update = this.update.bind(this)
    this.update(el, state)
  }

  update(el, state) {
    let scales = this._scales(el, state.domain)
    this._drawPoints(el, scales, state.data)
  }

  destroy(el){}

  _drawPoints(el, scales, data) {
    let g = d3.select(el).selectAll('.d3-points')
    let point = g.selectAll('.d3-points')
      .data(data, d => d.id)

    point.enter().append('circle')
      .attr('class', 'd3-point')

    point.attr('cx', d => scales.x(d.x))
      .attr('cy', d => scales.y(d.y))
      .attr('r', d => scales.z(d.z))

    point.exit()
      .remove()
  }
}
