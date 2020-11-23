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
  d3.select('body')
    .append('h1')
    .text(name)
}

welcome();