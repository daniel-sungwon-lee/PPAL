import React from 'react';
import Spinner from '../components/spinner';
import Zoom from 'react-reveal/Zoom';

export default class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      loading: true,
      num: 1
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch('https://quote-garden.herokuapp.com/api/v3/quotes/random')
      .then(res => res.json())
      .then(response => {
        const { data } = response;
        const [obj] = data;
        const { quoteText, quoteAuthor } = obj;

        this.setState({ quote: quoteText, author: quoteAuthor, loading: false });
      })
      .catch(() => location.reload());
  }

  handleClick(event) {
    event.target.style.transform = `rotate(${this.state.num}turn)`;
    this.setState({ num: this.state.num + 1 });

    this.setState({ loading: true });
    fetch('https://quote-garden.onrender.com/api/v3/quotes/random')
      .then(res => res.json())
      .then(response => {
        const { data } = response;
        const [obj] = data;
        const { quoteText, quoteAuthor } = obj;

        this.setState({ quote: quoteText, author: quoteAuthor, loading: false });
      })
      .catch(() => location.reload());
  }

  render() {
    return (
        <div className="container single-exercise">
          <h2 className="text-center header">Quote</h2>
          <Zoom>
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
          </Zoom>
        </div>
    );
  }
}
