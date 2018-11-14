import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InputMirror from './InputMirror';
import store from './store/';
import {connect} from 'react-redux';
export class App extends Component {
  
  componentDidMount(){
    this.ReloadImages();
  }
  clickhandler=()=>{
    this.ReloadImages();
    
  }
  ReloadImages =()=>{
    //console.log(this.props.inputValue);
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4c9bfd9b8a55d743781f85ff0536c837&tags='+this.props.inputValue+'&per_page=10&page=1&format=json&nojsoncallback=1')
    .then(function(response){
      return response.json();
    })
    .then(function(j){
      //alert(JSON.stringify(j));
      let picArray = j.photos.photo.map((pic) => {
        
        var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
        return(
          <img alt="pics" height="200" border="4" hspace="20" src={srcPath} ></img>
        )
      })
      this.props.picChanged(picArray);
    }.bind(this))
  }

  
  render() {
    //const {inputValue, dispatch} = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> Welcome to React Pic Gallery(zz)</h1>
        </header>
        <div>
            <InputMirror store={store} />
            <button onClick={this.clickhandler}>search</button>
            
        </div>
        <p>
            {this.props.pictures}
        </p>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
      inputValue: state.inputValue,
      pictures: state.pictures
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
      picChanged:(pictures)=>{
          //console.log('change',evt.target.value);
          const action ={type:'PIC_CHANGE',pic:pictures}
          dispatch(action);
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
