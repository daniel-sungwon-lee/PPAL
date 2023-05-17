import React from 'react';
import Spinner from '../components/spinner';
import Fade from 'react-reveal/Fade';
import { scroller } from 'react-scroll';

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
    limit: 28
  }
};

export default class Exercises extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [], loading: true
    };
  }

  componentDidMount() {
    const { exercise } = this.props;
    const ex = exercise.toLowerCase();

    if (apiURLParts[ex]) {
      const { category, limit, muscles } = apiURLParts[ex];
      const apiURL = `https://wger.de/api/v2/exerciseinfo/?language=2&category=${category}&limit=${limit}${muscles ? `&muscles=${muscles}` : ''}`;

      const init = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: ' Token 18800a66e3917105259880660857894f85fbb0f3'
        }
      };

      fetch(apiURL, init)
        .then(res => res.json())
        .then(data => {
          const { results } = data;
          this.setState({ exercises: results });
          this.setState({ loading: false });

          if (this.props.previousExId) {
            scroller.scrollTo(this.props.previousExId, {
              duration: 1000,
              smooth: true,
              delay: 0,
              offset: -164
            });
          }
        })
        .catch(() => location.reload());
    }
  }

  render() {
    return (
      <>
      {
        this.state.loading
          ? <Spinner />
          : <div className="container exercises-container d-flex flex-column">
              <div className="header d-flex justify-content-between align-items-center">
                <i className="fas fa-arrow-left invisible"></i>
                <h2 className="m-0">{this.props.exercise}</h2>
                <a className="text-dark" href="#" onClick={() => this.props.previousExerciseId(null)}>
                  <i className="fas fa-arrow-left"></i>
                </a>
              </div>
              <div className="m-auto w-75">
                <Fade bottom>
                  {
                    this.state.exercises.map(exercise => {
                      return (
                        <Exercise key={exercise.id} exercise={exercise} previousHash={this.props.previousHash} />
                      );
                    })
                  }
                </Fade>
              </div>
            </div>
      }
      </>
    );
  }
}

function Exercise(props) {
  const { id, name } = props.exercise;
  return (
    <a className="text-decoration-none text-dark"
      href={`#exercise?exerciseId=${id}`}
      onClick={() => props.previousHash(window.location.hash)}>
      <div id={id} className="row row-exercise w-100">
        <button className="h4 exercise-name">{name}</button>
      </div>
    </a>
  );
}
