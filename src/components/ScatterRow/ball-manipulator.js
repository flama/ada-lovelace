const radius = 5

let clearNodes = node => {
  while(node.lastChild) {
    node.removeChild(node.childNodes[0])
  }
}

const Ball = {
  grow(target) {
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
  },

  shrink(target) {
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
  },

  open(target, data) {
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

      bubble.style.top = `${rect.top - plot.top + 5.5}px`
      bubble.style.left = `${rect.left - plot.left + 5.5}px`
      bubble.classList.add('show')
    }, 200)
  }
}

export default Ball
