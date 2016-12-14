import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Form, FormGroup, Col, Button, FormControl, ControlLabel, Checkbox, Tabs, Tab} from 'react-bootstrap';
import axios from 'axios';
import { browserHistory, Link } from 'react-router'
import {styles} from '../styles/card-detail.style.js';
import {Modal} from 'react-bootstrap';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uname: null,
            password: null,
            profile: null,
            login_status: null,
            showModal: true,
            registration_status: null
        };
    }

    login() {
        var MD5 = require("crypto-js/md5");
        console.log(MD5(this.state.password).toString());
        axios.post("/api/v1/authentication/", {
            uname: this.state.uname,
            password: MD5(this.state.password).toString()
        }).then(res => {
            this.setState({login_status: res.status});
        });
    }

    register() {
        var MD5 = require("crypto-js/md5");
        axios.post("/api/v1/registration/", {
            uname: this.state.uname,
            password: MD5(this.state.password).toString(),
            profile: this.state.profile
        }).then(res => {
            this.setState({registration_status: res.status});
        });
    }

    close() {
        this.setState({ showModal: false });
    }

    componentDidUpdate() {
        if (this.state.login_status == 200 || this.state.registration_status == 200) {
            browserHistory.push('/recipes/');
        }
    }

    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close.bind(this)} backdrop="static">
                <Link to="/recipes/">
                    <Modal.Header closeButton onHide={browserHistory.goBack}>
                        <Modal.Title>Recipe Detail</Modal.Title>
                    </Modal.Header>
                </Link>
                <Modal.Body>
                    <Tabs defaultActiveKey={1}>
                        <Tab eventKey={1} title="Login">
                            <Form horizontal>
                                <FormGroup controlId="formHorizontalName">
                                    <Col componentClass={ControlLabel} sm={2}>
                                    uname
                                    </Col>
                                    <Col sm={10}>
                                    <FormControl type="text" placeholder="user name" onChange={e => this.setState({ uname: e.target.value })}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalPassword">
                                    <Col componentClass={ControlLabel} sm={2}>
                                    Password
                                    </Col>
                                    <Col sm={10}>
                                    <FormControl type="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        <Button onClick={this.login.bind(this)}>
                                        Sign in
                                        </Button>
                                    </Col>
                                </FormGroup>
                                {this.state.login_status == 201 ?
                                    <div>
                                        incorrected user name or password!
                                    </div>
                                :
                                    <div>
                                    </div>
                                }
                            </Form>
                        </Tab>
                        <Tab eventKey={2} title="Register">
                            <Form horizontal>
                                <FormGroup controlId="formHorizontalName">
                                    <Col componentClass={ControlLabel} sm={2}>
                                    uname
                                    </Col>
                                    <Col sm={10}>
                                    <FormControl type="text" placeholder="user name" onChange={e => this.setState({ uname: e.target.value })}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalPassword">
                                    <Col componentClass={ControlLabel} sm={2}>
                                    Password
                                    </Col>
                                    <Col sm={10}>
                                    <FormControl type="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalName">
                                    <Col componentClass={ControlLabel} sm={2}>
                                    profile
                                    </Col>
                                    <Col sm={10}>
                                    <FormControl type="text" placeholder="profile" onChange={e => this.setState({ profile: e.target.value })}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        <Button onClick={this.register.bind(this)}>
                                        Register
                                        </Button>
                                    </Col>
                                </FormGroup>
                                {this.state.registration_status == 201 ?
                                    <div>
                                        user existed!
                                    </div>
                                :
                                    <div>
                                    </div>
                                }
                            </Form>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>

        );
    }
}

export default Login;