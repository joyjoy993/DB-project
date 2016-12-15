import React, {Component} from 'react';
import {Navbar, Nav, NavItem, FormGroup, FormControl, Button} from 'react-bootstrap';
import {navbarStyles as styles} from '../styles/navbar.style.js';
import {fetchCurrentUser} from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';

class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.props.fetchCurrentUser();
        this.state = {
            keyword: null
        };
    }

    search() {
        browserHistory.push('/search/keyword/'+this.state.keyword);
        window.location.reload();
    }

    render() {
        return (
            <Navbar inverse style={styles.navbar}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href={window.location.origin + "/recipes/"} style={styles.navLabel}>Recipe Listing page</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form pullRight style={styles.navLinks}>
                        <FormGroup>
                            <FormControl type="text" placeholder="Search" onChange={e => this.setState({ keyword: e.target.value })} />
                        </FormGroup>
                        {' '}
                        <Button onClick={this.search.bind(this)}>Search</Button>
                    </Navbar.Form>
                </Navbar.Collapse>
                <Navbar.Collapse>
                    {this.props.user ?
                        <Nav pullRight style={styles.navLinks}>
                            <NavItem eventKey={1} href="/profile/">{this.props.user.uname + "'s Dashboard"}</NavItem>
                            <NavItem eventKey={2} href={window.location.origin + "/logout/"}>Logout</NavItem>
                        </Nav>
                        :
                        <Nav pullRight style={styles.navLinks}>
                            <NavItem eventKey={1} href={window.location.origin + "/login/"}>Login</NavItem>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchCurrentUser: fetchCurrentUser,
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);