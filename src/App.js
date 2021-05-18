import Routes from "./Routes"
import { Router } from 'react-router-dom';
import './App.css';
import { createBrowserHistory } from 'history'

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Routes/>
    </Router>
  );
}

export default App;
