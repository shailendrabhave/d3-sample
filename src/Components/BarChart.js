import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import salesData from '../Data/sales.csv';

export default function BarChart() {
    const margin = {top:30, right:100, bottom:200,left:30}
    const width = 1366 - margin.right - margin.left;
    const height = 768 - margin.top - margin.bottom;
    let svg;
    let data = [];
    const maxSalesInput =  useRef(null);
    
    let x = d3.scaleBand()
            .range([0,width])
            .padding(0.1);

    let y = d3.scaleLinear()
            .range([height,0]);
    
    useEffect(() => {        
        console.log('loadChartData called');
        d3.csv(salesData,(d) => {
            d.sales = +d.sales;
            return d;
        }).then((result) => {                        
            drawChart(result);
        }).catch((error)=>{
            throw error;
        });          
    });

    const drawChart = (result) => {
        data = result;
        svg = d3.select('#viz')
            .html('') 
            .append('svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height',height + margin.top + margin.bottom)
            .append('g')
            .attr('transform',`translate(${margin.left},${margin.top})`);

        x.domain(data.map(d=>d.flavors));
        
        maxSalesInput.current.max = d3.max(data,d => d.sales);
        y.domain([0,maxSalesInput.current.max]).nice();

        svg.append('g')
            .call(d3.axisLeft(y));

        svg.append('g')
            .attr('transform',`translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll('text')
            .style('font-size',13)
            .attr('x', x.bandwidth()/2)
            .attr('y',0)
            .attr('dy','.35em')
            .attr('transform','rotate(45)')
            .attr('text-anchor','start');
        
        createBars(data);
    }

    const createBars = (chartData) => {
        svg.selectAll('.bar-group')
        .data(chartData, d => d.flavors)
        .join(
            enter => {
                let bar = enter.append('g')        
                    .attr('class','bar-group')
                    .style('opacity',1)

                bar.append('rect')
                .attr('class','bar')
                .style('style','width:50px;height:100px;background-color:red')
                .attr('x', d => x(d.flavors))
                .attr('y', d => y(0))
                .attr('width', x.bandwidth())
                .attr('height', 0)
                .style('fill','#a4ca8a')
                .transition()
                    .duration(750)
                    .attr('y',d => y(d.sales))
                    .attr('height',d => height - y(d.sales));

                bar.append('text')
                .text(d=>d.sales)
                .attr('x', d => x(d.flavors) + (x.bandwidth() / 2))
                .attr('y', d => y(d.sales) - 10)
                .attr('text-anchor','middle')
                .style('opacity',0)
                .style('font-family','sans-serif')
                .style('font-size',13)
                .transition()
                    .duration(500)
                    .style('opacity',1);
            },
            update => {
                update.transition()
                    .duration(750)
                    .style('opacity',1);
            },
            exit => {
                exit.transition()
                    .duration(750)
                    .style('opacity',0.15)
            }
        )
    }

    const onSliderChange = (e) => {
        let filteredData = data.filter(d => d.sales >= parseInt(maxSalesInput.current.value));
        createBars(filteredData);
        d3.select('#maxSalesLabel').text(maxSalesInput.current.value);
    }

    return (
        <div className='row' id='bar-chart-container'>
            <div id='slider'>
                <span>All</span>
                <input type='range' id='sales-range' ref={maxSalesInput} min='0' max='0' onChange={onSliderChange}/>
                <span>Best Sellers</span>
                &nbsp;
                <h4 id='maxSalesLabel'>0</h4>
            </div>
            <div id="viz">
            </div>
        </div>
        
    )
}
