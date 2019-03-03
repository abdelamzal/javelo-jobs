import React, { Component } from 'react';
import ObjectivesListItem from '../components/ObjectiveListItem';


class ObjectivesList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
        }
    }
    
    render() {
        var listeDesObjectives = null;
        if(this.props.objectives!=null && this.props.objectives!=undefined){
            var node = this.props.objectives;
            listeDesObjectives = (
                <div style={{display:'flex', flexDirection:'column', justifyContent:'start' ,paddingLeft:(node.id!=1)?'150px':'none',}}>
                    <ObjectivesListItem
                        key={node.id}
                        start_date={node.start_date}
                        end_date={node.end_date}
                        TODAY={this.props.TODAY}
                        start={node.start}
                        target={node.target}
                        current={node.current}
                        title={node.title}
                    />
                    {(node.listEnfant.length > 0 )? node.listEnfant.map(fils => <ObjectivesList objectives={fils} key={fils.id}  TODAY={this.props.TODAY}/>) : false}
                </div>
            )
        }
        return ( 
            <div>
                {listeDesObjectives}
            </div>
         );
    }
} 
export default ObjectivesList;