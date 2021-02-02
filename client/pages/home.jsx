import React from "react"

export default class Home extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="container">
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
    )
  }
}
