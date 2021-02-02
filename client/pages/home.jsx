import React from "react"

const types = ["Chest", "Back", "Biceps", "Triceps", "Shoulders", "Legs", "Abs"]

export default class Home extends React.Component{
  constructor(props){
    super(props)
    this.state={}
  }

  render(){
    return (
      <div className="container">
        {
          types.map(type=>{
            return (
            <div className="row">
              <div className="button-outline">
                <a href={`#${type}`}><button className="type-button">{type}</button></a>
              </div>
            </div>
            )
          })
        }
      </div>
    )
  }
}
