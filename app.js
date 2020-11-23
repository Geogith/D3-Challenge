// Define SVG area dimensions
var svgWidth = 460;
var svgHeight = 400;

// Define the plot's margins as an object
var plotMargin = {
  top: 10,
  right: 30,
  bottom: 30,
  left: 60,
};

// // Define the dimensions of the chart area
// var plotWidth = svgWidth - plotMargin.left - plotMargin.right;
// var plotHeight = svgHeight - plotMargin.top - plotMargin.bottom;

//Define the dimensions of plot area
var plotWidth = svgWidth - plotMargin.left - plotMargin.right
var plotHeight = svgHeight - margin.top - margin.bottom;

// // Select body, append SVG area to it, and set the dimensions
// var svg = d3
//   .select("body")
//   .append("svg")
//   .attr("height", svgHeight)
//   .attr("width", svgWidth);


  // Select body/div-id, append SVG area to it, and set the dimensions
var svg = d3
  .select("svg_scatterplot-area")
  .append("svg")
  .attr("height", svgHeight + margin.top + margin.bottom)
  .attr("width", svgWidth + margin.left + margin.right);
  

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "plotMargin" object.
var plotGroup = svg
  .append("g")
  .attr("transform", `translate(" + margin.left + "," + margin.top + ")");






// // Load data from hours-of-tv-watched.csv
// d3.csv("hours-of-tv-watched.csv")
//   .then(function (tvData) {
//     // Print the tvData
//     console.log(tvData);


// d3.csv(https://data.census.gov/cedsci/table?q=2014%20acs%20health%20insurance%20by%20Income%20and%20Poverty&tid=ACSDT1Y2014.B27015&hidePreview=false [, row, callback]);

//     // Cast the hours value to a number for each piece of tvData
//     tvData.forEach(function (data) {
//       data.hours = +data.hours;
//     });

//     var barSpacing = 10; // desired space between each bar
//     var scaleY = 10; // 10x scale on rect height

//     // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
//     var barWidth =
//       (chartWidth - barSpacing * (tvData.length - 1)) / tvData.length;

//     // @TODO
//     // Create code to build the bar chart using the tvData.
//     chartGroup
//       .selectAll(".bar")
//       .data(tvData)
//       .enter()
//       .append("rect")
//       .classed("bar", true)
//       .attr("width", (d) => barWidth)
//       .attr("height", (d) => d.hours * scaleY)
//       .attr("x", (d, i) => i * (barWidth + barSpacing))
//       .attr("y", (d) => chartHeight - d.hours * scaleY);
//   })
//   .catch(function (error) {
//     console.log(error);
// //   });