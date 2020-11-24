// script/code:

// Define SVG area dimensions
var svgWidth = 460;
var svgHeight = 400;

// console.log(svgWidth, svgHeight);

// Define the plot's margins as an object
var plotMargin = {
  top: 10,
  right: 30,
  bottom: 30,
  left: 60,
};

// console.log(plotMargin);

//Define the dimensions of plot area
var plotWidth = svgWidth - plotMargin.left - plotMargin.right;
var plotHeight = svgHeight - plotMargin.top - plotMargin.bottom;

// console.log(plotWidth);
// console.log(plotHeight);

// Select body/div-id, append SVG area to body of page, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight + plotMargin.top + plotMargin.bottom)
  .attr("width", svgWidth + plotMargin.left + plotMargin.right)
  .append("g")
  .attr(
    "transform",
    "translate(" + plotMargin.left + ", " + plotMargin.top + ")"
  );

// console.log(svg);

//Read data from censusdata.csv
// d3.csv(https://data.census.gov/cedsci/table?q=2014%20acs%20health%20insurance%20by%20Income%20and%20Poverty&tid=ACSDT1Y2014.B27015&hidePreview=false [, row, callback]);

//Read and Load data from censusdata.csv
d3.csv("./data_resources/data_uhi.csv").then(function (censusData) {
  // console.log(censusData);

  // Add X and Y axis
  var x = d3
    .scaleLinear()
    .domain([
      d3.min(censusData, (d) => d.proverty),
      d3.max(censusData, (d) => d.proverty)
    ])
    .range([0, svgWidth]);

  var y = d3
    .scaleLinear()
    .domain([0, d3.max(censusData, (d) => d.healthcare)])
    .range([svgHeight, 0]);
  svg.append("g").call(d3.axisLeft(y));

  svg
    .append("g")
    .attr("transform", "translate(0," + svgHeight + ")")
    .call(d3.axisBottom(x));

  // Add circles
  svg
    .selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      // console.log(d.state);
      return x(d.state);
    })
    .attr("cy", function (d) {
      return y(parseInt(d.healthcare));
    })
    .attr("r", 10)
    .style("fill", "#69b3a2");
});
