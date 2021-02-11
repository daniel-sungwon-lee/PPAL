import React from "react"
import Spinner from "../components/spinner"

export default class Quote extends React.Component{
  constructor(props){
    super(props)
    this.state={
      quote:"" ,
      author:"",
      loading: true,
      num: 1
    }
    this.handleClick=this.handleClick.bind(this)
  }

  componentDidMount(){
    fetch("https://favqs.com/api/qotd")
      .then(res => res.json())
      .then(data => {
        let { quote } = data
        let { author, body } = quote
        this.setState({quote: body, author: author, loading: false})
      })
      .catch(err => console.error(err))
  }

  handleClick(event){
    event.target.style.transform = `rotate(${this.state.num}turn)`
    this.setState({num: this.state.num+1})

    this.setState({loading:true})
    fetch("https://favqs.com/api/qotd")
      .then(res => res.json())
      .then(data => {
        let { quote } = data
        let { author, body } = quote
        this.setState({ quote: body, author: author, loading: false })
      })
      .catch(err => console.error(err))
  }

  render(){
    return (
        <div className="container single-exercise">
          <h2 className="text-center header">Quote</h2>
          <div className="row row-exercise-single row-quote">
            {
              this.state.loading
                ? <Spinner />
                : <div className="quote">
                    <h4>{this.state.quote}</h4>
                    <h5>{`-${this.state.author}`}</h5>
                  </div>
            }
          </div>
          <div className="row">
            <i className="fas fa-redo-alt" onClick={this.handleClick}></i>
          </div>
        </div>
    )
  }
}
