import * as d3 from 'd3'

export default
class d3TimelineHelper {

  constructor(el, props, state) {
    let svg = d3.select(el).append('svg')
      .attr('width', '100%')
      .attr('height', '60px')
      .attr('background', '#000')

    let x = this._scaleX(el, state.domain)

    this._draw(svg, state.domain, x);
  }

  _scaleX(el, domain) {

    if(!domain) return null

    let width = el.offsetWidth

    let x = d3.scaleTime()
      .range([0, width])
      .domain([new Date(domain.x[0], 1, 1), new Date(domain.x[1], 1, 1)])

    return x
  }

  _draw(svg, domain, x) {

    let g = svg.append("g")
      .call(d3.axisBottom(x).tickSizeOuter(0).ticks(25));
  }
}
