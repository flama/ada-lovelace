import * as d3 from 'd3'

const radius = 10

export default
class d3ChartHelper {

  constructor(el, props, state) {
    let svg = d3.select(el).append('svg')
      .attr('class', 'd3 scatter-row-svg')
      .attr('width', props.width)
      .attr('height', props.height)

    this.g = svg.append('g')
      .attr('class', 'd3-points')

    this.update(el, state)
  }

  update(el, state) {
    let scales = this._scales(el, state.domain)
    debugger
    this._drawPoints(el, this._format(state.data, scales))
  }

  destroy(el){}

  _format = (data, scales) => data.map(value => {
    return {
      x: scales.x(value.Born),
      y: scales.y(Math.random())
    }
  })

  _drawPoints = (el, data) => {
    debugger
    let simulation = d3.forceSimulation(data)
      .force("collide", d3.forceCollide(radius + 1))
      .stop()

    for(let i=0; i<120; ++i) simulation.tick()

    let cell = this.g.append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "d3-point")
      .attr("r", radius)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("onmouseover", `evt.target.setAttribute('r', '${radius*1.1}')`)
      .attr("onmouseout", `evt.target.setAttribute('r', '${radius}')`)

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
