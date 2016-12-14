import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {Modal, Tab, Col, Row, Nav, NavItem, Panel, PanelGroup} from 'react-bootstrap';
import {cardStyles as styles} from '../styles/recipe-listing-cards.style';

class ProfileDetail extends Component {

    render() {
        return (
            <div>
                <Panel header="user name" bsStyle="primary">
                  {this.props.user.uname}
                </Panel>
                <Panel header="decription" bsStyle="success">
                  {
                    this.props.user.uprofile 
                    ?
                    this.props.user.uprofile
                    :
                    `null`
                  }
                </Panel>
            </div>
        );
    }
}

export default ProfileDetail;