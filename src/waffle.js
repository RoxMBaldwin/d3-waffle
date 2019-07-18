function tableTop() {
  //swap out with live Url when ready
   var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1CCvvhDV6TCd_kn8MzBYTOjoU32LRD72fVlQTO_dnTMk/edit?usp=sharing';

   Tabletop.init( { key: publicSpreadsheetUrl,
                     callback: showInfo,
                     simpleSheet: false } )

}

function showInfo(data, tabletop) {
  
   let vScoreSovrn = data.Sheet1.raw.feed.entry[3].gsx$_cokwr.$t
   let vScoreGeneral = data.Sheet1.raw.feed.entry[3].gsx$_cpzh4.$t;
   let generalPercent = document.getElementById('generalScore');
   let sovrnPercent = document.getElementById('sovrnScore');
   let sovrnScoreParsed = parseInt(vScoreSovrn);
   let generalScoreParsed = parseInt(vScoreGeneral);

   generalPercent.innerHTML = `
   <p class="scoreTag">${vScoreGeneral}</p>
  `
   sovrnPercent.innerHTML = `
    <p class="scoreTag">${vScoreSovrn}</p>
   `
      
   let sovrnData = [
       {"name": "viewability score", "value": sovrnScoreParsed},
       {"name": "unfilled", "value": (100-sovrnScoreParsed)}
    ]

    let generalData = [
      {"name": "viewability score", "value": generalScoreParsed},
      {"name": "unfilled", "value": (100-generalScoreParsed)}
    ]

   let sovrnWaffle = new WaffleChart()
   .selector("#sovrnChart")
   .color(yellow)
   .data(sovrnData)
   .useWidth(false)
   .label("Sovrn //Signal")
   .size(16)
   .gap(1)
   .rows(20)
   .columns(20)
   .rounded(false)();

   let generalWaffle = new WaffleChart()
   .selector("#generalChart")
   .color(gray)
   .data(generalData)
   .useWidth(false)
   .label("General Audience")
   .size(16)
   .gap(1)
   .rows(20)
   .columns(20)
   .rounded(false)();

   
};

tableTop();

const yellow = "#ffd42b";
const gray = "#d4d8e1";

var WaffleChart = function() {
   
   var $_selector,
       $_color,
       $_data,
       $_label,
       $_cellSize,
       $_cellGap,
       $_rows,
       $_columns,
       $_rounded,
       $_keys,
       $_useWidth;
 
   var defaults = {
     size: 15,
     rows: 20,
     columns: 20,
     rounded: false,
     gap: 2
   };
 
   function generatedWaffleChart() {
 
     $_keys = d3.keys($_data[0]);
 
     var obj = {
       selector: $_selector,
       color: $_color,
       data: $_data,
       label: $_label,
       size: $_cellSize,
       gap: $_cellGap,
       rows: $_rows,
       columns: $_columns,
       rounded: $_rounded
     };
 
     drawWaffleChart(obj);
 
   }
 
   function drawWaffleChart(_obj) {
 
     if (!_obj.size) { _obj.size = defaults.size; }
     if (!_obj.rows) { _obj.rows = defaults.rows; }
     if (!_obj.columns) { _obj.columns = defaults.columns; }
     if (_obj.gap === undefined) { _obj.gap = defaults.gap; }
     if (_obj.rounded === undefined) { _obj.columns = defaults.rounded; }
 
     var formattedData = [];
     var domain = [];
     var value = $_keys[$_keys.length - 1];
     var total = d3.sum(_obj.data, function(d) { 
        let rounded = Math.round(d[value]);
        return d[value]; 
      });
 
     if ($_useWidth) {
       var forcedWidth = d3.select(_obj.selector).node().getBoundingClientRect().width;
       _obj.columns = Math.floor(forcedWidth / (_obj.size + _obj.gap));
     }
 
     var squareVal = total / (_obj.rows * _obj.columns);
 
     _obj.data.forEach(function(d, i) {
       d[value] = +d[value];
       d.units = Math.floor(d[value] / squareVal);
       Array(d.units + 1).join(1).split('').map(function() {
         formattedData.push({
           squareVal: squareVal,
           units: d.units,
           value: d[value],
           groupIndex: i
         });
       });
       domain.push(d[$_keys[0]]);
     });
 
     
     const lightGray = "#f0f3f9";
 
     if (_obj.label) {
       d3.select(_obj.selector)
         .append("div")
         .attr("class", "label")
         .text(_obj.label);
     }
 
     // add legend
 
   //   var legend = d3.select($_selector)
   //     .append("div")
   //     .attr("class", "legend");
 
   //   var legendItem = legend.selectAll("div")
   //     .data(_obj.data);
 
   //   legendItem.enter()
   //     .append("div")
   //     .attr("class", function(d, i) {
   //       return "legend_item legend_item_" + (i + 1);
   //     });
 
   //   var legendIcon = legendItem.append("div")
   //     .attr("class", "legend_item_icon")
   //     .style("background-color", function(d, i) {
   //       if (i === 0) {
   //         return yellow;
   //       } else {
   //         return color(i);
   //       }
   //     });
 
   //   if (_obj.rounded) {
   //     legendIcon.style("border-radius", "50%");
   //   }
 
   //   legendItem.append("span")
   //     .attr("class", "legend_item_text")
   //     .text(function(d) { return d[$_keys[0]]; });
 
     // set up the dimensions
 
     var width = (_obj.size * _obj.columns) + (_obj.columns * _obj.gap) - _obj.gap;
     var height = (_obj.size * _obj.rows) + (_obj.rows * _obj.gap) - _obj.gap;
 
     if ($_useWidth) {
       width = d3.select(_obj.selector).node().getBoundingClientRect().width;
     }
 
     var svg = d3.select(_obj.selector)
       .append("svg")
       .attr("class", "waffle")
       .attr("class", _obj.label)
       .attr("width", width)
       .attr("height", height)
       .attr("transform", "scale(1, -1), rotate(90)")
;
 
     var g = svg.append("g")
       .attr("transform", "translate(0,0)");
 
     // insert dem items
 
     var item = g.selectAll(".unit")
       .data(formattedData);
 
     item.enter()
       .append("rect")
       .attr("class", "unit")
       .attr("width", _obj.size)
       .attr("height", _obj.size)
       .attr("fill", function(d) {
         if (d.groupIndex === 0) {
           return _obj.color;
         } else {
           return lightGray;
         }
       })
       .attr("x", function(d, i) {
         var col = Math.floor(i / _obj.rows);
         return (col * (_obj.size)) + (col * _obj.gap);
       })
       .attr("y", function(d, i) {
         var row = i % _obj.rows;
         return (_obj.rows * (_obj.size + _obj.gap)) - ((row * _obj.size) + (row * _obj.gap)) - _obj.size - _obj.gap;
       })
       .append("title")
       .text(function (d, i) {
         return _obj.data[d.groupIndex][$_keys[0]] + ": " + Math.round((d.units / formattedData.length) * 100) + "%";
       });
 
     if (_obj.rounded) {
       item
         .attr("rx", (_obj.size / 2))
         .attr("ry", (_obj.size / 2));
     }
 
   }
 
   generatedWaffleChart.selector = function(value){
     if (!arguments.length) { return $_selector; }
     $_selector = value;
     return generatedWaffleChart;
   }

   generatedWaffleChart.color = function(value){
      if (!arguments.length) { return lightGray; }
      $_color = value;
      return generatedWaffleChart;
    }
 
   generatedWaffleChart.data = function(value){
     if (!arguments.length) { return $_data; }
     $_data = value;
     return generatedWaffleChart;
   }
 
   generatedWaffleChart.useWidth = function(value){
     if (!arguments.length) { return $_useWidth; }
     $_useWidth = value;
     return generatedWaffleChart;
   }
 
   generatedWaffleChart.label = function(value){
     if (!arguments.length) { return $_label; }
     $_label = value;
     return generatedWaffleChart;
   }
 
   generatedWaffleChart.size = function(value){
     if (!arguments.length) { return $_cellSize; }
     $_cellSize = value;
     return generatedWaffleChart;
   }
 
   generatedWaffleChart.gap = function(value){
     if (!arguments.length) { return $_cellGap; }
     $_cellGap = value;
     return generatedWaffleChart;
   }
 
   generatedWaffleChart.rows = function(value){
     if (!arguments.length) { return $_rows; }
     $_rows = value;
     return generatedWaffleChart;
   }
 
   generatedWaffleChart.columns = function(value){
     if (!arguments.length) { return $_columns; }
     $_columns = value;
     return generatedWaffleChart;
   }
 
   generatedWaffleChart.rounded = function(value){
     if (!arguments.length) { return $_rounded; }
     $_rounded = value;
     return generatedWaffleChart;
   }
 
   return generatedWaffleChart;
 
 };