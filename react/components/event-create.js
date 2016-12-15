import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Form, FormGroup, Col, Button, FormControl, ControlLabel, Checkbox, option, Collapse} from 'react-bootstrap';

class EventCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ename: "",
            edescription: "",
            collapse_open: false
        };
    }

    handle_create() {

        axios.post("/api/v1/event-creation/", {
            'gid': this.props.gid,
            'edescription': this.state.edescription,
            'ename': this.state.ename
        }).then(res => {
            this.setState({status: res.status});
        });
        window.location.reload();
    }

    render() {

        return (
            <div>
                <Button onClick={() => this.setState({ collapse_open: !this.state.collapse_open })}>
                Add Event!
                </Button>
                <Collapse in={this.state.collapse_open}>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalName">
                            <Col componentClass={ControlLabel} sm={2}>
                            event name
                            </Col>
                            <Col sm={10}>
                            <FormControl type="text" placeholder="event name" value={this.state.ename} onChange={e => this.setState({ ename: e.target.value })}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalName">
                            <Col componentClass={ControlLabel} sm={2}>
                            event description
                            </Col>
                            <Col sm={10}>
                            <FormControl type="text" placeholder="event description" value={this.state.edescription} onChange={e => this.setState({ edescription: e.target.value })}/>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button onClick={this.handle_create.bind(this)}>
                                Create!
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Collapse>
            </div>
        );
    }
}

export default EventCreate;