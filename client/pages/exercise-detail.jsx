import React from 'react';
import Spinner from '../components/spinner';
import Zoom from 'react-reveal/Zoom';

export default class ExerciseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercise: null,
      loading: true,
      reps: 0,
      sets: 0
    };
    this.data = {
      userId: this.props.userId,
      exerciseId: this.props.exerciseId,
      message: 'Saved to Favorites!'
    };
    this.handleStarClick = this.handleStarClick.bind(this);
    this.handleRepsUp = this.handleRepsUp.bind(this);
    this.handleSetsUp = this.handleSetsUp.bind(this);
    this.handleRepsDown = this.handleRepsDown.bind(this);
    this.handleSetsDown = this.handleSetsDown.bind(this);
  }

  componentDidMount() {
    // const init = {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     Authorization: ' Token 18800a66e3917105259880660857894f85fbb0f3'
    //   }
    // };

    fetch(`https://wger.de/api/v2/exerciseinfo/${this.data.exerciseId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ exercise: new Array(data), loading: false });
      })
      .catch(() => location.reload());
  }

  handleStarClick(event) {
    const [exercise] = this.state.exercise;

    const userId = this.data.userId;
    const exerciseId = exercise.id;
    const name = exercise.name;

    let type = null;
    const muscleIdArr = exercise.muscles.map(muscle => {
      return muscle.id;
    });
    if (exercise.category.id === 8 && muscleIdArr.includes(1)) {
      type = 'Biceps';
    } else if (exercise.category.id === 8 && muscleIdArr.includes(5)) {
      type = 'Triceps';
    } else {
      type = exercise.category.name;
    }

    const reps = this.state.reps;
    const sets = this.state.sets;

    const favExercise = {
      exerciseId, name, type, reps, sets, userId
    };

    fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(favExercise)
    })
      .catch(() => location.reload());

    // star icon changes color depending on if it saved or not,
    // and can be removed (do later)
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

  render() {
    return (
      <>
        {
          this.state.loading
            ? <Spinner />
            : this.state.exercise.map(exercise => {
              return (
                <SingleExercise key={exercise.id}
                exercise={exercise}
                handleStarClick={this.handleStarClick}
                handleRepsUp={this.handleRepsUp}
                handleRepsDown={this.handleRepsDown}
                handleSetsUp={this.handleSetsUp}
                handleSetsDown={this.handleSetsDown}
                state={this.state}
                data={this.data}
                previousHash={this.props.previousHash}
                previousExerciseId={this.props.previousExerciseId} />
              );
            })
        }
      </>
    );
  }
}

function SingleExercise(props) {
  const { id, name, images, description } = props.exercise;

  return (
    <div className="container single-exercise">
      <Modal message={props.data.message} />
      <Zoom>
        <div className="header d-flex justify-content-between align-items-center header-packed">
          <i className="fas fa-times invisible"></i>
          <h2 className="text-center m-0 mx-2 text-break">{name}</h2>
          <a className="text-dark" href={props.previousHash} onClick={() => props.previousExerciseId(id)}><i className="fas fa-times"></i></a>
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
            <i className="fas fa-star star-icon" data-toggle="modal" data-target="#saveModal" onClick={props.handleStarClick} style={{ color: props.data.starColor }}></i>
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

function Modal(props) {
  return (
    <div className="modal fade" id="saveModal" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="exampleModalLabel">{props.message}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
