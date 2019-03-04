import React, { Component } from 'react'
import { LineChart } from 'react-chartkick';
window.Chart = require('chart.js')

const xTitle = "Date"
const yTitle = "Réalisation"

class ObjectivesListItem extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            current: this.props.current
        }
    }
    addOne(){
        this.setState({current:this.state.current+1})
    }
    render() { 
        var start_date = this.props.start_date;
        var end_date = this.props.end_date;
        var TODAY = this.props.TODAY;
        var start = this.props.start;
        var target = this.props.target;
        //var current = this.props.current;
        console.log("TESTTTT", start_date, end_date, TODAY)

        return (
            <div style={{display:'flex', flexDirection:'column', margin:'0px 0 0 0'}}>
                <div style={{display:'flex', flexDirection:'row', padding:'50px 0 0 50px', }}>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', borderRadius:'100px', width:'200px', height:'31px', backgroundColor:'#0000FF', cursor:'pointer'}}
                            onClick={()=> this.addOne()}
                    >
                        <p style={{margin:'0 0 0 0', fontSize:'12px', color:'#FFF'}}>Ajouter +1</p>
                    </div>
                    <div style={{display:'flex', flexDirection:'row', margin:'0 0 0 20px', justifyContent:'center', alignItems:'center', height:'25px',}}>
                        <p style={{margin:'0 0 0 0', fontSize:'12px', color:'#0000FF', fontWeight:'bold'}}>{"La valuer actuelle : "+this.state.current}</p>
                    </div>
                </div>
                <LineChart title={this.props.title} ytitle={yTitle} data={[[start_date, start], [TODAY, this.state.current], [end_date, target]]}  />
            </div>
        )
    }
}
export default ObjectivesListItem;