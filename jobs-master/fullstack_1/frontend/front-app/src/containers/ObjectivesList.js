import React, { Component } from 'react';
import ObjectivesListItem from '../components/ObjectiveListItem';


class ObjectivesList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
        }
    }
    
    render() { 
        console.log("taille dans liste ", this.props.objectives.length)
        var listeDesObjectives = null;
        if(this.props.objectives!=null && this.props.objectives.length>0){
            listeDesObjectives = this.props.objectives.map(function(node){
                console.log("passage");
                return(
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
                )
            }.bind(this));
        }

        return ( 
            <div>
                {listeDesObjectives}
            </div>
         );
    }
} 
export default ObjectivesList;