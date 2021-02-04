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

function Carousel(props){
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        {
          props.images.map(img=>{
            let classN = "carousel-item"
            if(props.images.indexOf(img)===0){
              classN= "carousel-item active"
            }
            return (
              <div className={classN}>
                <img src={img.image} className="d-block exercise-img" key={img.id} alt="Exercise Image" />
              </div>
            )
          })
        }
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <i className="fas fa-angle-left text-dark" aria-hidden="true"></i>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <i className="fas fa-angle-right text-dark" aria-hidden="true"></i>
        <span className="sr-only">Next</span>
      </a>
    </div>
  )
}

function Modal(props){
  return (
    <div className="modal fade" id="saveModal" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="exampleModalLabel">{props.message}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default class ExerciseDetail extends React.Component{
  constructor(props){
    super(props)
    this.state={
      exercise: null,
      loading:true,
      starClickCounter: 0,
      reps: 0,
      sets: 0,
      isFavorites: false
    }
    this.data={
      exerciseId: this.props.exerciseId,
      starColor: "black",
      message: "Saved to Favorites!"
    }
    this.handleStarClick=this.handleStarClick.bind(this)
    this.handleRepsUp=this.handleRepsUp.bind(this)
    this.handleSetsUp=this.handleSetsUp.bind(this)
    this.handleRepsDown=this.handleRepsDown.bind(this)
    this.handleSetsDown=this.handleSetsDown.bind(this)
  }

  componentDidMount(){
    const init = {
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Authorization": " Token 18800a66e3917105259880660857894f85fbb0f3"
      }
    }

    fetch(`https://wger.de/api/v2/exerciseinfo/${this.data.exerciseId}`, init)
      .then(res=>res.json())
      .then(data=>{
        this.setState({exercise: new Array(data), loading: false})
      })
  }

  handleStarClick(event){
    const [exercise] = this.state.exercise

    const exerciseId = exercise.id
    const name = exercise.name

    const type = exercise.category.name
    //below is me trying to attempt to get the specific muscle type
    /*const muscleIdArr = exercise.muscles.map(muscle => {
      return muscle.id
    })
    if (exercise.category.id === 8 && muscleIdArr.includes(1)) {
      const type = "Biceps"
    } else if (exercise.category.id === 8 && muscleIdArr.includes(5)) {
      const type = "Triceps"
    } else {
      const type = exercise.category.name
    }*/

    let reps= this.state.reps
    let sets = this.state.sets

    //admin userId
    const userId = 1

    const favExercise = {
      exerciseId, name, type, reps, sets, userId
    }

    if (!this.state.isFavorites){
      fetch("http://localhost:3000/api/favorites", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(favExercise)
      })
        .then(exercise=>{
          this.setState({isFavorites: true})
        })
    } else if (this.state.isFavorites){
      fetch(`http://localhost:3000/api/favorites/${exerciseId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
      })
        .then(exercise=>{
          this.setState({isFavorites: false})
        })
    }

    this.setState({starClickCounter: this.state.starClickCounter+1})

    if(this.state.starClickCounter % 2===0){
      this.data.starColor="#FFEE59"
      this.data.message="Saved to Favorites!"
    }else{
      this.data.starColor="black"
      this.data.message="Removed from Favorites!"
    }
  }

  handleRepsUp(event){
    this.setState({reps: this.state.reps +1})
  }

  handleSetsUp(event){
    this.setState({sets: this.state.sets +1})
  }

  handleRepsDown(event){
    if(this.state.reps>0){
      this.setState({reps: this.state.reps -1})
    }
  }

  handleSetsDown(event){
    if (this.state.sets > 0) {
      this.setState({ sets: this.state.sets - 1 })
    }
  }

  render(){
    return (
      <>
        {
          this.state.loading
            ? <Spinner />
            : this.state.exercise.map(exercise=>{
              return (
                <div className="container single-exercise" key={exercise.id}>
                  <h2 className="header text-center">{exercise.name}</h2>
                  <div className="row row-exercise-single">
                    <div className="img-div">
                      {
                        exercise.images !==undefined && exercise.images.length !==0
                          ? <Carousel images={exercise.images} />
                          : <div className="placeholder-img-div"><i className="fas fa-images"></i></div>
                      }
                    </div>
                    <i className="fas fa-star star-icon" data-toggle="modal" data-target="#saveModal" onClick={this.handleStarClick} style={{color: this.data.starColor}}></i>
                    <Modal message={this.data.message}/>
                    <div className="description">
                      <p>{exercise.description.replace(/(<([^>]+)>)/gi, "")}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="link">
                      <a href={`https://www.google.com/search?q=${exercise.name}`} target="_blank" className="text-decoration-none link">{`Click here to search for ${exercise.name}`}</a>
                    </div>
                  </div>
                  <div className="row justify-content-around">
                    <div className="d-flex flex-column align-items-center">
                      <div className="reps d-flex align-items-center">
                        <h4 className="m-0">Reps</h4>
                        <div className="sort d-flex flex-column ml-4">
                          <i className="fas fa-caret-up" onClick={this.handleRepsUp}></i>
                          <i className="fas fa-caret-down" onClick={this.handleRepsDown}></i>
                        </div>
                      </div>
                      <h4 className="num">{this.state.reps}</h4>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <div className="sets d-flex align-items-center">
                        <h4 className="m-0">Sets</h4>
                        <div className="sort d-flex flex-column ml-4">
                          <i className="fas fa-caret-up" onClick={this.handleSetsUp}></i>
                          <i className="fas fa-caret-down" onClick={this.handleSetsDown}></i>
                        </div>
                      </div>
                      <h4 className="num">{this.state.sets}</h4>
                    </div>
                  </div>
                </div>
              )
            })
        }
      </>
    )
  }
}
