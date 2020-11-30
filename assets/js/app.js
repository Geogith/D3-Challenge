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
d3.csv("./data/data_uhi.csv").then(function (censusData) {
  console.log(censusData);

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
  }).catch(function(error){
      console.log(error)
  });

       // X axis label. Nothing too special to see here.    
     svg.append("text")    
     .attr("fill", "#414241")    
     .attr("text-anchor", "end")    
     .attr("x", svgWidth / 1.5)    
     .attr("y", svgHeight - 0.25)    
     .text("In Poverty %"); 

    //   // Y axis label. Nothing too special to see here.    
      // svg.append('text')
      // .attr("fill", "#414241") 
      // .attr('x', svgHeight / 2)
      // .attr('y', -60)
      // .attr('transform', `rotate(-90)`)
      // .style('text-anchor', 'middle')
      // .text("% Lack Healthcare");

// console.log(censusData);

