import Container from 'react-bootstrap/Container';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import React from 'react';

interface IState {
  currentUser: any,
  users: any[]
}

class App extends React.Component<any,IState> {
  constructor(props: any) {
      super(props);

      this.state = {
          currentUser: null,
          users: []
      };
  }

  componentDidMount() {
      this.getUsers().then(users => this.setState({ users }));
  }

  goToLogin() {
    window.location.replace(`${process.env.REACT_APP_BACKEND_URL}/auth/google`)
  }

  getUsers() {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`, { withCredentials: true }).then(res => res.data)
  }

  render(){
    return(    
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  {
                    this.state.users.length > 0 &&
                    <div>
                      <h2>Usuários cadastrados</h2>
                      <section className='pt-5'>
                      {this.state.users.map(user =>
                          <Card key={user.id} className='my-3' bg='light'>
                            <Card.Body>
                              <Card.Title><span className="text-black">Usuário: {user.username}</span></Card.Title>
                              <Card.Text><span className="text-black">Email: {user.email}</span></Card.Text>
                            </Card.Body>
                          </Card>
                      )}
                      </section>
                    </div>
                  }
                  {
                    !(this.state.users.length > 0) &&
                    <div>
                      <hr></hr>
                      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                      <p className="text-white-50 mb-5">Please enter your login and password!</p>

                      <div className="form-outline form-white mb-4">
                        <input type="email" id="typeEmailX" className="form-control form-control-lg" />
                        <label className="form-label">Email</label>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input type="password" id="typePasswordX" className="form-control form-control-lg" />
                        <label className="form-label">Password</label>
                      </div>

                      <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                      <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                      <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <Button onClick={this.goToLogin}><FontAwesomeIcon icon={faGoogle} className="me-2"/>Continue with Google </Button>
                      </div>
                    </div>
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )};
};

export default App;
