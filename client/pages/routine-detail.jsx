import React from "react"

export default class RoutineDetail extends React.Component{
  constructor(props){
    super(props)
    this.state={
      exercises: [],
      loading: true
    }
    this.data={
      routineId: this.props.routineId,
      routine: {},
      routineExercises: []
    }
    this.deleteRoutineExercise=this.deleteRoutineExercise.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }

  componentDidMount(){
    fetch(`/api/routines/${this.data.routineId}`)
      .then(res=>res.json())
      .then(routine=>{
        this.data.routine=routine
      })

    fetch(`/api/routineExercises/${this.data.routineId}`)
      .then(res=>res.json())
      .then(data=>{
        this.setState({exercises: data, loading: false})
      })

  }

  deleteRoutineExercise(exerciseId){
    const newExercises = this.state.exercises.filter(exercise => {
      return exercise.exerciseId !== exerciseId
    })

    this.setState({ exercises: newExercises })

    fetch(`/api/routineExercises/${this.data.routineId}/${exerciseId}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    })
  }

  handleChange(exerciseId){
    console.log(exerciseId)
    console.log(event.target.checked)
  }

  render(){
    return (
      this.state.loading
        ? <Spinner />
        : <div className="container">
            <Modal description={this.data.routine.description}/>
            <div className="header d-flex justify-content-between align-items-center">
              <i className="fas fa-plus invisible"></i>
              <h2 className="text-uppercase m-0" role="button" data-toggle="modal" data-target="#saveModal">{this.data.routine.name}</h2>
              <a className="text-dark" href={`#favoritesAdd?routineId=${this.data.routineId}&routineName=${this.data.routine.name}`}><i className="fas fa-plus"></i></a>
            </div>
            <div className="m-auto w-75">
              {
                this.state.exercises.map(exercise => {
                  return (
                    <Exercise key={exercise.exerciseId} exercise={exercise}
                     previousHash={this.props.previousHash} deleteRoutineExercise={this.deleteRoutineExercise}
                     handleChange={()=>this.handleChange(exercise.exerciseId)} />
                  )
                })
              }
            </div>
          </div>
    )
  }
}

function Exercise(props){
  const {exerciseId, name} = props.exercise
  return (
    <div className="d-flex mb-5 align-items-center">
      <label className="fas fa-check-square mr-4 mb-0" htmlFor={`check${exerciseId}`}></label>
      <input type="checkbox" id={`check${exerciseId}`}
        className="d-none" onChange={props.handleChange}/>
      <a className="text-decoration-none text-dark w-100"
        href={`#favoritesExercise?exerciseId=${exerciseId}`}
        onClick={() => props.previousHash(window.location.hash)}>
        <div className="row row-exercise mb-0">
          <button className="h4 exercise-name">{name}</button>
        </div>
      </a>
      <i className="fas fa-trash ml-4" data-toggle="modal" data-target={`#staticBackdrop${exerciseId}`}></i>
      <ModalStatic key={exerciseId} deleteRoutineExercise={()=>props.deleteRoutineExercise(exerciseId)} id={exerciseId} />
    </div>
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

function Modal(props) {
  return (
    <div className="modal fade" id="saveModal" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header m-0">
            <h4 className="modal-title" id="exampleModalLabel">{props.description}</h4>
          </div>
        </div>
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
              <i className="fas fa-thumbs-up" data-dismiss="modal" aria-label="Close" onClick={props.deleteRoutineExercise}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
