import { depStateType } from '../helpers/types';
import * as d3 from 'd3';
import innerRadius from 'd3';


function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const generateTreeMapWithD3 = (listPackages: depStateType) => {
    const width = 534
    const height = 450
    const margin = 40

    const radius = Math.min(width, height) / 2 - margin

    // append the svg object
    const svg = d3.select("svg_pie")

    const g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    const color = d3.scaleOrdinal();

    // Generate the pie
    const pie = d3.pie();

    // Generate the arcs
    const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

    //Generate groups
    const arcs = g.selectAll("arc")
                .data(pie(listPackages.dependencies.map((ele) => ele.size)))
                .enter()
                .append("g")
                .attr("class", "arc")

    //Draw arc paths
    arcs.append("path")
        .attr("fill", () => getRandomColor())
        .attr("d", arc);
}