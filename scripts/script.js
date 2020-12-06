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
    .text(`Bienvenid@ ${name}! Para ayudarte a entender sobre acuíferos, plantearemos un escenario y lo simularemos de manera que sea fácil entender. Pero antes, explicaremos unos conceptos claves:`)

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
    .html('Quieres hacer un pozo en tu casa, y con el presupuesto que tienes puedes hacerlo de profundidad S' + '1'.sub() + '.')
    .append('br')
  
  p.append('tspan')
    .html('Además, tienes un vecino que ya tiene un pozo de profundidad S' + '2'.sub()+', y que está a una distancia')
    .append('br')

  p.append('tspan')
    .html('r' + '2'.sub() + ' de una empresa que bombea agua del acuífero. Te ayudaremos a calcular la distancia r' + '1'.sub())
    .append('br')

  p.append('text')
    .text('a la que se debe ubicar tu pozo de la empresa para que calce con el cono de depresión usando')
    .append('br')

  p.append('text')
    .text('la siguiente fórmula:')
    .append('br')

  body.append('p')
    .attr('class', 'welcome')
    .html('s' + '1'.sub()+' - s' + '2'.sub()+ ' = Q/(2*Pi*T) * ln(r' + '2'.sub() + '/r' + '1'.sub() + ')')


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

  body.append('br');
  body.append('br');

  body.append('button')
    .attr('class', 'button')
    .text('Calcular')
    .on('click', () => {
      let q = document.getElementById('caudal').value;
      let s1 = document.getElementById('prof_vec').value;
      let r1 = document.getElementById('dist_vec').value;
      let s2 = document.getElementById('prof').value;
      let t = document.getElementById('transmitividad').value;

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

      calc(r1, s1, s2, q, t);
    });
  
  body.append('br');
  body.append('br');

  body.append('button')
    .attr('class', 'button')
    .text('Simular')
    .on('click', () => {
      let q = document.getElementById('caudal').value;
      let s1 = document.getElementById('prof_vec').value;
      let r1 = document.getElementById('dist_vec').value;
      let s2 = document.getElementById('prof').value;
      let t = document.getElementById('transmitividad').value;

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

      simulacion(r1, s1, s2, q, t);
    })
}

const calc = (r1, s1, s2, q, t) => {
  const margin = {
    top: 60,
    right: 30,
    bottom: 30,
    left: 40
  };
  
  // r2 = r1 * (exp((s1-s2)/(q/(2*pi*t))))
  const r2 = Math.round(r1*Math.exp((s1 - s2)*2*Math.PI*t/q));
  const width = 1000;
  const height = 500;
  // const datosX = [];
  let datos = [
    {x: 0, y: 0},
    {x: r1, y: s1},
    {x: r2, y: s2}
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

const simulacion = async (r1, s1, s2, q, t) => {
  const datos = await d3.csv('fluidos.csv');

  let dist;
  let curr = undefined;
  let place;
  datos.forEach((item) => {
    curr = Math.sqrt(Math.pow(item['CAUDAL L/s'] - q,2)
      + Math.pow(item['TRANSMISIVIDAD (m^2/d)'] - t,2));
    if (dist == undefined) {
      dist = curr;
      place = item['NOMBRE']
    }
    if (dist > curr) {
      dist = curr;
      place = item['NOMBRE']
    }
  })

  console.log(`Lugar: ${place} - Distancia: ${dist}`);
  drawChile(datos);
}

const drawChile = async (datos) => {

  const margin = {
    top: 60,
    right: 30,
    bottom: 30,
    left: 40
  };
  const width = 1000;
  const height = 500;

  const topeDensidad = 500;
  d3.select('body')
    .append('div')
    .attr('id', 'svg-container');

  const svgMap = d3
    .select('#svg-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'map')

  const containerMap = svgMap
    .append('g')
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  const comunas = containerMap.append('g');

  const title = svgMap.append('g');

  title
    .append('rect')
    .attr('height', 30)
    .attr('width', width)
    .attr('fill', 'white')

  title
    .append('text')
    .attr('x', width/2)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .attr('font-weight', 'bold')
    .text('Acuíferos parecidos en Chile')
  
  const datosComunas = await d3.json('comunas.geojson');

  let k;
  const proyeccion = d3.geoMercator()
    .fitSize([width, height], datosComunas);

  const caminosGeo = d3.geoPath()
    .projection(proyeccion);
  let item;

  const paths = comunas.selectAll('path')
    .data(datosComunas.features)
    .enter()
    .append('path')
    .attr('d', caminosGeo)
    .attr('fill', 'blue')
    .attr('opacity', 0.5)
    .attr('stroke', 'red')
    .attr('stroke-width', 1)

  const circles = comunas
    .selectAll('circles')
    .data(datos)
    .enter()
    .append("circle")
    .attr("cx", (d) => proyeccion([parseFloat(d['LATITUD']), parseFloat(d['LONGITUD'])])[0])
    .attr("cy", (d) => proyeccion([parseFloat(d['LATITUD']), parseFloat(d['LONGITUD'])])[1])
    .attr("r", 10)
    .attr("fill", 'gray')
    // .append((d,i) => i+1)
    // .style('text-color', 'black');

  const index = comunas
    .selectAll('circles')
    .data(datos)
    .enter()
    .append('text')
    .attr("x", (d) => proyeccion([parseFloat(d['LATITUD']), parseFloat(d['LONGITUD'])])[0])
    .attr("y", (d) => proyeccion([parseFloat(d['LATITUD']), parseFloat(d['LONGITUD'])])[1])
    .style('text-color', 'black')
    .attr('font-size', 15)
    .attr('text-anchor', 'middle')
    .text((_,i) => i+1)

  const zoomHanlder = (event) => {
    const transformation = event.transform;
    k = transformation.k;
    paths.attr("transform", transformation);
    paths.attr("stroke-width", 1/k);
    circles.attr("transform", transformation)
      .attr("r", 10/k);
    index.attr('transform', transformation)
      .attr('font-size', 15/k);
  };

  const text = d3.selectAll('p#acuifero')
    .data(datos)
    .enter()
    .append('p')
    .attr('class','welcome')
    .text((d,i) => `${i+1} - ${d['NOMBRE']} - Material: ${d['MATERIAL']}`)

  const zoom = d3.zoom()
    .extent([
        [0,0],
        [width, height]
    ])
    .translateExtent([
        [-50, -50],
        [width + 50, height + 50],
    ])
    .scaleExtent([1, 30])
    .on('zoom', zoomHanlder);

  svgMap.call(zoom);
};

welcome();