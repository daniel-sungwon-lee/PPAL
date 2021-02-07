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
import RoutineDetail from "./pages/routine-detail"
import AddFavorites from "./pages/favorites-add"

const types = [
  {name: "Chest", id: 1},
  {name: "Back", id:2},
  {name: "Biceps", id:3},
  {name: "Triceps", id:4},
  {name: "Shoulders", id:5},
  {name: "Legs", id:6},
  {name: "Abs", id:7}
]

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      route: parseRoute(window.location.hash),
      previousHash: null
    }
    this.previousHash=this.previousHash.bind(this)
  }

  componentDidMount(){
    window.addEventListener("hashchange",()=>{
      this.setState({route: parseRoute(window.location.hash)})
    })
  }

  previousHash(hash){
    this.setState({previousHash: hash})
  }

  renderPage(){
    const {route} = this.state

    if(route.path===""){
      return <Home types={types} />
    }

    const typeNames=types.map(type=>{
      return type.name
    })
    if(typeNames.includes(route.path)){
      return <Exercises exercise={route.path} previousHash={this.previousHash} />
    }

    if(route.path==="exercise"){
      const exerciseId = route.params.get("exerciseId")

      return <ExerciseDetail exerciseId={exerciseId} previousHash={this.state.previousHash}/>
    }

    if(route.path==="favorites"){
      return <Favorites types={types} previousHash={this.previousHash} />
    }

    if(route.path==="favoritesExercise"){
      const exerciseId= route.params.get("exerciseId")

      return <ExerciseFav exerciseId={exerciseId} previousHash={this.state.previousHash}/>
    }

    if(route.path==="routines"){
      return <Routines />
    }

    if(route.path==="routineForm"){
      const type = route.params.get("formType")
      const routineId = route.params.get("routineId")

      return <RoutineForm type={type} routineId={routineId} />
    }

    if(route.path==="routine"){
      const routineId = route.params.get("routineId")

      return <RoutineDetail routineId={routineId} previousHash={this.previousHash} />
    }

    if(route.path==="favoritesAdd"){
      const routineId = route.params.get("routineId")
      const routineName = route.params.get("routineName")

      return <AddFavorites routineId={routineId} routineName={routineName} previousHash={this.previousHash} />
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
