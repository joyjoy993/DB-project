import React, {Component} from 'react';
import {Modal, Tab, Col, Row, Nav, NavItem, Panel, PanelGroup, Button, Collapse, Well} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReportPost from '../components/report-post';
import EventReportListing from '../components/event-report-listing';

class UserEventDetail extends Component {

    componentWillMount() {
        this.setState({
            collapse_open: false,
            collapse_open1: false
        });
    }

    render() {
        return (
            <PanelGroup activeKey={this.props.userevent.eid} accordion>
                <Panel header={"event name: "+ this.props.userevent.ename} bsStyle="primary" eventKey={this.props.userevent.eid}>
                    {"event description: " + this.props.userevent.edescription}

                    <Button onClick={() => {this.setState({ collapse_open1: !this.state.collapse_open1 });}}>
                        See Report!
                    </Button>
                    <Collapse in={this.state.collapse_open1}>
                        <div>
                            {this.state.collapse_open1 ?

                                <EventReportListing eid={this.props.userevent.eid}/>
                                :
                                <div></div>
                            }
                        </div>
                    </Collapse>

                    <Button onClick={() => this.setState({ collapse_open: !this.state.collapse_open })}>
                        Add Report!
                    </Button>
                    <Collapse in={this.state.collapse_open}>
                        <div>
                            <ReportPost eid={this.props.userevent.eid}/>
                        </div>
                    </Collapse>
                </Panel>
            </PanelGroup>
        )
    }

}


export default UserEventDetail;
