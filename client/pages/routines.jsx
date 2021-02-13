import React from "react"
import Spinner from "../components/spinner"

const days =[
  {
    day: "Sunday",
    num: "One"
  },
  {
    day: "Monday",
    num: "Two"
  },
  {
    day: "Tuesday",
    num: "Three"
  },
  {
    day: "Wednesday",
    num: "Four"
  },
  {
    day: "Thursday",
    num: "Five"
  },
  {
    day: "Friday",
    num: "Six"
  },
  {
    day: "Saturday",
    num: "Seven"
  }
]

export default class Routines extends React.Component{
  constructor(props){
    super(props)
    this.state={routines: [], loading: true}
    this.data = {userId: this.props.userId}
    this.deleteRoutine=this.deleteRoutine.bind(this)
  }

  componentDidMount(){
    fetch(`/api/routines/${this.data.userId}`)
      .then(res=>res.json())
      .then(data=>{
        this.setState({routines: data, loading: false})
      })
  }

  deleteRoutine(routineId){
    const newRoutines = this.state.routines.filter(routine => {
      return routine.routineId !== routineId
    })

    this.setState({ routines: newRoutines, loading: true })

    fetch(`/api/routinesExercises/${routineId}`, {
      method: "DELETE",
      headers: {"Content-Type":"application/json"}
    })
      .then(result=>{

        fetch(`/api/routines/${routineId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        })
          .then(result=>{
            this.setState({loading: false})
          })

      })
  }

  render(){
    if (this.state.loading){
      return <Spinner />
    }else {
      return (
        <div className="container">
          <div className="header d-flex justify-content-between align-items-center">
            <i className="fas fa-plus invisible"></i>
            <h2 className="text-uppercase m-0">Routines</h2>
            <a className="text-dark" href={`#routineForm?formType=new`}><i className="fas fa-plus"></i></a>
          </div>

          <div className="accordion" id="accordionExample">
            {
              days.map(obj=>{
                return (
                  <Accordion key={obj.num} obj={obj} routines={this.state.routines}
                    deleteRoutine={this.deleteRoutine} />
                )
              })
            }
          </div>
        </div>
      )
    }
  }
}

function Accordion(props) {
  const {day,num} = props.obj
  return (
    <div className="card">
      <div className="card-header" id={`heading${num}`}>
        <h2 className="mb-0">
          <button className="accordion-button btn btn-block text-left" type="button" data-toggle="collapse" data-target={`#collapse${num}`} aria-expanded="true" aria-controls={`collapse${num}`}>
            {day}
          </button>
        </h2>
      </div>
      <div id={`collapse${num}`} className="collapse show" aria-labelledby={`heading${num}`} data-parent="#accordionExample">
        <div className="card-body">
          {
            props.routines.map(routine => {
              if (routine.day === day) {
                return <Routine key={routine.routineId} deleteRoutine={() => props.deleteRoutine(routine.routineId)}
                        routine={routine} />

              } else if (routine.day !== day) {
                return ""
              }
            })
          }
        </div>
      </div>
    </div>
  )
}

function Routine(props){
  const {name, routineId} = props.routine
  return (
    <div id={routineId} className="routines-exercise-row d-flex justify-content-between align-items-center mb-5">
      <a className="w-75 text-decoration-none text-dark"
        href={`#routine?routineId=${routineId}`}>
        <div className="row row-exercise m-0">
          <button className="h4 exercise-name">{name}</button>
        </div>
      </a>
      <div className="icons-div">
        <a className="text-dark" href={`#routineForm?formType=edit&routineId=${routineId}`}><i className="fas fa-pen"></i></a>
        <i className="fas fa-trash" data-toggle="modal" data-target={`#staticBackdrop${routineId}`}></i>
      </div>
      <ModalStatic key={routineId} deleteRoutine={props.deleteRoutine} routineId={routineId} />
    </div>
  )
}

function ModalStatic(props) {
  return (
    <div className="modal fade" id={`staticBackdrop${props.routineId}`} data-backdrop="static" data-keyboard="false" aria-labelledby={`staticBackdrop${props.routineId}Label`} aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header m-0 align-items-center">
            <div className="modal-title" id={`staticBackdrop${props.routineId}Label`}>
              <h4 className="">Delete?</h4>
              <h4 className="">There is no going back...</h4>
            </div>
            <div className="modal-icons d-flex align-items-center">
              <i className="fas fa-hand-point-left" data-dismiss="modal" aria-label="Close"></i>
              <i className="fas fa-thumbs-up" data-dismiss="modal" aria-label="Close" onClick={props.deleteRoutine}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
