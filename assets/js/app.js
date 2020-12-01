// Define SVG area dimensions
var svgWidth = 900;
var svgHeight = 650;

// console.log(svgWidth, svgHeight);

// Define the plot's margins as an object
var plotMargin = {
  top: 15,
  right: 40,
  bottom: 60,
  left: 105,
};

// console.log(plotMargin);

//Define the dimensions of plot area
var plotWidth = svgWidth - plotMargin.left - plotMargin.right;
var plotHeight = svgHeight - plotMargin.top - plotMargin.bottom;

// console.log(plotWidth);
// console.log(plotHeight);

// Select body/div-id, append SVG area to body of page, and set the dimensions/create an svg wrapper
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth)

var chartGroup = svg.append("g")
  .attr("transform",
    `translate(${plotMargin.left}, ${plotMargin.top})`);

// console.log(svg);

//Import data from censusdata.csv
// d3.csv(https://data.census.gov/cedsci/table?q=2014%20acs%20health%20insurance%20by%20Income%20and%20Poverty&tid=ACSDT1Y2014.B27015&hidePreview=false [, row, callback]);

//Import and Load data from censusdata.csv
d3.csv("./data_res/data_uhi.csv").then(function (censusData) {
  // console.log(censusData);

  // Add X and Y axis
// function used for updating x-scale var upon click on axis label

   // Step 1: Parse Data/Cast as numbers
  
    censusData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcareLow = +data.healthcareLow;
    });

    // Step 2: Create scale functions

  var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(censusData, d => d.poverty))
    .range([0, svgWidth]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(censusData, (d) => d.healthcareLow)])
    .range([svgHeight, 0]);


    // Step 3: Create axis functions
    
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
 
    chartGroup.append("g")
      .attr("transform", `translate(0, ${svgHeight - 60})`)
      .call(bottomAxis)
    chartGroup.append("g")
      .call(leftAxis);
  // }).catch(function(error){
  //     console.log(error)
  // });

// Step 5: Create circles

var circlesGroup = chartGroup.selectAll("Circle")
  .data(censusData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.healthcareLow))
  .attr("r", "15")
  .attr("fill", "blue")
  .attr("opacity", "0.5");

      // Add state labels to circles
    var circleLabels = chartGroup.selectAll(null).data(censusData).enter().append("text");  
    
    circleLabels
      .attr("x", function(d) { return d.poverty; })
      .attr("y", function(d) { return d.healthcareLow; })
      .text(function(d) { return d.abbr; })
      .attr("font-family", "sans-serif")
      .attr("font-size", "5px")
      .attr("fill", "white");

    // Create axes labels for "y" and "x" axes including positioning the text
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - plotMargin.left + 40)
      .attr("x", 0 - (svgHeight / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .style("text-anchor", "middle")
      .text("Lacks Healthcare (%)");
  
     svg.append("text")    
     .attr("fill", "#414241")    
     .attr("text-anchor", "end")    
     .attr("x", svgWidth / 1.5)    
     .attr("y", svgHeight - 0.25)    
     .text("In Poverty (%)"); 

// Code below is where the client can hover over the circle and the state's healthcare and proverty stats appear:

    // Initialize tooltip
    var toolTip = d3.tip() 
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return  `${d.state}<br>Poverty: ${d.poverty}<br>HealthcareLow: ${d.healthcareLow}<br>`; 
    });

    // Create tooltip in the chart
    chartGroup.call(toolTip);

    // Create event listeners to display and hide the tooltip
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

});
