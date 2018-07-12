import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import segmentJoiner from './helper'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
 
  render() {
    return (
      <div className="App">
        <div className="leftPanel">
          <h1>Input Transcription</h1>
          <form onSubmit={this.handleSubmit}>
            <textarea value={this.state.value} onChange={this.handleChange} className="textInput"></textarea>
            <br />
            <input type="submit" value="Segment" />
          </form>
        </div>
        <div className="rightPanel">
          <h1>Segmented Text</h1>
          {JSON.stringify(segmentJoiner(this.state.value))}
          <div className="output" dangerouslySetInnerHTML={{__html: segmentJoiner(this.state.value, 2)}}></div>
        </div>
      </div>

    );
  }
}

export default App;
