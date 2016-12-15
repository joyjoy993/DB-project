import React, {Component} from 'react';
import {Modal, Tab, Col, Row, Nav, NavItem, Panel, PanelGroup, Button, Collapse, Well} from 'react-bootstrap';
import {fetchEventReport} from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class EventReportListing extends Component {

    constructor(props) {
        super(props);
        this.props.fetchEventReport(this.props.eid);
    }

    render() {
        return (
            <div>
                {this.props.eventreports ?
                    <div>
                        {this.props.eventreports.map((eventreport) => {
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
                    ??
                    </div>
                }
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        eventreports: state.eventreports
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchEventReport: fetchEventReport
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(EventReportListing);