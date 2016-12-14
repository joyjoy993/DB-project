import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Form, FormGroup, Col, Button, FormControl, ControlLabel, Checkbox, option} from 'react-bootstrap';

class GroupCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gname: "",
            profile: ""
        };
    }

    handle_upload() {
        axios.post("/api/v1/group-creation/", {
            gname: this.state.gname,
            profile: this.state.profile
        }).then(res => {
            this.setState({status: res.status});
        });
        window.location.reload();
        //console.log(this.state);
    }

    render() {

        return (
            <div>

            <Form horizontal>
                <FormGroup controlId="formHorizontalName">
                    <Col componentClass={ControlLabel} sm={2}>
                    group name
                    </Col>
                    <Col sm={10}>
                    <FormControl type="text" placeholder="group name" value={this.state.gname} onChange={e => this.setState({ gname: e.target.value })}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalName">
                    <Col componentClass={ControlLabel} sm={2}>
                    group profile
                    </Col>
                    <Col sm={10}>
                    <FormControl type="text" placeholder="group profile" value={this.state.profile} onChange={e => this.setState({ profile: e.target.value })}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button onClick={this.handle_upload.bind(this)}>
                        Create!
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
            </div>
        );
    }
}

export default GroupCreate;