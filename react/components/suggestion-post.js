import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Form, FormGroup, Col, Button, FormControl, ControlLabel, Checkbox, option} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { browserHistory, Link } from 'react-router';

class SuggestionPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            suggestion: "",
            status: null
        };
    }

    handle_post() {
        axios.post("/api/v1/postsuggestion/", {
            suggestion: this.state.suggestion,
            revid: this.props.revid
        }).then(res => {
            this.setState({status: res.status});
        });
        window.location.reload();
    }

    render() {

        return (
            <div>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalName">
                        <ControlLabel>suggestion</ControlLabel>
                        <FormControl type="text" placeholder="Suggestion" value={this.state.suggestion} onChange={e => this.setState({ suggestion: e.target.value })}/>
                    </FormGroup>

                    <FormGroup>
                        <Button onClick={this.handle_post.bind(this)}>
                        Give him/her a suggestion!
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default SuggestionPost;