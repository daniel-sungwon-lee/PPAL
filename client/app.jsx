import React from 'react';
import Home from './pages/home';
import Nav from "./components/nav"
import {parseRoute} from "./lib"
import Exercises from "./pages/exercises"
import ExerciseDetail from "./pages/exercise-detail"
import Favorites from "./pages/favorites"
import ExerciseFav from "./pages/exercise-detail-favs"
import Routines from "./pages/routines"
import RoutineForm from "./pages/routine-form"

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

    if(route.path===""){
      return <Home types={types} />
    }

    if(types.includes(route.path)){
      return <Exercises exercise={route.path} />
    }

    if(route.path==="exercise"){
      const exerciseId = route.params.get("exerciseId")

      return <ExerciseDetail exerciseId={exerciseId}/>
    }

    if(route.path==="favorites"){
      return <Favorites />
    }

    if(route.path==="favoritesExercise"){
      const exerciseId= route.params.get("exerciseId")

      return <ExerciseFav exerciseId={exerciseId}/>
    }

    if(route.path==="routines"){
      return <Routines />
    }

    if(route.path==="routineForm"){
      const type = route.params.get("formType")

      return <RoutineForm type={type}/>
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
