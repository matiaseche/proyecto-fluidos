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
      // calc();
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
    });
}

const input = () => {
  const body = d3.select('body');

  body.append('p')
    .attr('class', 'welcome')
    .text('Caudal');

  body.append('input')
    .attr('id', 'caudal');

  body.append('p')
    .attr('class', 'welcome')
    .text('Profundidad pozo vecino');

  body.append('input')
    .attr('id', 'prof_vec');

  body.append('p')
    .attr('class', 'welcome')
    .text('Distancia respecto a la empresa (vecino)');

  body.append('input')
    .attr('id', 'dist_vec');

  body.append('p')
    .attr('class', 'welcome')
    .text('Profundidad del pozo que puedes costear');
  
  body.append('input')
    .attr('id', 'prof');

  body.append('p')
    .attr('class', 'welcome')
    .text('Transmitividad (o Conductividad Hidráulica)');

  body.append('input')
    .attr('id', 'transmitividad');

  body.append('button')
    .attr('class', 'button')
    .text('Calcular')
    .on('click', () => {
      let q = document.getElementById('caudal').value;
      let h1 = document.getElementById('prof_vec').value;
      let s1 = document.getElementById('dist_vec').value;
      let h2 = document.getElementById('prof').value;
      let t = document.getElementById('transmitividad').value;

      console.log(q);
      console.log(h2);
      console.log(s1);
      console.log(h1);
      console.log(t);

      d3.selectAll('p')
        .transition(1000)
        .attr('opacity', 0)
        .remove();

      d3.selectAll('input')
        .transition(1000)
        .attr('opacity', 0)
        .remove();

      d3.selectAll('button')
        .transition(1000)
        .attr('opacity', 0)
        .remove();

      calc(s1, h1, h2, q, t);
    });
}

const calc = (s1, h1, h2, q, t) => {
  const margin = {
    top: 60,
    right: 30,
    bottom: 30,
    left: 40
  };
  
  // (exp(h1 - h2) - exp(Q) + exp(2*Pi*T))s1 = s2
  const s2 = Math.round((Math.exp(h1-h2) - Math.exp(q) + Math.exp(2*Math.PI*t))*s1);
  const width = 1000;
  const height = 500;
  // const datosX = [];
  let datos = [
    {x: 0, y: 0},
    {x: s1, y: h1},
    {x: s2, y: h2}
  ];
  const depth = d3.max(datos.map((d) => d.y))*2;

  datos[0].y = depth;

  const svg = d3.select('body')
    .append('svg')
  
  svg
    .attr('width', width)
    .attr('height', height);

  const escalaY = d3.scaleLinear()
    .domain([depth, 0])
    .range([height - margin.top - margin.bottom, 0]);

  const ejeY = d3.axisLeft(escalaY);

  const escalaX = d3.scaleBand()
      .domain(datos.map((d) => d.x))
      .rangeRound([0, width])
      .padding(0.75);
  
  const ejeX = d3.axisTop(escalaX);

  const contenedorEjeY = svg.append('g')
    .attr("transform", `translate(${margin.left + 20}, ${margin.top + 20})`);

  const contenedorEjeX = svg.append("g")
    .attr("transform", `translate(${margin.left + 20}, ${margin.top + 20})`);

  const contenedorBarras = svg.append("g")
    .attr("transform", `translate(${margin.left + 20}, ${margin.top + 20})`);

  contenedorEjeY
    .transition()
    .duration(1000)
    .call(ejeY)
    .selection()
    .selectAll("line")
    .attr("x1", width*2 - margin.right - margin.left)
    .attr("stroke-dasharray", "5")
    .attr("opacity", 0.5)
    .attr('stroke', 'white')

  contenedorEjeY
    .selection()
    .selectAll('path')
    .attr('stroke', 'white')

  contenedorEjeY
    .selection()
    .selectAll('text')
    .attr('font-size', 15)
    .attr('fill', 'white')
  
  contenedorEjeX
    .transition()
    .duration(1000)
    .call(ejeX)
    .selection()
    .selectAll("text")
    .attr("font-size", 15)
    .attr('fill', 'white')

  contenedorEjeX
    .selection()
    .selectAll('path')
    .attr('stroke','white')

  contenedorEjeX
    .selection()
    .selectAll('line')
    .attr('stroke', 'white')
    
  contenedorBarras
    .selectAll('rect')
    .data(datos)
    .join(
      (enter) =>
        enter
          .append("rect")
          .attr('fill', '#598fc3')
          .attr("y", 0)
          .attr("x", (d) => escalaX(d.x))
          .attr("width", escalaX.bandwidth())
          .attr("height", 0)
          .transition()
          .duration(1000)
          .attr("height", (d) => escalaY(d.y))
          // .attr("y", (d) => escalaY(d.y))
          .selection(),
    )

  const xTitle = svg.append('text')
    .attr('x', width/2)
    .attr('y', 30)
    .attr('class', 'welcome')
    .attr('fill', 'white')
    .style('text-anchor', 'middle')
    .text('Distancia de la empresa (m)')

  const yTitle = svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height/2)
    .attr('y', 20)
    .attr('class', 'welcome')
    .attr('fill', 'white')
    .style('text-anchor', 'middle')
    .text('Profundidad pozo (m)')
}

welcome();