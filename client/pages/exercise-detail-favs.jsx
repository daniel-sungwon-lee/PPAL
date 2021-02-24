import React from 'react';
import Spinner from '../components/spinner';
import Zoom from 'react-reveal/Zoom';

export default class ExerciseFav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercise: [],
      loading: true,
      reps: 0,
      sets: 0
    };
    this.data = {
      userId: this.props.userId,
      exerciseId: this.props.exerciseId
    };

    this.handleRepsUp = this.handleRepsUp.bind(this);
    this.handleSetsUp = this.handleSetsUp.bind(this);
    this.handleRepsDown = this.handleRepsDown.bind(this);
    this.handleSetsDown = this.handleSetsDown.bind(this);
    this.saveRepsAndSets = this.saveRepsAndSets.bind(this);

  }

  componentDidMount() {
    fetch(`/api/favorites/${this.data.userId}/${this.data.exerciseId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ exercise: data });

        fetch(`https://wger.de/api/v2/exerciseinfo/${this.data.exerciseId}`, init)
          .then(res => res.json())
          .then(data => {
            this.setState({
              exercise: new Array(Object.assign(this.state.exercise[0], data)),
              reps: this.state.exercise[0].reps,
              sets: this.state.exercise[0].sets,
              loading: false
            });
          })
          .catch(() => location.reload());

      })
      .catch(() => location.reload());

    const init = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: ' Token 18800a66e3917105259880660857894f85fbb0f3'
      }
    };
  }

  handleRepsUp(event) {
    this.setState({ reps: this.state.reps + 1 });
  }

  handleSetsUp(event) {
    this.setState({ sets: this.state.sets + 1 });
  }

  handleRepsDown(event) {
    if (this.state.reps > 0) {
      this.setState({ reps: this.state.reps - 1 });
    }
  }

  handleSetsDown(event) {
    if (this.state.sets > 0) {
      this.setState({ sets: this.state.sets - 1 });
    }
  }

  saveRepsAndSets(event) {
    const reqBody = {
      reps: this.state.reps,
      sets: this.state.sets
    };

    fetch(`/api/favorites/${this.data.userId}/${this.data.exerciseId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody)
    })
      .catch(() => location.reload());

  }

  render() {
    return (
      <>
        {
          this.state.loading
            ? <Spinner />
            : this.state.exercise.map(exercise => {
              return (
                <SingleExerciseFav key={exercise.id}
                exercise={exercise}
                saveRepsAndSets={this.saveRepsAndSets}
                handleRepsUp={this.handleRepsUp}
                handleRepsDown={this.handleRepsDown}
                handleSetsUp={this.handleSetsUp}
                handleSetsDown={this.handleSetsDown}
                state={this.state}
                previousHash={this.props.previousHash} />
              );
            })
        }
      </>
    );
  }
}

function SingleExerciseFav(props) {
  const { id, name, images, description } = props.exercise;

  return (
    <div className="container single-exercise">
      <Zoom>
        <div className="header d-flex justify-content-between align-items-center header-packed">
          <i className="fas fa-times invisible"></i>
          <h2 className="text-center m-0 mx-2 text-break">{name}</h2>
          <a className="text-dark" href={props.previousHash} onClick={props.saveRepsAndSets}><i className="fas fa-times"></i></a>
        </div>
        <div className="row row-exercise-single">
          <div className="w-100">
            <div className="img-div">
              {
                images !== undefined && images.length !== 0
                  ? <Carousel key={id} images={images} />
                  : <i className="fas fa-images"></i>
              }
            </div>
            <i className="fas fa-star star-icon" style={{ color: '#FFEE59', cursor: 'default' }}></i>
            <div className="description">
              <p>{description.replace(/(<([^>]+)>)/gi, '')}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="link">
            <a href={`https://www.google.com/search?q=${name} Exercise`} target="_blank" rel="noreferrer"
            className="text-decoration-none link">{`Click here to search for ${name}`}</a>
          </div>
        </div>
        <div className="row justify-content-around">
          <div className="d-flex flex-column align-items-center">
            <div className="reps d-flex align-items-center">
              <h4 className="m-0">Sets</h4>
              <div className="sort d-flex flex-column ml-4">
                <i className="fas fa-caret-up" onClick={props.handleSetsUp}></i>
                <i className="fas fa-caret-down" onClick={props.handleSetsDown}></i>
              </div>
            </div>
            <h4 className="num">{props.state.sets}</h4>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div className="sets d-flex align-items-center">
              <h4 className="m-0">Reps</h4>
              <div className="sort d-flex flex-column ml-4">
                <i className="fas fa-caret-up" onClick={props.handleRepsUp}></i>
                <i className="fas fa-caret-down" onClick={props.handleRepsDown}></i>
              </div>
            </div>
            <h4 className="num">{props.state.reps}</h4>
          </div>
        </div>
      </Zoom>
    </div>
  );
}

function Carousel(props) {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        {
          props.images.map(img => {
            let classN = 'carousel-item';
            if (props.images.indexOf(img) === 0) {
              classN = 'carousel-item active';
            }
            return (
              <CarouselImg key={img.id} img={img.image} classN={classN} />
            );
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
  );
}

function CarouselImg(props) {
  return (
    <div className={props.classN}>
      <img src={props.img} className="d-block exercise-img" alt="Exercise Image" />
    </div>
  );
}
