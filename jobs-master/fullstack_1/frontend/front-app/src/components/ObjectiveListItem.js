import React, { Component } from 'react'
import { LineChart } from 'react-chartkick';
window.Chart = require('chart.js')

const xTitle = "Date"
const yTitle = "Réalisation"

class ObjectivesListItem extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            
        }
    }
    
    render() { 
        var start_date = this.props.start_date;
        var end_date = this.props.end_date;
        var TODAY = this.props.TODAY;
        var start = this.props.start;
        var target = this.props.target;
        var current = this.props.current;
        console.log("TESTTTT", start_date, end_date, TODAY)

        return (
            <div style={{margin:'40px 0 0 0'}}>
                <LineChart title={this.props.title} ytitle={yTitle} data={[[start_date, start], [TODAY, current], [end_date, target]]}  />
            </div>
        )
    }
}
export default ObjectivesListItem;