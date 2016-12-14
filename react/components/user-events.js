import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {Modal, Tab, Col, Row, Nav, NavItem, Panel, PanelGroup, Button, Collapse, Well} from 'react-bootstrap';
import {cardStyles as styles} from '../styles/recipe-listing-cards.style';
import {Link} from 'react-router';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReportPost from '../components/report-post';
import EventReportListing from '../components/event-report-listing';

class UserEvents extends Component {

    componentWillMount() {
        console.log(this.props.userevents);
        this.setState({
            collapse_open: false,
            collapse_open1: false
        });
    }

    render() {
        return (
            <div>
                {this.props.userevents ?
                    <Panel header="You join these events" eventKey="1">
                        {this.props.userevents.map((userevent) => {
                            return (
                                <div>
                                    <Panel header={"event name: "+ userevent.ename} bsStyle="primary">
                                          {"event description: " + userevent.edescription}
                                    </Panel>

                                    <Button onClick={() => this.setState({ collapse_open1: !this.state.collapse_open1 })}>
                                                    See Report!
                                    </Button>
                                    <Collapse in={this.state.collapse_open1}>
                                        <div>
                                            <EventReportListing eid={userevent.eid}/>
                                        </div>
                                    </Collapse>

                                    <Button onClick={() => this.setState({ collapse_open: !this.state.collapse_open })}>
                                                    Add Report!
                                    </Button>
                                    <Collapse in={this.state.collapse_open}>
                                        <div>
                                            <ReportPost eid={userevent.eid}/>
                                        </div>
                                    </Collapse>
                                </div>

                            );
                        })
                        }
                    </Panel>
                    :
                    <div>
                    </div>
                }
            </div>
        );
    }
}

export default UserEvents;