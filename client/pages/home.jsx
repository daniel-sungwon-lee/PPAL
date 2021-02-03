import React from "react"

export default class Home extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <>
      <div className="container home-container">
      <h2 className="text-center header">HOME</h2>
        {
          this.props.types.map(type=>{
            return (
            <div key={type} className="row">
              <div className="button-outline">
                <a href={`#${type}`}><button className="type-button">{type}</button></a>
              </div>
            </div>
            )
          })
        }
      </div>
      </>
    )
  }
}
