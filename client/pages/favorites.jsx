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

export default class Favorites extends React.Component{
  constructor(props){
    super(props)
    this.state={favorites: [], loading: true}
    this.handleTrash=this.handleTrash.bind(this)
  }

  componentDidMount(){
    fetch("http://localhost:3000/api/favorites")
      .then(res=>res.json())
      .then(data=>{
        this.setState({favorites: data, loading: false})
      })

  }

  handleTrash(event){
    fetch(`http://localhost:3000/api/favorites/${exerciseId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
      })
        .then(exercise=>{
          this.setState({isFavorites: false})
        })
  }

  render(){
    if(this.state.loading){
      return (
        <Spinner />
      )
    } else{
      return (
        <div className="container">
          <div className="header d-flex justify-content-between align-items-center">
            <i className="fas fa-plus invisible"></i>
            <h2 className="text-uppercase m-0">Favorites</h2>
            <a className="text-dark" href="#"><i className="fas fa-plus"></i></a>
          </div>
          <>
          {
            this.state.favorites.map(exercise=>{
              return (
                <>
                <div className="d-flex justify-content-start mb-3">
                  <div className="type-header d-flex align-items-center justify-content-center">
                    <div className="w-100">
                      <h3 className="m-0 pl-4">{exercise.type}</h3>
                    </div>
                  </div>
                </div>
                <div key={exercise.exerciseId} className="favorites-exercise-row d-flex justify-content-between align-items-center mb-5">
                  <a className="w-75 text-decoration-none text-dark"
                     href={`#favoritesExercise?exerciseId=${exercise.exerciseId}`}>
                    <div className="row row-exercise m-0">
                      <button className="h4 exercise-name">{exercise.name}</button>
                    </div>
                  </a>
                  <i className="fas fa-trash" onClick={this.handleTrash}></i>
                </div>
                </>
              )
            })
          }
          </>
        </div>
      )
    }
  }
}
