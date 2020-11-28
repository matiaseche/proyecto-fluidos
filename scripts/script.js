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

      d3.selectAll('div')
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
    .append('br')

  p.append('tspan')
    .text('Quieres hacer un pozo en tu casa, y con el presupuesto que tienes puedes hacerlo de profundidad H1')
    .append('br')
  
  p.append('tspan')
    .text('Ademas tienes un vecino que ya tiene un pozo de profundidad H2 y que está a una distancia')
    .append('br')

  p.append('tspan')
    .text('S2 de una empresa que bombea agua del acuífero. Te ayudaremos a calcular la distancia S1')
    .append('br')

  p.append('text')
    .text('a la que se debe ubicar tu pozo de la empresa para que calce con el cono de depresión usando')
    .append('br')

  p.append('text')
    .text('la siguiente formula:')
    .append('br')

  body.append('p')
    .attr('class', 'welcome')
    .text('H1 - H2 = Q/(2*Pi*T) * ln(S2/S1)')


  body.append('button')
    .attr('class', 'button')
    .text('Avanzar')
    .on('click', () => {
      d3.selectAll('p')
        .transition(1000)
        .attr('opacity', 0)
        .remove();

      d3.selectAll('img')
        .transition(1000)
        .attr('opacity', 0)
        .remove()

      d3.selectAll('button')
        .transition(1000)
        .attr('opacity', 0)
        .remove()

      input();
    })
}

const input = () => {
  const body = d3.select('body')

  let div = 

  body.append('p')
    .attr('class', 'welcome')
    .text('Caudal')

  body.append('input')
    .attr('id', 'caudal')

  body.append('p')
    .attr('class', 'welcome')
    .text('Profundidad pozo vecino')

  body.append('input')
    .attr('id', 'prof_vec')

  body.append('p')
    .attr('class', 'welcome')
    .text('Distancia respecto a la empresa (vecino)')

  body.append('input')
    .attr('id', 'dist_vec')

  body.append('p')
    .attr('class', 'welcome')
    .text('Profundidad del pozo que puedes costear')
  
  body.append('input')
    .attr('id', 'prof')

  body.append('p')
    .attr('class', 'welcome')
    .text('Transmitividad (o Conductividad Hidráulica)')

  body.append('input')
    .attr('id', 'transmtividad')
}

welcome();