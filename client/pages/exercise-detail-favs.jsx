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

export default class ExerciseFav extends React.Component{
  constructor(props){
    super(props)
    this.state={
       exercise: [],
       loading: true
      }
    this.data={exerciseId: this.props.exerciseId}

    this.handleRepsUp = this.handleRepsUp.bind(this)
    this.handleSetsUp = this.handleSetsUp.bind(this)
    this.handleRepsDown = this.handleRepsDown.bind(this)
    this.handleSetsDown = this.handleSetsDown.bind(this)

  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/favorites/${this.data.exerciseId}`)
      .then(res=>res.json())
      .then(data=>{
        this.setState({exercise : data})
      })

    const init = {
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Authorization": " Token 18800a66e3917105259880660857894f85fbb0f3"
      }
    }

    fetch(`https://wger.de/api/v2/exerciseinfo/${this.data.exerciseId}`, init)
      .then(res => res.json())
      .then(data => {
        this.setState({ exercise: Object.assign(this.state.exercise[0], data), loading: false })
      })
  }

  handleRepsUp(event) {
    this.setState({ exercise: this.state.exercise[0].reps + 1 })
  }

  handleSetsUp(event) {
    this.setState({ exercise: this.state.exercise[0].sets + 1 })
  }

  handleRepsDown(event) {
    if (this.state.exercise[0].reps > 0) {
      this.setState({ exercise: this.state.exercise[0].reps - 1 })
    }
  }

  handleSetsDown(event) {
    if (this.state.exercise[0].sets > 0) {
      this.setState({ exercise: this.state.exercise[0].sets - 1 })
    }
  }

  render(){
    return (
      <>
        {
          this.state.loading
            ? <Spinner />
            : this.state.exercise.map(exercise => {
              return (
                <div className="container single-exercise" key={exercise.id}>
                  <h2 className="header text-center">{exercise.name}</h2>
                  <div className="row row-exercise-single">
                    <div className="img-div">
                      {
                        exercise.images !== undefined && exercise.images.length !== 0
                          ? <Carousel images={exercise.images} />
                          : <div className="placeholder-img-div"><i className="fas fa-images"></i></div>
                      }
                    </div>
                    <i className="fas fa-star star-icon" style="color: #FFEE59"></i>
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
                        <h4 className="m-0">Sets</h4>
                        <div className="sort d-flex flex-column ml-4">
                          <i className="fas fa-caret-up" onClick={this.handleSetsUp}></i>
                          <i className="fas fa-caret-down" onClick={this.handleSetsDown}></i>
                        </div>
                      </div>
                      <h4 className="num">{exercise.sets}</h4>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <div className="sets d-flex align-items-center">
                        <h4 className="m-0">Reps</h4>
                        <div className="sort d-flex flex-column ml-4">
                          <i className="fas fa-caret-up" onClick={this.handleRepsUp}></i>
                          <i className="fas fa-caret-down" onClick={this.handleRepsDown}></i>
                        </div>
                      </div>
                      <h4 className="num">{exercise.reps}</h4>
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
