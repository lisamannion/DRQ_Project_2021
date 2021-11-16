import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Content } from './components/content';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Read } from './components/read';
import { Create } from './components/create';
import { Edit } from './components/edit';

// App's class itself
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          {/* Navigation bar for Web page using react rooting - reflected in the URL */}
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/read">Read</Nav.Link>
              <Nav.Link href="/create">Create</Nav.Link>
            </Nav>
          </Navbar>

          <br />

          {/* Tab on the navbar are routed to different components using Switch eg. Home tab on the navbar is showing the Content component */}
          <Switch>
            <Route path='/' component={Content} exact />
            <Route path='/read' component={Read} />
            <Route path='/create' component={Create} />
            {/* Setting up the edit route with id parameter which was changed using button in app.js and Link tag */}
            <Route path='/edit/:id' component={Edit} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
