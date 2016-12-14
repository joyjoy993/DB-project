import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchEvents} from '../actions/index';
import CircularProgress from 'material-ui/CircularProgress';
import {Modal, Panel, Button, Well, PanelGroup} from 'react-bootstrap';
import Chip from 'material-ui/Chip';
import {cardStyles as styles} from '../styles/recipe-listing-cards.style';
import {Card, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import {List} from 'material-ui/List';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import axios from 'axios';
import { browserHistory } from 'react-router'

class Events extends Component {

    constructor(props) {
        super(props);
        this.props.fetchEvents(this.props.params.id);
        this.state = {
            showModal: true
        };
        document.body.style.overflowY = "hidden";
    }

    close() {
        this.setState({ showModal: false });
    }

    handle_event(eid, op) {
        axios.post("/api/v1/rsvps/", {
            eid: eid,
            op: op
        }).then(() => {
            this.props.fetchEvents(this.props.params.id);
        });
    }

    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close.bind(this)} backdrop="static">
                <Modal.Header closeButton onHide={browserHistory.goBack}>
                    <Modal.Title>events</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.events ?
                        <PanelGroup defaultActiveKey="1" accordion>
                            <Panel header="You have joined these events" eventKey="1">
                                {this.props.events.join_list.map((event) => {
                                    return (
                                        <div>
                                            <Panel header={"event name: "+event.ename} bsStyle="primary">
                                                <p>
                                                  {"event description: " + event.description}
                                                </p>
                                            </Panel>
                                            <Button onClick={() => {this.handle_event(event.eid, 0)}}>
                                                I am out!
                                            </Button>
                                        </div>
                                    );
                                })
                                }
                            </Panel>
                            <Panel header="This group has other events" eventKey="2">
                                {this.props.events.not_join_list.map((event) => {
                                    return (
                                        <div>
                                            <Panel header={"event name: "+event.ename} bsStyle="primary">
                                                  <p>
                                                    {"event description: " + event.description}
                                                  </p>
                                            </Panel>
                                            <Button onClick={() => {this.handle_event(event.eid, 1)}}>
                                                I am in!
                                            </Button>
                                        </div>
                                    );
                                })
                                }
                            </Panel>
                        </PanelGroup>
                        :
                        <CircularProgress size={60} style={{margin: "auto", display: "block"}}/>
                    }
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        events: state.events,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchEvents: fetchEvents,
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);