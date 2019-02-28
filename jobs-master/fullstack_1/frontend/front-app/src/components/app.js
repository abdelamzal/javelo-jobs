import React, { Component } from 'react';
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {fetchObjectives} from "../actions/index"

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

  render() {
    //Affichage des objectives Redux Marche 
    console.warn(this.props.objectives)
    const {objectives} = this.props
    if(objectives!=null){
        console.warn(" Taille du tableau d'objectives", objectives.length)
    }
    //Fin D'affichage Redux

    return (
      <div>React Redux ca marche</div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        objectives: state.objectives
    }
}
 function mapDispatchToProps (dispatch) {
    return bindActionCreators({fetchObjectives:fetchObjectives},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(App)