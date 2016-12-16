import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
import {Link} from 'react-router';
import {Modal, Tab, Col, Row, Nav, NavItem, Panel, PanelGroup, ControlLabel} from 'react-bootstrap';
import Chip from 'material-ui/Chip';
import {cardStyles as styles} from '../styles/recipe-listing-cards.style';
import {Card, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import {List} from 'material-ui/List';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import NavigationBar from '../components/navigation-bar';
import {fetchCurrentUser, fetchGroups, fetchPosts, fetchUserEvents, fetchTagRecommandation} from '../actions/index';
import ProfileDetail from '../components/profile-detail';
import GroupDetail from '../components/group-detail';
import PostDetail from '../components/post-detail';
import RecipePost from '../components/recipe-post';
import GroupCreate from '../components/group-create';
import UserEvents from '../components/user-events';
import { browserHistory } from 'react-router';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.props.fetchUserEvents();
        this.props.fetchCurrentUser();
        this.props.fetchGroups();
        this.props.fetchPosts();
        this.props.fetchTagRecommandation();
    }

    render() {
        return (
            <div style={styles.cards}>
                <NavigationBar />
                <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
                    <Row className="clearfix">
                        <Col sm={4}>
                            <Nav bsStyle="pills" stacked>
                                <NavItem eventKey="profile">
                                Your Profile
                                </NavItem>
                                <NavItem eventKey="groups">
                                Your Groups
                                </NavItem>
                                <NavItem eventKey="creategroup">
                                Create Your Group!
                                </NavItem>
                                <NavItem eventKey="userevents">
                                Your Events
                                </NavItem>
                                <NavItem eventKey="posts">
                                Your Posts
                                </NavItem>
                                <NavItem eventKey="recommand">
                                Some recommanded recipes
                                </NavItem>
                                <NavItem eventKey="getpost">
                                Get Post Now!
                                </NavItem>
                            </Nav>
                        </Col>
                        <Col sm={8}>
                            <Tab.Content animation>
                                <Tab.Pane eventKey="profile">
                                {
                                    this.props.user ?
                                    <ProfileDetail user={this.props.user}/>
                                    :
                                    <CircularProgress size={60} style={{margin: "auto", display: "block"}}/>
                                }
                                </Tab.Pane>

                                <Tab.Pane eventKey="groups">
                                    {
                                        this.props.groups ?
                                        <GroupDetail groups={this.props.groups}/>
                                        :
                                        <CircularProgress size={60} style={{margin: "auto", display: "block"}}/>
                                    }
                                </Tab.Pane>

                                <Tab.Pane eventKey="creategroup">
                                    <GroupCreate/>
                                </Tab.Pane>

                                <Tab.Pane eventKey="userevents">
                                    {
                                        this.props.userevents ?
                                        <UserEvents userevents={this.props.userevents}/>
                                        :
                                        <CircularProgress size={5} style={{margin: "auto", display: "block"}}/>
                                    }
                                </Tab.Pane>

                                <Tab.Pane eventKey="posts">
                                    {
                                        this.props.posts ?
                                        <PostDetail posts={this.props.posts}/>
                                        :
                                        <CircularProgress size={60} style={{margin: "auto", display: "block"}}/>
                                    }
                                </Tab.Pane>

                                <Tab.Pane eventKey="recommand">
                                    {
                                        this.props.tagrecommandation ?
                                        <div>
                                            <div style={styles.wrapper}>
                                                <ControlLabel>Your favorite tags:</ControlLabel>
                                                {this.props.tagrecommandation.tags.map((tag) => {
                                                    return (
                                                        <Chip
                                                            key={tag.tid}
                                                            style={styles.chip}
                                                            onClick={() => {
                                                                browserHistory.push('/search/tag/'+tag.tid);
                                                                window.location.reload();
                                                            }}
                                                            onTouchTap={() => {}}
                                                            >
                                                        {tag.tname}
                                                        </Chip>
                                                    )
                                                })}
                                            </div>
                                            <PostDetail posts={this.props.tagrecommandation.recipes}/>
                                        </div>
                                        :
                                        <CircularProgress size={60} style={{margin: "auto", display: "block"}}/>
                                    }
                                </Tab.Pane>

                                <Tab.Pane eventKey="getpost">
                                    <RecipePost/>
                                </Tab.Pane>
                            </Tab.Content>
                      </Col>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        groups: state.groups,
        posts: state.posts,
        userevents: state.userevents,
        tagrecommandation: state.tagrecommandation
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchCurrentUser: fetchCurrentUser,
            fetchGroups: fetchGroups,
            fetchPosts: fetchPosts,
            fetchUserEvents: fetchUserEvents,
            fetchTagRecommandation: fetchTagRecommandation
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);