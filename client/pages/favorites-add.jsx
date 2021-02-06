import React from "react"

export default class AddFavorites extends React.Component{
  constructor(props){
    super(props)
    this.state={
      favorites: [],
      loading: true,
      classN: "fas fa-ban invisible",
      modalNum: 1
    }
    this.data={
      routineId: this.props.routineId,
      routineName: this.props.routineName,
      message: "Cancel?",
    }
    this.handleCancel=this.handleCancel.bind(this)
    this.handleClickPlus=this.handleClickPlus.bind(this)
    this.handleClickTimes=this.handleClickTimes.bind(this)
  }

  componentDidMount(){
    fetch("/api/favorites")
      .then(res=>res.json())
      .then(favorites=>{
        this.setState({favorites : favorites, loading: false})
      })
  }

  handleCancel(){
    window.location.hash=`#routine?routineId=${this.data.routineId}`
  }

  handleClickPlus(exerciseId){
    this.setState({classN: "fas fa-check"})
    console.log(exerciseId)
  }

  handleClickTimes(){
    this.setState({classN: "fas fa-ban invisible"})
  }

  render(){
    return (
      this.state.loading
        ? <Spinner />
        : <div className="container">
            <ModalStatic handleCancel={this.handleCancel} modalNum={this.state.modalNum} message={this.data.message} />
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
                    handleClickPlus={()=>this.handleClickPlus(exercise.exerciseId)}
                    handleClickTimes={()=>this.handleClickTimes(exercise.exerciseId)} />
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
          href={`#favoritesExercise?exerciseId=${exerciseId}`}>
          <div className="row row-exercise m-0">
            <button className="h4 exercise-name">{name}</button>
          </div>
        </a>
        <i className="fas fa-plus favs-add" onClick={props.handleClickPlus}></i>
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
    <div className="modal fade" id={`staticBackdrop${props.modalNum}`} data-backdrop="static" data-keyboard="false" aria-labelledby={`staticBackdrop${props.modalNum}Label`} aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header m-0 align-items-center">
            <div className="modal-title" id={`staticBackdrop${props.modalNum}Label`}>
              <h4 className="">{props.message}</h4>
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
