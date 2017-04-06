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
    this._drawPoints(el, this._format(state.data, scales))
  }

  destroy() {}

  _format = (data, scales) => data.map(value => {
    return {
      x: scales.x(value.Born),
      y: scales.y(Math.random()),
      extended: value
    }
  })

  _drawPoints = (el, data) => {
    let simulation = d3.forceSimulation(data)
      .force("collide", d3.forceCollide(radius + 1))
      .stop()

    for(let i=0; i<120; ++i) simulation.tick()

    let cell = this.g.selectAll("circle")
      .data(data)

    cell.exit().transition()
      .attr("r", 0)
      .remove()

    cell.enter().append("circle")
      .attr("class", "d3-point")
      .attr("r", 0)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .on("mouseenter", function(){ ballGrow(this) })
      .on("mouseleave", function(){ ballShrink(this) })
      .on("click", function(d) { openBubble(this, d.extended) })

    .transition()
      .attr("r", radius)

    let ballGrow = target => {

      if(target.classList.contains('faded')) return
      target.setAttribute('r', radius*2.26)
      target.classList.add('growing')

      let balls = document.getElementsByClassName('d3-point')

      for(let i=0; i<balls.length; ++i)
      {
        if(balls[i] === target) continue

        balls[i].classList.add('shrinking')
        balls[i].setAttribute('r', radius*2/3)
      }

      window.wikiminaTime = setTimeout(() => {
        target.classList.remove('growing')
        target.setAttribute('r', radius*2)
      }, 160)
    }

    let ballShrink = target => {
      if(window.wikiminaTime) {
        clearTimeout(window.wikiminaTime)
        window.wikiminaTime = undefined
      }

      let balls = document.getElementsByClassName('d3-point')
      for(let i=0; i<balls.length; ++i)
      {
        balls[i].classList.remove('growing')
        balls[i].classList.remove('shrinking')
        if(!balls[i].classList.contains('faded'))
          balls[i].setAttribute('r', radius)
      }
    }

    let openBubble = (target, data) => {
      let bubble = document.getElementById('details-bubble')
      let balls = document.getElementsByClassName('d3-point')

      for(let i=0; i<balls.length; ++i)
      {
        balls[i].setAttribute('r', radius*2/3)
        if(balls[i] === bubble) continue

        balls[i].classList.add('shrinking')
        balls[i].classList.add('faded')
      }
      bubble.classList.remove('show')

      setTimeout(() => {
        let rect = target.getBoundingClientRect()
        let plot = document.getElementsByClassName('scatter-plot').item(0).getBoundingClientRect()

        let name = document.createTextNode(data.Name)
        let nameContainer = bubble.getElementsByClassName('name').item(0)
        clearNodes(nameContainer)
        nameContainer.appendChild(name)

        let capitalizedOccupation = data.Occupation[0].toUpperCase() + data.Occupation.slice(1)
        let description = document.createTextNode(`${capitalizedOccupation} from ${data.Country}`)
        let descriptionContainer = bubble.getElementsByClassName('description').item(0)
        clearNodes(descriptionContainer)
        descriptionContainer.appendChild(description)

        let link = bubble.getElementsByClassName('external').item(0)
        link.setAttribute('href', data.Informations)

        bubble.style.top = `${rect.top - plot.top + 20}px`
        bubble.style.left = `${rect.left - plot.left + 20}px`
        bubble.classList.add('show')
      }, 200)
    }

    function clearNodes(node) {
      while(node.lastChild) {
        node.removeChild(node.childNodes[0])
      }
    }

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
