const drawChile = async (height, width, margin) => {

  const topeDensidad = 500;
  const text = d3.select('#svg-container')
    .append('p')
  text
    .text('El mapa de la izquierda nos muestra Chile coloreado según su densidad, si se posiciona el puntero sobre la barra de colores, indicará los valores de densidad. El gráfico de la derecha nos indicará los índices de dependencia de jóvenes y adultos mayores de las comunas que se seleccionen (máximo 10 a la vez).')
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

  const labels = svgMap.append('g');
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
    .text('Densidad de población en Chile')
  
  const datosComunas = await d3.json('comunas.geojson');
  const datosCenso = await d3.csv('censo.csv');
  const densities = {};
  datosCenso.forEach((item) => {
    densities[`${parseInt(item['ID'])}`] = parseFloat(item['DENSIDAD'])
  })
  let max = Math.max(...Object.values(densities));
  const min = Math.min(...Object.values(densities));

  if (max > topeDensidad) {
    max = topeDensidad
  }

  const fillScale = d3.scaleSequential()
    .interpolator(d3.interpolateOranges)
    .domain(
      [min, max]
    )
  let k;
  const proyeccion = d3.geoMercator()
      .fitSize([width, height], datosComunas);

  const caminosGeo = d3.geoPath()
    .projection(proyeccion);
  let item;
  const data = [];
  const selected = [];
  const paths = comunas.selectAll('path')
    .data(datosComunas.features)
    .enter()
    .append('path')
    .attr('d', caminosGeo)
    .attr('fill', (d) => fillScale(densities[d.id]))
    .attr('opacity', 1)
    .attr('stroke', 'gray')
    .attr('stroke-width', 1)
    .attr('transform', (d) => {
      if ((d.id == 116) || (d.id == 115)) {
        return 'scale(20)'
      } else {
        return ''
      }
    })
    .on("click", (e,i) => {
      let clicked = i.id;
      item = datosCenso.filter((item) => parseInt(item['ID']) === clicked)[0];
      if (!selected.includes(clicked)) {
        if (selected.length < 10) {
          data.push(item)
          selected.push(clicked)
          d3.select(e.target)
            .attr('fill', 'yellow')
            .attr('stroke', 'red')
            .attr('stroke-width', (1/k)*3)
        } else {
          d3.select('body')
            .append('p')
              .attr('class', 'full')
              .text('Máximo de comunas seleccionadas alcanzado!')
          d3.select('body')
            .append('p')
              .attr('class', 'full')
              .text('Presiona una comuna previamente seleccionada para eliminarla.')
        }
      } else {
        data.splice(data.indexOf(item), 1)
        selected.splice(selected.indexOf(clicked), 1)
        d3.select(e.target)
          .attr('fill', fillScale(densities[i.id]))
          .attr('stroke', 'gray')
          .attr('stroke-width', (1/k))

        d3.selectAll('p.full').remove()
      }
      joinDeDatos(data);
    })
    .on('mouseenter', (e, d) => {
      d3.select(e.target)
        .attr('stroke', 'red')
        .attr('stroke-width', (1/k)*3)

      d3.select('body')
        .append('p')
          .attr('class', 'info')
          .text(`Comuna: ${d.properties.comuna}`)
      
    })
    .on('mouseleave', (e, d) => {
      if (!selected.includes(d.id)) {
        d3.select(e.target)
          .attr('stroke', 'gray')
          .attr('stroke-width', (1/k))
      }
      d3.select('p.info').remove()
    })

  const zoomHanlder = (event) => {
    const transformation = event.transform;
    console.log(transformation);
    k = transformation.k;
    paths.attr("transform", transformation);
    paths.attr("stroke-width", (d) => {
      if (selected.includes(d.id)) {
        return (1/k)*3
      } else {
        return 1/k
      }
    });
  };

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

  const labelData = [0, 20, 40, 60, 80, 100];
  const rectHeight = 20;
  const rectWidth = 20;
  const labelHeight = labelData.length * rectHeight;

  labels.selectAll('rect')
    .data(labelData)
    .join('rect')
      .attr('fill', (d) => fillScale(max*d/100))
      .attr('stroke', 'black')
      .attr('x', 20)
      .attr('y', (_, i) => height/2 + labelHeight/2 - rectHeight*(i+1))
      .attr('width', rectWidth)
      .attr('height', rectHeight)
      .on('mouseenter', (_,d) => {
        if (d == 0) {
          d3.select('body')
            .append('p')
              .attr('class', 'info')
              .text(`Densidad entre 0 y ${(20/100)*max} (hab/km2)`)
        } else if (d < 100) {
          d3.select('body')
            .append('p')
              .attr('class', 'info')
              .text(`Densidad entre ${(d)/100*max}  y ${((d+20)/100)*max} (hab/km2)`)
        } else {
          d3.select('body')
            .append('p')
              .attr('class', 'info')
              .text(`Densidad mayor o igual a ${max} (hab/km2)`)
        }
      })
      .on('mouseleave', () => {
        d3.select('p.info').remove()
      })

  const svgChart = d3.select("#svg-container")
    .append("svg")
    .attr("width", 800)
    .attr("height", height+100);

  const contenedorEjeY = svgChart
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  const contenedorEjeX = svgChart
    .append("g")
    .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`);
  
  const contenedorBarras = svgChart
    .append("g")
    .attr("transform", `translate(${margin.left} ${margin.top})`);

  const chartLabels = svgChart.append('g');
  
  const chartLabelData = ['Indice de dependencia de Jóvenes (0 - 14 años)', 'Indice de dependencia de adultos mayores (65 años o más)']
  const colores = ['blue', 'green']
  chartLabels.selectAll('rect')
    .data(chartLabelData)
    .join(
      (enter) => {
        enter
          .append('rect')
          .attr('fill', (_,i) => colores[i])
          .attr('x', 625)
          .attr('y', (_, i) => height - (labelHeight*3)/2 - (rectHeight*3)*(i+1) - 30*(i+1))
          .attr('width', rectWidth*2)
          .attr('height', rectHeight*2 + 25)
        enter
          .append('text')
          .attr('x', 625 + rectWidth*2)
          .attr('y', (_, i) => 50*(i+1) + 50*i)
          .attr('text-size', 5)
          .text((d) => d.split(' ').slice(0,2).join(' '))

        enter
          .append('text')
          .attr('x', 625 + rectWidth*2)
          .attr('y', (_, i) => 75*(i+1) + 25*i)
          .attr('text-size', 5)
          .text((d) => d.split(' ').slice(2,3).join(' '))

        enter
          .append('text')
          .attr('x', 625 + rectWidth*2)
          .attr('y', (_, i) => 100*(i+1))
          .attr('text-size', 5)
          .text((d) => d.split(' ').slice(3,5).join(' '))
      }
    )

  function joinDeDatos(datos) {
    const densities = {};
    datos.forEach((item) => {
      densities[`${parseInt(item['ID'])}`] = d3.max([parseFloat(item['IND_DEP_JU']), parseFloat(item['IND_DEP_VE'])]);
    })
    const max = Math.max(...Object.values(densities));
    
    const escalaAltura = d3.scaleLinear()
      .domain([0, max])
      .range([0, height - margin.top - margin.bottom]);
  
    const escalaY = d3.scaleLinear()
      .domain([0, max])
      .range([height - margin.top - margin.bottom, 0]);
  
    const ejeY = d3.axisLeft(escalaY);
  
    contenedorEjeY
      .transition()
      .duration(1000)
      .call(ejeY)
      .selection()
      .selectAll("line")
      .attr("x1", width*2 - margin.right - margin.left)
      .attr("stroke-dasharray", "5")
      .attr("opacity", 0.5);
  
    const escalaX = d3.scaleBand()
      .domain(datos.map((d) => d['NOM_COMUNA']))
      .rangeRound([0, width*2 - margin.right - margin.left])
      .padding(0.75);
  
    const ejeX = d3.axisBottom(escalaX);
  
    contenedorEjeX
      .transition()
      .duration(1000)
      .call(ejeX)
      .selection()
      .selectAll("text")
      .attr("font-size", 15)
      .attr('transform', (d) => `translate(-25,${d.length*4} ),rotate(300)`)
  
    contenedorBarras
      .selectAll("rect.ju")
      .data(datos)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("fill", 'blue')
            .attr("y", height - margin.top - margin.bottom)
            .attr("x", (d) => escalaX(d['NOM_COMUNA']) - escalaX.bandwidth()/2)
            .attr("width", escalaX.bandwidth())
            .attr("height", 0)
            .transition()
            .duration(1000)
            .attr("height", (d) => escalaAltura(parseFloat(d['IND_DEP_JU'])))
            .attr("y", (d) => escalaY(parseFloat(d['IND_DEP_JU'])))
            .attr('class', 'ju')
            .selection(),
        (update) =>
          update
            .transition()
            .duration(1000)
            .attr("height", (d) => escalaAltura(parseFloat(d['IND_DEP_JU'])))
            .attr("y", (d) => escalaY(parseFloat(d['IND_DEP_JU'])))
            .attr("x", (d) => escalaX(d['NOM_COMUNA']) - escalaX.bandwidth()/2)
            .attr("width", escalaX.bandwidth())
            .attr('fill', 'blue')
            .selection(),
        (exit) =>
          exit
            .transition()
            .duration(500)
            .attr("y", height - margin.top - margin.bottom)
            .attr("height", 0)
            .remove()
      )

    contenedorBarras
      .selectAll("rect.ve")
      .data(datos)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("fill", 'green')
            .attr("y", height - margin.top - margin.bottom)
            .attr("x", (d) => escalaX(d['NOM_COMUNA']) + escalaX.bandwidth()/2)
            .attr("width", escalaX.bandwidth())
            .attr("height", 0)
            .attr('class', 've')
            .transition()
            .duration(1000)
            .attr("height", (d) => escalaAltura(parseFloat(d['IND_DEP_VE'])))
            .attr("y", (d) => escalaY(parseFloat(d['IND_DEP_VE'])))
            .selection(),
        (update) =>
          update
            .transition()
            .duration(1000)
            .attr("height", (d) => escalaAltura(parseFloat(d['IND_DEP_VE'])))
            .attr("y", (d) => escalaY(parseFloat(d['IND_DEP_VE'])))
            .attr("x", (d) => escalaX(d['NOM_COMUNA']) + escalaX.bandwidth()/2)
            .attr("width", escalaX.bandwidth())
            .attr('fill', 'green')
            .selection(),
        (exit) =>
          exit
            .transition()
            .duration(500)
            .attr("y", height - margin.top - margin.bottom)
            .attr("height", 0)
            .remove()
      )
    }
  joinDeDatos(data);
};


const HEIGHT = 400;
const WIDTH = 300;
const MARGIN = {
  top: 20,
  left: 50,
  right: 20,
  bottom: 50,
};

drawChile(HEIGHT, WIDTH, MARGIN);