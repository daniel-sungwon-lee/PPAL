import React from 'react';
import Home from './pages/home';
import Nav from "./components/nav"
import {parseRoute} from "./lib"
import Exercises from "./pages/exercises"
import ExerciseDetail from "./pages/exercise-detail"

const types = ["Chest", "Back", "Biceps", "Triceps", "Shoulders", "Legs", "Abs"]

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state=({route: parseRoute(window.location.hash)})
  }

  componentDidMount(){
    window.addEventListener("hashchange",()=>{
      this.setState({route: parseRoute(window.location.hash)})
    })
  }

  renderPage(){
    const {route} = this.state

    if(route.path==="home"){
      return <Home types={types} />
    }

    if(types.includes(route.path)){
      return <Exercises exercise={route.path} />
    }

    if(route.path==="exercise"){
      const exerciseId = route.params.get("exerciseId")
      const exerciseName = route.params.get("exerciseName")
      const exerciseData = { exerciseName, exerciseId }

      return <ExerciseDetail exerciseData={exerciseData}/>
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
