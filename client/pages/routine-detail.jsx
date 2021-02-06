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
      routine: {}
    }
  }

  componentDidMount(){
    fetch(`/api/routines/${this.data.routineId}`)
      .then(res=>res.json())
      .then(routine=>{
        this.data.routine=routine
        this.setState({loading: false})
      })
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
          </div>
    )
  }
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