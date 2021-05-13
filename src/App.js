import Routes from "./Routes"
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import './App.css';

const browserHistory = createBrowserHistory();

function App() {
  return (
    <Router history={browserHistory}>
      <Routes/>
    </Router>
  );
}

export default App;
