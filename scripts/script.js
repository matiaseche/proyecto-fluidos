const welcome = () => {
  const div = d3.select('body')
    .append('div')
  
  div.style('display', 'inline-block')
  
  div
    .append('input')
    .attr('id', 'name')
    .attr('placeholder', 'tu nombre')

  div.append('br')
  div.append('br')
  
  div
    .append('button')
    .attr('class', 'button')
    .text('Comenzar')
    .on('click', () => {
      let name = document.getElementById('name').value;
      d3.selectAll('p')
        .style('opacity', 1)
        .transition(1000)
        .style('opacity', 0)
        .remove()

      d3.selectAll('input')
        .style('opacity', 1)
        .transition(1000)
        .style('opacity', 0)
        .remove()

      d3.selectAll('button')
        .style('opacity', 1)
        .transition(1000)
        .style('opacity', 0)
        .remove()

      stage2(name);
    })
}

const stage2 = (name) => {
  const body = d3.select('body')

  body
    .append('p')
    .attr('class', 'welcome')
    .text(`Bienvenido ${name}! Para ayudarte a entender sobre acuíferos, plantearemos un escenario y lo simularemos de manera que sea fácil entender. Pero antes, explicaremos unos conceptos claves:`)

  body
    .append('p')
    .attr('class', 'welcome')
    .text('El potencial hidráulico nos indica la dirección en la que se mueve el agua')
 
  // Acá poner imagenes
  const imgs_div = body.append('div')

  imgs_div
    .append('img')
    .attr('src', 'imgs/imagen1.png')

  imgs_div
    .append('img')
    .attr('src', 'imgs/imagen2.png')

  imgs_div
    .append('img')
    .attr('src', 'imgs/imagen3.png')
  
  const p = body.append('p')
    .attr('class', 'welcome')

  p.append('tspan')
    .text('El escenario es el siguiente:')

  p.append('tspan')
    .text('')
}

welcome();