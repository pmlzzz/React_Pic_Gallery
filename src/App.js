import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      pictures:[],
      textInput:'dog'
    };
  }
  componentDidMount(){
    this.ReloadImages();
  }

  ReloadImages =()=>{
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4c9bfd9b8a55d743781f85ff0536c837&tags='+this.state.textInput+'&per_page=10&page=1&format=json&nojsoncallback=1')
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
      this.setState({pictures: picArray});
    }.bind(this))
  }

  HandleChange=(e)=>{
    this.setState({textInput: e.target.value});
  }
  Delay=(function(){
    var timer=0;
    return function(callback,ms){
      clearTimeout(timer);
      timer=setTimeout(callback,ms);
    };
  })();
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> Welcome to React Pic Gallery(zz)</h1>
        </header>
        <p>
          <input className="textInput" 
            onChange={this.HandleChange}
            
            
            ></input>
            <button onClick={this.ReloadImages}>search</button>
        </p>
        <p>
            {this.state.pictures}
        </p>
      </div>
    );
  }
}

export default App;
