import React, {Component} from 'react';
import {Modal, Tab, Col, Row, Nav, NavItem, Panel, PanelGroup, Button, Collapse, Well} from 'react-bootstrap';
import {fetchEventReport} from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

class EventReportListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventreports: null
        }
        //this.state.fetchEventReport(this.state.eid);
    }

    componentWillMount() {
        axios.get(`/api/v1/eventreport/${this.props.eid}`)
            .then(res => {
            this.setState({eventreports: res.data.eventreports});
        });
    }

    render() {
        return (
            <div>
                {this.state.eventreports && this.state.eventreports.length != 0 ?
                    <div>
                        {this.state.eventreports.map((eventreport) => {
                            return (
                                <Panel header={"report title: "+ eventreport.reptitle} eventKey={eventreport.repid} bsStyle="success">
                                    {eventreport.reppic != null ?
                                        <img src={"../../static/img/" + eventreport.reppic} height="180px"/>
                                        :
                                        <div></div>
                                    }
                                    <p>
                                      {"report content: " + eventreport.reptext}
                                    </p>
                                    <p>
                                      {"reporter: " + eventreport.uname}
                                    </p>
                                </Panel>

                            );
                        })
                        }
                    </div>
                    :
                    <div>
                        <Well>No Report</Well>
                    </div>
                }
            </div>
        );
    }
}


export default EventReportListing;