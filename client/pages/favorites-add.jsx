import React from "react"

export default class AddFavorites extends React.Component{
  constructor(props){
    super(props)
    this.state={
      favorites: [],
      loading: true,
      classN: "fas fa-ban invisible"
    }
    this.data={
      routineId: this.props.routineId,
      routineName: this.props.routineName
    }
    this.handlePreviousPage=this.handlePreviousPage.bind(this)
    this.handleClick=this.handleClick.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }

  componentDidMount(){
    fetch("/api/favorites")
      .then(res=>res.json())
      .then(favorites=>{
        this.setState({favorites : favorites, loading: false})
      })
  }

  handlePreviousPage(){
    window.location.hash=`#routine?routineId=${this.data.routineId}`
  }

  handleClick(event){
    this.setState({classN:"fas fa-check"})

    if(event.target.checked){
      event.target.previousSibling.style.transform = "rotate(45deg)"
      event.target.previousSibling.style.color ="#E12121"

    }else {
      event.target.previousSibling.style.transform = "rotate(0deg)"
      event.target.previousSibling.style.color = "#28B351"
    }
  }

  handleChange(exerciseId){
    const reqBody={
      routineId: this.data.routineId,
      exerciseId: exerciseId
    }

    if(event.target.checked){
      fetch("/api/routineExercises", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(reqBody)
      })

    } else {
      fetch(`/api/routineExercises/${this.data.routineId}/${exerciseId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
      })
    }
  }

  render(){
    return (
      this.state.loading
        ? <Spinner />
        : <div className="container">
            <ModalStatic handlePreviousPage={this.handlePreviousPage} />
            <ModalStaticValidate handlePreviousPage={this.handlePreviousPage} />
            <div className="header d-flex justify-content-between align-items-center">
              <i className="fas fa-ban" data-toggle="modal" data-target={`#staticBackdrop1`}></i>
              <h2 className="text-uppercase m-0 favs-add-header">{`Add to ${this.data.routineName}`}</h2>
              <i className={this.state.classN} data-toggle="modal" data-target={`#staticBackdrop2`}></i>
            </div>
            <>
            {
              this.state.favorites.map(exercise => {
                return (
                  <Exercise key={exercise.exerciseId}
                    exercise={exercise}
                    previousHash={this.props.previousHash}
                    handleClick={this.handleClick}
                    handleChange={()=>this.handleChange(exercise.exerciseId)} />
                )
              })
            }
            </>
          </div>
    )
  }
}

function Exercise(props) {
  const { exerciseId, type, name } = props.exercise

  return (
    <>
      <div className="d-flex justify-content-start m-4">
        <div className="type-header d-flex align-items-center justify-content-center">
          <div className="w-100">
            <h3 className="m-0 pl-4">{type}</h3>
          </div>
        </div>
      </div>
      <div id={exerciseId} className="favorites-exercise-row d-flex justify-content-between align-items-center mb-5">
        <a className="w-75 text-decoration-none text-dark"
          href={`#favoritesExercise?exerciseId=${exerciseId}`}
          onClick={()=>props.previousHash(window.location.hash)}>
          <div className="row row-exercise m-0">
            <button className="h4 exercise-name">{name}</button>
          </div>
        </a>
        <label className="fas fa-plus favs-add" htmlFor={`check${exerciseId}`} style={{transform: "rotate(0deg)"}}></label>
        <input id={`check${exerciseId}`}
           className="d-none"
           type="checkbox"
           onClick={props.handleClick}
           onChange={props.handleChange} />
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
    <div className="modal fade" id={`staticBackdrop1`} data-backdrop="static" data-keyboard="false" aria-labelledby={`staticBackdrop1Label`} aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header m-0 align-items-center">
            <div className="modal-title" id={`staticBackdrop1Label`}>
              <h4 className="">Cancel?</h4>
            </div>
            <div className="modal-icons d-flex align-items-center">
              <i className="fas fa-hand-point-left" data-dismiss="modal" aria-label="Close"></i>
              <i className="fas fa-thumbs-up" data-dismiss="modal" aria-label="Close" onClick={props.handlePreviousPage}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ModalStaticValidate(props) {
  return (
    <div className="modal fade" id={`staticBackdrop2`} data-backdrop="static" data-keyboard="false" aria-labelledby={`staticBackdrop2Label`} aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header m-0 align-items-center">
            <div className="modal-title" id={`staticBackdrop2Label`}>
              <h4 className="">Finalize</h4>
              <h4 className="">Selections?</h4>
            </div>
            <div className="modal-icons d-flex align-items-center">
              <i className="fas fa-hand-point-left validate-modal" data-dismiss="modal" aria-label="Close"></i>
              <i className="fas fa-thumbs-up validate-modal" data-dismiss="modal" aria-label="Close" onClick={props.handlePreviousPage}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
