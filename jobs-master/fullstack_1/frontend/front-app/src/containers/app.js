import React, { Component } from 'react';
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {fetchObjectives} from "../actions/index"
import ObjectivesList from './ObjectivesList';

const TODAY = "2018-02-20";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    
    componentWillMount() {
      this.props.fetchObjectives()
    }

    currentSupTarget (tab){
      var result = 0;
      for(var i = 0; i<tab.length; i++){
          if(tab[i].current > tab[i].target){
              result ++;
          }
      }
      return result;
    }

    arbreObjectives(tab){
      tab.forEach(node => {
          node.listEnfant = tab.filter(fils => fils.parent_id == node.id);
      });
      return tab.filter(parentZero => parentZero.parent_id == null)[0];
    };


  render() {
    //Affichage des objectives Redux Marche 
    console.warn(this.props.objectives)
    const {objectives} = this.props
    if(objectives!=null){
        console.warn(" Taille du tableau d'objectives", objectives.length)
    }
    //Fin D'affichage Redux

    //Level1
    var valueCurrentSupTarget = null;
    var tableauObjectives = [];
    if(objectives!=null){
      valueCurrentSupTarget = this.currentSupTarget(objectives);
      tableauObjectives = objectives
    }
    console.warn(valueCurrentSupTarget);

    return (
      <div style={{display: 'flex',flexDirection: 'column',minHeight: '100vh',backgroundColor: 'rgb(244, 247, 249)',}}>
          <div style={{display: 'flex', flexDirection: 'row', backgroundColor: 'rgb(241, 243, 245)', width: '100%', height:'150px', justifyContent: 'center', alignItems:'center'}}>
            <p style={{lineHeight:'24px', fontSize:'20px',color:'#000'}}>{valueCurrentSupTarget} objectives have their current value over their target</p>
          </div>

          <ObjectivesList
            objectives={this.arbreObjectives(tableauObjectives)}
            TODAY={TODAY}
          />

      </div>
      
    );
  }
}

const mapStateToProps = (state) => {
    return {
        objectives: state.objectives
    }
}
 function mapDispatchToProps (dispatch) {
    return bindActionCreators({fetchObjectives:fetchObjectives},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(App)