import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Form, FormGroup, Col, Button, FormControl, ControlLabel, Checkbox, option} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { browserHistory, Link } from 'react-router';

class PosterReplyPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reply: "",
            status: null
        };
    }

    handle_post() {
        axios.post("/api/v1/posterreply/", {
            reply: this.state.reply,
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
                        <ControlLabel>reply</ControlLabel>
                        <FormControl type="text" placeholder="reply" value={this.state.reply} onChange={e => this.setState({ reply: e.target.value })}/>
                    </FormGroup>

                    <FormGroup>
                        <Button onClick={this.handle_post.bind(this)}>
                        Give him/her a reply!
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default PosterReplyPost;