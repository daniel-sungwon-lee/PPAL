import React from 'react';
import Home from './pages/home';
import Nav from './components/nav';
import { parseRoute, decodeToken } from './lib';
import Exercises from './pages/exercises';
import ExerciseDetail from './pages/exercise-detail';
import Favorites from './pages/favorites';
import ExerciseFav from './pages/exercise-detail-favs';
import Routines from './pages/routines';
import RoutineForm from './pages/routine-form';
import RoutineDetail from './pages/routine-detail';
import AddFavorites from './pages/favorites-add';
import Stopwatch from './pages/stopwatch';
import Login from './pages/login';
import SignUp from './pages/sign-up';
import Spinner from './components/spinner';
import Quote from './pages/quote';

const types = [
  { name: 'Chest', id: 1 },
  { name: 'Back', id: 2 },
  { name: 'Biceps', id: 3 },
  { name: 'Triceps', id: 4 },
  { name: 'Shoulders', id: 5 },
  { name: 'Legs', id: 6 },
  { name: 'Abs', id: 7 }
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      previousHash: null,
      user: null,
      authorizing: true,
      previousExerciseId: null
    };
    this.previousHash = this.previousHash.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.previousExerciseId = this.previousExerciseId.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    const token = window.localStorage.getItem('userToken');
    const user = token
      ? decodeToken(token)
      : null;
    this.setState({ user, authorizing: false });
  }

  previousHash(hash) {
    this.setState({ previousHash: hash });
  }

  handleLogin(result) {
    const { user, token } = result;

    this.setState({ user });
    window.localStorage.setItem('userToken', token);
    window.location.hash = '#';
  }

  handleLogout() {
    window.localStorage.removeItem('userToken');
    this.setState({ user: null });
  }

  previousExerciseId(id) {
    this.setState({ previousExerciseId: id });
  }

  renderPage() {
    const { route, user } = this.state;

    if (user === null) {
      if (route.path === 'login') {
        return <Login handleLogin={this.handleLogin} />;
      } else if (route.path === 'signUp') {
        return <SignUp />;
      } else {
        window.location.hash = '#login';
      }

    } else {
      const { userId } = user;

      if (window.location.hash === '#login' || window.location.hash === '#signUp') {
        window.location.hash = '#';
      }

      if (route.path === '') {
        return <Home types={types} />;
      }

      const typeNames = types.map(type => {
        return type.name;
      });
      if (typeNames.includes(route.path)) {
        return <Exercises exercise={route.path} previousHash={this.previousHash}
                previousExId={this.state.previousExerciseId} />;
      }

      if (route.path === 'exercise') {
        const exerciseId = route.params.get('exerciseId');

        return <ExerciseDetail exerciseId={exerciseId} userId={userId}
                previousHash={this.state.previousHash} previousExerciseId={this.previousExerciseId} />;
      }

      if (route.path === 'favorites') {
        return <Favorites userId={userId} types={types} previousHash={this.previousHash}
                previousExId={this.state.previousExerciseId} />;
      }

      if (route.path === 'favoritesExercise') {
        const exerciseId = route.params.get('exerciseId');

        return <ExerciseFav userId={userId} exerciseId={exerciseId}
                previousHash={this.state.previousHash} previousExerciseId={this.previousExerciseId} />;
      }

      if (route.path === 'routines') {
        return <Routines userId={userId} />;
      }

      if (route.path === 'routineForm') {
        const type = route.params.get('formType');
        const routineId = route.params.get('routineId');

        return <RoutineForm userId={userId} type={type} routineId={routineId} />;
      }

      if (route.path === 'routine') {
        const routineId = route.params.get('routineId');

        return <RoutineDetail userId={userId} routineId={routineId} previousHash={this.previousHash}
                previousExId={this.state.previousExerciseId} />;
      }

      if (route.path === 'favoritesAdd') {
        const routineId = route.params.get('routineId');
        const routineName = route.params.get('routineName');

        return <AddFavorites routineId={routineId} routineName={routineName}
                userId={userId} previousHash={this.previousHash} types={types} previousExId={this.state.previousExerciseId} />;
      }

      if (route.path === 'stopwatch') {
        return <Stopwatch />;
      }

      if (route.path === 'quote') {
        return <Quote />;
      }
    }
  }

  render() {
    if (this.state.authorizing) {
      return <Spinner />;
    }
    return (
      <>
        <Nav user={this.state.user} handleLogout={this.handleLogout} />
        {this.renderPage()}
      </>
    );
  }
}
