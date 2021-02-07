import React from "react"

export default class Favorites extends React.Component{
  constructor(props){
    super(props)
    this.state={favorites: [], loading: true}
    this.deleteExercise=this.deleteExercise.bind(this)
  }

  componentDidMount(){
    fetch("/api/favorites")
      .then(res=>res.json())
      .then(data=>{
        this.setState({favorites: data, loading: false})
      })

  }

  deleteExercise(exerciseId){
    const newFavorites = this.state.favorites.filter(exercise=>{
      return exercise.exerciseId !== exerciseId
    })

    this.setState({favorites: newFavorites})

    fetch(`/api/favorites/${exerciseId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
  }

  render(){
    if(this.state.loading){
      return (
        <Spinner />
      )
    } else{
      return (
        <div className="container">
          <div className="header d-flex justify-content-between align-items-center">
            <i className="fas fa-plus invisible"></i>
            <h2 className="text-uppercase m-0">Favorites</h2>
            <a className="text-dark" href="#"><i className="fas fa-plus"></i></a>
          </div>
          <>
          {
            this.props.types.map(type=>{
              return (
                <ExerciseTypeHeader key={type.id} name={type.name}
                 favorites={this.state.favorites}
                 deleteExercise={this.deleteExercise}
                 previousHash={this.props.previousHash} />
              )
            })
          }
          </>
        </div>
      )
    }
  }
}

function ExerciseTypeHeader(props){
  return (
    <>
    <div className="d-flex justify-content-start m-4">
      <div className="type-header d-flex align-items-center justify-content-center">
        <div className="w-100">
          <h3 className="m-0 pl-4">{props.name}</h3>
        </div>
      </div>
    </div>
    <>
      {
        props.favorites.map(exercise=>{
          if(exercise.type===props.name){
            return (
              <Exercise key={exercise.exerciseId}
                exercise={exercise}
                deleteExercise={()=>props.deleteExercise(exercise.exerciseId)}
                previousHash={props.previousHash} />
            )
          } else if (exercise.type!==props.name){
            return ""
          }
        })
      }
    </>
    </>
  )
}

function Exercise(props){
  const {exerciseId, type, name} = props.exercise
  return (
    <>
      <div id={exerciseId} className="favorites-exercise-row d-flex justify-content-between align-items-center mb-5">
        <a className="w-75 text-decoration-none text-dark"
          href={`#favoritesExercise?exerciseId=${exerciseId}`}
          onClick={()=>props.previousHash(window.location.hash)}>
          <div className="row row-exercise m-0">
            <button className="h4 exercise-name">{name}</button>
          </div>
        </a>
        <i className="fas fa-trash" data-toggle="modal" data-target={`#staticBackdrop${exerciseId}`}></i>
        <ModalStatic key={exerciseId} deleteExercise={props.deleteExercise} id={exerciseId}/>
      </div>
    </>
  )
}

function Spinner(props) {
  return (
    <div className="spinnerDiv">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

function ModalStatic(props) {
  return (
    <div className="modal fade" id={`staticBackdrop${props.id}`} data-backdrop="static" data-keyboard="false" aria-labelledby={`staticBackdrop${props.id}Label`} aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header m-0 align-items-center">
            <div className="modal-title" id={`staticBackdrop${props.id}Label`}>
              <h4 className="">Delete?</h4>
              <h4 className="">There is no going back...</h4>
            </div>
            <div className="modal-icons d-flex align-items-center">
              <i className="fas fa-hand-point-left" data-dismiss="modal" aria-label="Close"></i>
              <i className="fas fa-thumbs-up" data-dismiss="modal" aria-label="Close" onClick={props.deleteExercise}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
