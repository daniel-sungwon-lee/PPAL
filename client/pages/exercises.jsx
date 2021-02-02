import React from "react"

const chest = "https://wger.de/api/v2/exerciseinfo/?language=2&category=11&limit=29"
const back = "https://wger.de/api/v2/exerciseinfo/?language=2&category=12&limit=38"
const biceps = "https://wger.de/api/v2/exerciseinfo/?language=2&category=8&muscles=1&limit=15"
const triceps = "https://wger.de/api/v2/exerciseinfo/?language=2&category=8&muscles=5&limit=21"
const shoulders = "https://wger.de/api/v2/exerciseinfo/?language=2&category=13&limit=33"
const legs = "https://wger.de/api/v2/exerciseinfo/?language=2&category=9&limit=50"
const abs = "https://wger.de/api/v2/exerciseinfo/?language=2&category=10&limit=28"

export default class Exercises extends React.Component{
  constructor(props){
    super(props)
    this.state={
      exercises:[], mounted: false
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

    switch (this.props.exercise){
      case "Chest":
        fetch(chest, init)
          .then(res => res.json())
          .then(data => {
            let { results } = data
            this.setState({ exercises: results })
          })
          .catch(err => console.error(err))
        break

      case "Back":
        fetch(back,init)
          .then(res => res.json())
          .then(data => {
            let { results } = data
            this.setState({ exercises: results })
          })
          .catch(err => console.error(err))
        break

      case "Biceps":
        fetch(biceps, init)
          .then(res => res.json())
          .then(data => {
            let { results } = data
            this.setState({ exercises: results })
          })
          .catch(err => console.error(err))

        setTimeout(() => {
          fetch("https://wger.de/api/v2/exerciseinfo/?language=2&category=8&muscles=13", init)
            .then(res => res.json())
            .then(data => {
              let { results } = data
              const id = [275, 193]
              const brachialis = results.filter(exercise => {
                return id.includes(exercise.id)
              })
              this.setState({ exercises: [...this.state.exercises, ...brachialis] })
            })
            .catch(err => console.error(err))
        }, 2000)
        break

      case "Triceps":
        fetch(triceps, init)
          .then(res => res.json())
          .then(data => {
            let { results } = data
            this.setState({ exercises: results })
          })
          .catch(err => console.error(err))

        setTimeout(() => {
          fetch("https://wger.de/api/v2/exerciseinfo/361", init)
            .then(res => res.json())
            .then(result => {
              this.setState({ exercises: [...this.state.exercises, result] })
            })
        }, 2000)
        break

      case "Shoulders":
        fetch(shoulders, init)
          .then(res => res.json())
          .then(data => {
            let { results } = data
            this.setState({ exercises: results })
          })
          .catch(err => console.error(err))
        break

      case "Legs" :
        fetch(legs, init)
          .then(res => res.json())
          .then(data => {
            let { results } = data
            this.setState({ exercises: results })
          })
          .catch(err => console.error(err))

        setTimeout(() => {
          fetch("https://wger.de/api/v2/exerciseinfo/?language=2&category=14", init)
            .then(res => res.json())
            .then(calves => {
              let { results } = calves
              this.setState({ exercises: [...this.state.exercises, ...results] })
            })
        }, 2000)
        break

      case "Abs":
        fetch(abs, init)
          .then(res => res.json())
          .then(data => {
            let { results } = data
            this.setState({ exercises: results })
          })
          .catch(err => console.error(err))
        break
    }
  }

  componentWillUnmount(){
    //this.setState({mounted: false})//
  }

  render(){
    return (
      <div className="container w-75">
        {
          this.state.exercises.map(exercise=>{
            return (
              <a className="text-decoration-none text-dark" key={exercise.id} href="">
                <div className="row row-exercise w-100">
                  <button className="h4 exercise-name">{exercise.name}</button>
                </div>
              </a>
            )
          })
        }
      </div>
    )
  }
}


<div className="spinnerDiv">
  <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>
  </div>
</div>
