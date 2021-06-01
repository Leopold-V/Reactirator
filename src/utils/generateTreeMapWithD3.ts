import * as d3 from 'd3';
import { depStateType } from '../helpers/types';
import { calculatePackageSize } from './calculateSize';
import { getRandomColor } from './color';

export const generateTreeMapWithD3 = async (listPackages: depStateType) => {
    const margin = {top: 10, right: 10, bottom: 10, left: 10};
    const width = 400 - margin.left - margin.right;
    const height = 240 - margin.top - margin.bottom;
    const listColor = [...listPackages.dependencies.map(() => (getRandomColor()))];
    
    console.log(listPackages);
    
    const svgElement = d3.select("#treemap")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
}

// const extendPackagesList = (listPackages: depStateType) => {

//     for (let i = 0; i < listPackages.dependencies.length; i ++) {
//         for (const child of listPackages.dependencies[i].dependencies) {
//             console.log(child);
//         }
//         /*for (let j = 0; Object.keys(listPackages.dependencies[i].dependencies).length; j++) {
//             console.log(Object.keys(listPackages.dependencies[i].dependencies)[j]);
//           }*/
//     }

//     /*const newList = listPackages.dependencies.map((ele) => Object.entries(ele.dependencies).map(
//         async (child) => ({name: child[0], size: await calculatePackageSize(child[0], child[1])})));*/
// }