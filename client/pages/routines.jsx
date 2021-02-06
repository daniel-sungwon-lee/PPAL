import React from "react"

function Spinner(props) {
  return (
    <div className="spinnerDiv">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

function Accordion(props){

}

export default class Routines extends React.Component{
  constructor(props){
    super(props)
    this.state={routines: [], loading: true}
    this.deleteRoutine=this.deleteRoutine.bind(this)
  }

  componentDidMount(){
    fetch("/api/routines")
      .then(res=>res.json())
      .then(data=>{
        this.setState({routines: data, loading: false})
      })
  }

  deleteRoutine(routineId){
    const newRoutines = this.state.routines.filter(routine => {
      return routine.routineId !== routineId
    })

    this.setState({ routines: newRoutines })

    fetch(`/api/routines/${routineId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
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
            <div className="card">
              <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <button className="accordion-button btn btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Sunday
                  </button>
                </h2>
              </div>
              <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div className="card-body">
                  {
                    this.state.routines.map(routine=>{
                      if(routine.day==="Sunday"){
                        return <Routine key={routine.routineId} deleteRoutine={()=>this.deleteRoutine(routine.routineId)} routine={routine}/>
                      } else if(routine.day!=="Sunday"){
                        return ""
                      }
                    })
                  }
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0">
                  <button className="accordion-button btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Monday
                  </button>
                </h2>
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div className="card-body">
                  {
                    this.state.routines.map(routine => {
                      if (routine.day === "Monday") {
                        return <Routine key={routine.routineId} deleteRoutine={() => this.deleteRoutine(routine.routineId)} routine={routine} />
                      } else if (routine.day !== "Monday") {
                        return ""
                      }
                    })
                  }
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingThree">
                <h2 className="mb-0">
                  <button className="accordion-button btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Tuesday
                  </button>
                </h2>
              </div>
              <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                <div className="card-body">
                  {
                    this.state.routines.map(routine => {
                      if (routine.day === "Tuesday") {
                        return <Routine key={routine.routineId} deleteRoutine={() => this.deleteRoutine(routine.routineId)} routine={routine} />
                      } else if (routine.day !== "Tuesday") {
                        return ""
                      }
                    })
                  }
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingFour">
                <h2 className="mb-0">
                  <button className="accordion-button btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    Wednesday
                  </button>
                </h2>
              </div>
              <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                <div className="card-body">
                  {
                    this.state.routines.map(routine => {
                      if (routine.day === "Wednesday") {
                        return <Routine key={routine.routineId} deleteRoutine={() => this.deleteRoutine(routine.routineId)} routine={routine} />
                      } else if (routine.day !== "Wednesday") {
                        return ""
                      }
                    })
                  }
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingFive">
                <h2 className="mb-0">
                  <button className="accordion-button btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                    Thursday
                  </button>
                </h2>
              </div>
              <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                <div className="card-body">
                  {
                    this.state.routines.map(routine => {
                      if (routine.day === "Thursday") {
                        return <Routine key={routine.routineId} deleteRoutine={() => this.deleteRoutine(routine.routineId)} routine={routine} />
                      } else if (routine.day !== "Thursday") {
                        return ""
                      }
                    })
                  }
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingSix">
                <h2 className="mb-0">
                  <button className="accordion-button btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                    Friday
                  </button>
                </h2>
              </div>
              <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
                <div className="card-body">
                  {
                    this.state.routines.map(routine => {
                      if (routine.day === "Friday") {
                        return <Routine key={routine.routineId} deleteRoutine={() => this.deleteRoutine(routine.routineId)} routine={routine} />
                      } else if (routine.day !== "Friday") {
                        return ""
                      }
                    })
                  }
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingSeven">
                <h2 className="mb-0">
                  <button className="accordion-button btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                    Saturday
                  </button>
                </h2>
              </div>
              <div id="collapseSeven" className="collapse" aria-labelledby="headingSeven" data-parent="#accordionExample">
                <div className="card-body">
                  {
                    this.state.routines.map(routine => {
                      if (routine.day === "Saturday") {
                        return <Routine key={routine.routineId} deleteRoutine={() => this.deleteRoutine(routine.routineId)} routine={routine} />
                      } else if (routine.day !== "Saturday") {
                        return ""
                      }
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
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
      <i className="fas fa-trash" data-toggle="modal" data-target={`#staticBackdrop${routineId}`}></i>
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
