import * as d3 from 'd3'

export default
class d3ChartHelper {

  constructor(el, props, state) {
    let svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', props.width)
      .attr('height', props.height)

    this.g = svg.append('g')
      .attr('class', 'd3-points')

    this.update(el, state)
  }

  update(el, state) {
    let scales = this._scales(el, state.domain)
    this._drawPoints(el, this._format(state.data, scales))
  }

  destroy(el){}

  _format = (data, scales) => data.map(value => {
    return {
      x: scales.x(value.Born),
      y: scales.y(Math.random())
    }
  })

  _drawPoints(el, data) {
    let simulation = d3.forceSimulation(data)
      .force("collide", d3.forceCollide(8))
      .stop()

    for(let i=0; i<120; ++i) simulation.tick()

    let cell = this.g.append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .append("circle")
      .attr("r", 7)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)

    simulation.on("tick", () => {
      cell
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
    })
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
      .domain([-.75, 1.75])

    return { x, y }
  }
}
