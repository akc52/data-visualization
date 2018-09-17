const w = 800;
const h = 500;
const padding = 60;

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', function(err, data) {
//console.log(data.data[2])

  var years = data.data.map((item) => {
    var quarter;
    var testQuarter = item[0].substring(5, 7)
    //console.log(testQuarter)
    switch(testQuarter){
      case ('01'): {
          quarter = "Q1";
          break;
         }
      case ('04'): {
          quarter = "Q2";
          break;
         }
      case ('07'): {
          quarter = "Q3";
          break;
         }
      case ('10'): {
          quarter = "Q4";
          break;
         }
        return item[0].substring(0, 4) + ' ' + quarter
    }
  });

  var yearsDigits = years.map(function(item) {
    return item.substring(0, 4);
  });

  const xScale = d3.scaleLinear()
    .domain([d3.min(yearsDigits), d3.max(yearsDigits)])
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(yearsDigits, (d) => d[1] ) ])
    .range([h - padding, padding]);

  var xAxis = d3.axisBottom()
    .scale(xScale)
    .tickFormat(d3.format("d"));

  const yAxis = d3.axisLeft(yScale);


  const svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg.append("g")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .attr("class", "x-axis")
    .call(xAxis);

  svg.append("g")
    .attr("transform", "translate(" + padding + ", 0)")
    .attr("class", "y-axis")
    .call(yAxis);

  svg.append("text")
    .attr("x",  w / 2 )
    .attr("y", padding / 2)
    .attr("text-anchor", "middle")
    .attr("id", "title")
    .text("graph");

});
