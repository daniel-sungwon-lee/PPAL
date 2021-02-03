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
      {/*
        <ol className="carousel-indicators">
          {
            props.images.map(img=>{
              let classN = "bg-dark"
              if(props.images.indexOf(img)===0){
                classN= "active bg-dark"
              }
              return (
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className={classN} key={img.id}></li>
              )
            })
          }
        </ol>*/
      }
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

export default class ExerciseDetail extends React.Component{
  constructor(props){
    super(props)
    this.state={
      exercise: null,
      loading:true
    }
    this.data={
      exerciseId: this.props.exerciseId
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
        this.setState({exercise: new Array(data), loading: false})
      })
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
                          : <div className="placeholder-img"><img src="https://www.acendas.com/wp-content/uploads/2015/01/200x200-white-placeholder.png" alt="Placeholder Image" width="200"/></div>
                      }
                    </div>
                    <i className="fas fa-star star-icon"></i>
                    <div className="description">
                      <p>{exercise.description.replace(/(<([^>]+)>)/gi, "")}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="link">
                      <a href={`https://www.google.com/search?q=${exercise.name}`} target="_blank" className="text-decoration-none link">{`Click here to search for ${exercise.name}`}</a>
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
