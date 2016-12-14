import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {Modal, Tab, Col, Row, Nav, NavItem, Panel, PanelGroup, Button, Collapse, Well} from 'react-bootstrap';
import {cardStyles as styles} from '../styles/recipe-listing-cards.style';
import {Link} from 'react-router';
import axios from 'axios';
import EventCreate from '../components/event-create';

class GroupDetail extends Component {

    componentWillMount() {
        this.setState({
            collapse_open: false
        });
    }

    handle_join(gid) {
        axios.post("/api/v1/group-join/", {
            'gid': gid
        }).then(res => {
            this.setState({status: res.status});
        });
        window.location.reload();
    }

    render() {
        return (
            <div>
                {this.props.groups ?
                    <PanelGroup defaultActiveKey="1" accordion>
                        <Panel header="You own these groups" eventKey="1">
                            {this.props.groups.group_owner.map((group) => {
                                return (
                                    <div>
                                        <Panel header={"group name: "+group.gname} bsStyle="primary">
                                              {"group profile: " + group.gprofile}
                                        </Panel>
                                        <Link to={{
                                                    pathname: `/events/${group.gid}`,
                                                    state: {
                                                        modal: true
                                                    }
                                                }}>
                                                    Events
                                        </Link>
                                        <p>
                                        </p>
                                            <EventCreate gid={group.gid}/>
                                    </div>

                                );
                            })
                            }
                        </Panel>
                        <Panel header="You are a member of these groups" eventKey="2">
                            {this.props.groups.group_member.map((group) => {
                                return (
                                    <div>
                                        <Panel header={"group name: "+group.gname} bsStyle="primary">
                                              <p>
                                                {"group profile: " + group.gprofile}
                                              </p>
                                              <p>
                                              {"group owner: " + group.gowner}
                                              </p>
                                              <Link to={{
                                                    pathname: `/events/${group.gid}`,
                                                    state: {
                                                        modal: true
                                                    }
                                                }}>
                                                    Events
                                                </Link>
                                        </Panel>
                                    </div>
                                );
                            })
                            }
                        </Panel>
                        <Panel header="Discover more groups" eventKey="3">
                            {this.props.groups.group_not_in.map((group) => {
                                return (
                                    <div>
                                        <Panel header={"group name: "+group.gname} bsStyle="primary">
                                              <p>
                                                {"group profile: " + group.gprofile}
                                              </p>
                                              <p>
                                              {"group owner: " + group.gowner}
                                              </p>
                                              <Col smOffset={2} sm={10}>
                                                <Button onClick={() => this.handle_join(group.gid)}>
                                                    Join!
                                                </Button>
                                              </Col>
                                        </Panel>
                                    </div>
                                );
                            })
                            }
                        </Panel>
                    </PanelGroup>
                    :
                    <CircularProgress size={60} style={{margin: "auto", display: "block"}}/>
                }
            </div>
        );
    }
}

export default GroupDetail;