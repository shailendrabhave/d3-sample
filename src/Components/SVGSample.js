import React, { useEffect } from 'react';
import * as d3 from 'd3';

export default function SVGSample() {
    useEffect(()=>{
        d3.select('svg')
        .append('circle')
        .attr('cx', 320)
        .attr('cy', 240)
        .attr('r', 100)
        .attr('fill', '#db222a')
    })
    return (
        <svg height="480" width="640" />
    )
}
