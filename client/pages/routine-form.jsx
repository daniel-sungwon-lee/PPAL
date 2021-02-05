import React from "react"

function ModalStatic(props) {
  return (
    <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header m-0 align-items-center">
            <div className="modal-title" id="staticBackdropLabel">
              <h4 className="">Cancel?</h4>
              <h4 className="">All data will be lost</h4>
            </div>
            <div className="modal-icons d-flex align-items-center">
              <i className="fas fa-hand-point-left" data-dismiss="modal" aria-label="Close"></i>
              <i className="fas fa-thumbs-up" data-dismiss="modal" aria-label="Close" onClick={props.handleCancel}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default class RoutineForm extends React.Component{
  constructor(props){
    super(props)
    this.state={
      name: null,
      day: null,
      description: null
    }
    this.data={type: `${props.type} Routine`}
    this.handleCancel=this.handleCancel.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleNameChange=this.handleNameChange.bind(this)
    this.handleDayChange=this.handleDayChange.bind(this)
    this.handleDescription=this.handleDescription.bind(this)
  }

  componentDidMount(){

  }

  handleNameChange(event){
    this.setState({name: event.target.value})
  }

  handleDayChange(event){
    this.setState({day: event.target.value})
  }

  handleDescription(event){
    this.setState({description: event.target.value})
  }

  handleCancel(){
    window.location.hash="#routines"
  }

  handleSubmit(event){
    event.preventDefault()
    const name = this.state.name
    const day= this.state.day
    const description = this.state.description
    //admin userId
    const userId = 1
    const reqBody={name, day, description, userId}

    fetch("http://localhost:3000/api/routines", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(reqBody)
    })
      .then(res=>res.json())
      .then(result=>{
        window.location.hash="#routines"
      })
  }

  render(){
    return (
      <div className="container">
        <div className="header d-flex justify-content-between align-items-center">
          <i className="fas fa-ban invisible"></i>
          <h2 className="text-uppercase m-0">{this.data.type}</h2>
          <i className="fas fa-ban" data-toggle="modal" data-target="#staticBackdrop"></i>
          <ModalStatic handleCancel={this.handleCancel}/>
        </div>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group d-flex flex-column">
            <label htmlFor="routineName">Routine name</label>
            <input type="text" className="text-input" id="routineName" required placeholder="Push" onChange={this.handleNameChange}/>
          </div>
          <div className="form-group d-flex flex-column">
            <label htmlFor="routineDay">Day of the week</label>
            <select className="select" id="routineDay" required onChange={this.handleDayChange}>
              <option>Sunday</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
            </select>
          </div>
          <div className="form-group d-flex flex-column">
            <label htmlFor="routineDescription">Routine description</label>
            <textarea className="textarea" id="routineDescription" placeholder="Chest and Triceps" onChange={this.handleDescription}></textarea>
          </div>
          <div className="button-outline form-submit">
            <button className="type-button submit" type="submit">Save</button>
          </div>
        </form>
      </div>
    )
  }
}
