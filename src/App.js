import './App.css';
import { Component } from 'react';
import { Home } from './components/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DisplayStallions } from './components/displayStallions';
import { NewStallion } from './components/newStallion';
import { UpdateStallion } from './components/updateStallion';

// App's class itself
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          {/* Navigation bar for Web page using react rooting - reflected in the URL */}
          <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/"><img src='/horse.jpg' alt='Horse Logo' width='70'></img></Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/displayStallions">Stallions</Nav.Link>
              <Nav.Link href="/newStallion">Add Stallion</Nav.Link>
            </Nav>
          </Navbar>

          <br />

          {/* Tab on the navbar are routed to different components using Switch eg. Home tab on the navbar is showing the Content component */}
          <Switch>
            {/* Clientside routing */}
            <Route path='/' component={Home} exact />
            <Route path='/displayStallions' component={DisplayStallions} />
            <Route path='/newStallion' component={NewStallion} />
            {/* Setting up update stallion route with id parameter */}
            <Route path='/update/:id' component={UpdateStallion} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
