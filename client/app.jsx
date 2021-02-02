import React from 'react';
import Home from './pages/home';
import Nav from "./components/nav"
import {parseRoute} from "./lib"
import Exercises from "./pages/exercises"

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state=({route: parseRoute(window.location.hash)})
  }

  renderPage(){
    const {route} = this.state
    if(route.path===""){
      return <Home />
    }

  }

  render() {
    return (
      <>
        <Nav />
        {this.renderPage()}
      </>
    )
  }
}
