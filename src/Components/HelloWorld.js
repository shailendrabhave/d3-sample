import React, { Component } from 'react'
import * as d3 from 'd3';

class HelloWorld extends Component {
    
    componentDidMount() {
        d3.select('#canvas')
        .append("h1")
        .attr("style","padding:5px;color:#d34927;")
        .text("Hello World");

        d3.select("#list").selectAll("li")
        .data([1, 2, 3, 4, 5])
        .text(function(d) { return "This is pre-existing element and the value is " + d; })
        .enter()
        .append("li")
        .text(function(d) 
            { return "This is dynamically created element and the value is " + d; });
    }    

    remove = () => {
        d3.selectAll("li")
        .data([10, 20, 30])
        .exit()
        .remove();
    }
    
    render() {
        return (
            <>
                <div id='canvas'></div>
                <div>
                    <ul id = "list">
                        <li></li>
                        <li></li>
                    </ul> 
                </div>
                <input type = "button" name = "remove" value = "Remove fourth value" onClick = {this.remove} />                
            </>
            
        )
    }
}

export default HelloWorld
