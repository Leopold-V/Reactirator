import * as d3 from 'd3';
import { depStateType } from '../helpers/types';
import { getRandomColor } from './color';

export const generateTreeMapWithD3 = (listPackages: depStateType) => {
    const width = 300
    const height = 220
    const listColor = [...listPackages.dependencies.map((ele) => (getRandomColor()))];

    // append the svg object
    const svg = d3.select("#svg_pie")

    const g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    const color = d3.scaleOrdinal(listColor);

    // Generate the pie
    const pie = d3.pie();

    const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(100)
    
    //Generate groups
    const arcs = g.selectAll("arc")
                .data(pie(listPackages.dependencies.map((ele) => ele.size)))
                .enter()
                .append("g")
                .attr("class", "arc")

    //Draw arc paths
    arcs.append("path")
        .attr("fill", (d, i) => (color(listColor[i])))
        .attr("d", arc);
}