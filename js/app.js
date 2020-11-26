// script/code:

// Define SVG area dimensions
var svgWidth = 560;
var svgHeight = 500;

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
  .attr("height", svgHeight)
  .attr("width", svgWidth)

var chartGroup = svg.append("g")
  .attr("transform",
    "translate(" + plotMargin.left + ", " + plotMargin.top + ")"
  );

// console.log(svg);

//Read data from censusdata.csv
// d3.csv(https://data.census.gov/cedsci/table?q=2014%20acs%20health%20insurance%20by%20Income%20and%20Poverty&tid=ACSDT1Y2014.B27015&hidePreview=false [, row, callback]);

//Read and Load data from censusdata.csv
d3.csv("./data_resources/data_uhi.csv").then(function (censusData) {
  // console.log(censusData);

  // Add X and Y axis
// function used for updating x-scale var upon click on axis label

  //  // Step 1: Parse Data/Cast as numbers
  //   // ==============================
    censusData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });

    // Step 2: Create scale functions
    // ==============================

  var xLinearScale = d3
    .scaleLinear()
    // .domain([
    //   d3.min(censusData, (d) => d.proverty),
    //   d3.max(censusData, (d) => d.proverty)
    // ])
    .domain(d3.extent(censusData, d => d.poverty))
    .range([0, svgWidth]);


  var yLinearScale = d3
    .scaleLinear()
    .domain([d3.min(censusData, (d) => d.healthcare), d3.max(censusData, (d) => d.healthcare)])
    .range([svgHeight - 30, 30]);


    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${svgHeight - 30})`)
      .call(bottomAxis)
    //  .attr("transform", `translate(0, ${svgHeight})`);
    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    // var circlesGroup = chartGroup.selectAll("circle")
    // .data(hairData)
    // .enter()
    // .append("circle")
    // .attr("cx", d => xLinearScale(d.hair_length))
    // .attr("cy", d => yLinearScale(d.num_hits))
    // .attr("r", "15")
    // .attr("fill", "pink")
    // .attr("opacity", ".5");

console.log(censusData);

  // Add circles
  var circlesGroup = chartGroup
    .selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    .attr("cx", (d) => {
      console.log(d.proverty)
      return xLinearScale(d.poverty);
    })
    .attr("cy", function (d) {
      return yLinearScale(d.healthcare);
    })
    .attr("r", "15")
    .attr("fill", "purple")
    .attr("opacity", ".5");
}).catch(function(error){
console.log(error);
});


   // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.rockband}<br>Hair length: ${d.hair_length}<br>Hits: ${d.num_hits}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

         // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
 
