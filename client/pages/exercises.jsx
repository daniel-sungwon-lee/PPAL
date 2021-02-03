import React from "react"

const apiURLParts = {
  chest: {
    category: 11,
    limit: 29
  },
  back: {
    category: 12,
    limit: 38
  },
  biceps: {
    category: 8,
    limit: 15,
    muscles: 1
  },
  triceps: {
    category: 8,
    limit: 21,
    muscles: 5
  },
  shoulders: {
    category: 13,
    limit: 33
  },
  legs: {
    category: 9,
    limit: 50
  },
  abs: {
    category: 10,
    limit:28
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

export default class Exercises extends React.Component{
  constructor(props){
    super(props)
    this.state={
      exercises:[], loading: true
    }
  }

  componentDidMount(){
    const {exercise} = this.props
    const ex = exercise.toLowerCase()

    if(apiURLParts[ex]){
      const {category, limit, muscles} = apiURLParts[ex]
      const apiURL = `https://wger.de/api/v2/exerciseinfo/?language=2&category=${category}&limit=${limit}${muscles ? `&muscles=${muscles}` : ""}`

      const init = {
        "method": "GET",
        "headers": {
          "Accept": "application/json",
          "Authorization": " Token 18800a66e3917105259880660857894f85fbb0f3"
        }
      }

      fetch(apiURL, init)
        .then(res => res.json())
        .then(data => {
          let { results } = data
          this.setState({ exercises: results })
          this.setState({ loading: false })
        })
        .catch(err => console.error(err))
    }
  }

  render(){
    return (
      <>
      {
        this.state.loading
          ? <Spinner />
          : <div className="container exercises-container d-flex flex-column">
              <h2 className="text-center header">{this.props.exercise}</h2>
              <div className="m-auto w-75">
                {
                  this.state.exercises.map(exercise => {
                    return (
                      <a className="text-decoration-none text-dark"
                      key={exercise.id}
                      href={`#exercise?exerciseId=${exercise.id}`}>
                        <div className="row row-exercise w-100">
                          <button className="h4 exercise-name">{exercise.name}</button>
                        </div>
                      </a>
                    )
                  })
                }
              </div>
            </div>
      }
      </>
    )
  }
}
