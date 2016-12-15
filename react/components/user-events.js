import React, {Component} from 'react';
import {Modal, Tab, Col, Row, Nav, NavItem, Panel, PanelGroup, Button, Collapse, Well} from 'react-bootstrap';
import UserEventDetail from '../components/user-event-detail';

class UserEvents extends Component {

    render() {
        return (
            <div>
                {this.props.userevents ?
                    <Panel header="You join these events" eventKey="1">
                        {this.props.userevents.map((userevent) => {
                            return (
                                <UserEventDetail userevent={userevent}/>
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