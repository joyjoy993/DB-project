import React, {Component} from 'react';
import {Modal, Tab, Col, Row, Nav, NavItem, Panel, PanelGroup, Button, Collapse, Well} from 'react-bootstrap';
import UserEventDetail from '../components/user-event-detail';
import ReportPost from '../components/report-post';
import EventReportListing from '../components/event-report-listing';
class UserEvents extends Component {
componentWillMount() {
        this.setState({
            collapse_open: false,
            collapse_open1: false
        });
    }
    render() {
        return (
            <div>
                {this.props.userevents ?
                    <Panel header="You join these events" eventKey="events">
                        {this.props.userevents.map((userevent) => {
                            return (
                                <Panel header={"event name: "+ userevent.ename} bsStyle="primary" eventKey={userevent.eid}>
                    {"event description: " + userevent.edescription}

                    <Button onClick={() => {this.setState({ collapse_open1: !this.state.collapse_open1 });}}>
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
                </Panel>
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