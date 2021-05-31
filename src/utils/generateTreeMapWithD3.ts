import * as d3 from 'd3';
import { depStateType } from '../helpers/types';
import { getRandomColor } from './color';

export const generateTreeMapWithD3 = (listPackages: depStateType) => {
    const width = 400
    const height = 240
    const listColor = [...listPackages.dependencies.map(() => (getRandomColor()))];

    // append the svg object
    const svg = d3.select("#svg_pie")

    const g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    const color = d3.scaleOrdinal(listColor);

    // Generate the pie
    const pie = d3.pie();

    const arc = d3.arc()
    .innerRadius(50)
    .outerRadius(70)
    
    //Generate groups
    const arcs = g.selectAll("arc")
                .data(pie(listPackages.dependencies.length > 0 ? listPackages.dependencies.map((ele) => ele.size) : [100] ))
                .enter()
                .append("g")
                .attr("class", "arc")

    //Draw arc paths
    arcs.append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => (color(listColor[i])))

    svg
        .selectAll('mySlices')
        .data(pie(listPackages.dependencies.length > 0 ? listPackages.dependencies.map((ele) => ele.size) : [100] ))
        .enter()
        .append('text')
        .text(function(d){ return "grp "})
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")";  })
        .style("text-anchor", "middle")
        .style("font-size", 17)
}