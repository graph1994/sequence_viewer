import React, { Component } from 'react';
import './App.css';
import NavBar from './components/common/NavBar'
import SequenceTable from './components/Table'
import { Route, Switch } from 'react-router-dom'
import AddSequence from './components/AddSequence'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div style={{margin: "10px"}}>
        <main>
          <Switch>
            <Route exact path="/" component={SequenceTable} />
            <Route exact path="/add" component={AddSequence} />
          </Switch>
        </main>
        </div>
      </div>
    );
  }
}

export default App;
