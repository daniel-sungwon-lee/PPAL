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

/*function Carousel(props){
  return(
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      </ol>
      <div className="carousel-inner">
        {
          props.images.map(img=>{
            return (
              <div className="carousel-item active">
                <img src={img.image} className="d-block" alt="Exercise Image"/>
              </div>
            )
          })
        }
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  )
}*/

export default class ExerciseDetail extends React.Component{
  constructor(props){
    super(props)
    this.state={
      exercise:null,
      loading:true
    }
    this.data={
      exerciseId: this.props.exerciseData.exerciseId,
      exerciseName: this.props.exerciseData.exerciseName
    }
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
        this.setState({exercise: data, loading: false})
      })
  }

  render(){
    return (
      <>
        {
          this.state.loading
            ? <Spinner />
            : ()=>{
              return (
                <div className="container">
                  <h2 className="header">{this.data.exerciseName}</h2>
                  <div className="row row-exercise">
                    <div className="imgDiv">
                      {/*
                        this.state.exercise.images !==undefined && this.state.exercise.images.length !==0
                          ? <Carousel images={this.state.exercise.images} />
                          : <img src="/placeholder.png" alt="Placeholder Image" width="200"/>
                      */}
                    </div>
                    <i className="fas fa-star"></i>
                    <div className="description">
                      <p>{this.state.exercise.description.replace(/(<([^>]+)>)/gi, "")}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="link">
                      <a href={`https://www.google.com/search?q=${this.state.exercise.name}`} target="_blank">{`Click here to search for ${this.state.exercise.name}`}</a>
                    </div>
                    <div className="reps-sets">
                      <div className="reps">
                        <h4>Reps</h4>
                        <div className="sort">
                          <i className="fas fa-caret-up"></i>
                          <i className="fas fa-caret-down"></i>
                        </div>
                      </div>
                      <div className="sets">
                        <h4>Sets</h4>
                        <div className="sort">
                          <i className="fas fa-caret-up"></i>
                          <i className="fas fa-caret-down"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
        }
      </>
    )
  }
}
