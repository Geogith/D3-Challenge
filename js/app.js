// script/code:

// Define SVG area dimensions
var svgWidth = 590;
var svgHeight = 560;

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

// console.log(censusData);
// ----------------------------------------------------------------------------------------------------



        // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
  // Its opacity is set to 0: we don't see it by default.
  // var tooltip = d3.select("#scattertool")
  //   .append("div")
  //   .style("opacity", 0)
  //   .attr("class", "tooltip")
  //   .style("background-color", "white")
  //   .style("border", "solid")
  //   .style("border-width", "1px")
  //   .style("border-radius", "5px")
  //   .style("padding", "10px")

    // console.log(tooltip)

 // Step 6: Initialize tool tip
  // ==============================
    // var toolTip = d3.tip()
    //   .attr("class", "tooltip")
    //   .offset([80, -60])
    //   .html(function(d) {
    //     return (`${d.state}<br>healthcare: ${d.healthcare}<br>poverty: ${d.poverty}`);
    //   });


  // A function that change this tooltip when the user hover a point.
  // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
  // var mouseover = function(d) {
  //   tooltip
  //     .style("opacity", 1)
  // }

  // var mousemove = function(d) {
  //   tooltip
  //     .html("The exact value of<br>the Ground Living area is: " + d.GrLivArea)
  //     .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
  //     .style("top", (d3.mouse(this)[1]) + "px")
  // }


    // Step 7: Create tooltip in the chart
    // ==============================
    // chartGroup.call(toolTip);

     // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
  // var mouseleave = function(d) {
  //   tooltip
  //     .transition()
  //     .duration(200)
  //     .style("opacity", 0)
  // }




// -------------------------------------------------------------------------------------------------------------------------------
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
    .attr("opacity", ".5")

    // .style("stroke", "white")
    // .on("mouseover", mouseover )
    // .on("mousemove", mousemove )
    // .on("mouseleave", mouseleave );

    //          // Step 8: Create event listeners to display and hide the tooltip
    // // ==============================
    // circlesGroup.on("click", function(data) {
    //   toolTip.show(data, this);
    // })
    //   // onmouseout event
    //   .on("mouseout", function(data, index) {
    //     toolTip.hide(data);
    //   });


}).catch(function(error){
console.log(error);
});


// -----------------------------------------------------------------------------------------------------------------------Correct above-------
 
     // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (svgHeight / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("% Healthcare by State");

    chartGroup.append("text")
      .attr("transform", `translate(${svgWidth / 2}, ${svgHeight + margin.top + 30})`)
      .attr("class", "axisText")
      .text("% in Proverty")
  .catch(function(error) {
    console.log(error);
  });
  

