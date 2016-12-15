import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Form, FormGroup, Col, Button, FormControl, ControlLabel, Checkbox, option} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { browserHistory, Link } from 'react-router';

class ReportPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            uploadedFile: null,
            status: null,
            uploadedFileCloudinaryUrl: null
        };
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
    });

        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        let upload = request.post("/upload/")
                         .field('file', file);

        upload.end((err, response) => {
          if (err) {
            console.error(err);
          }
          var t = JSON.parse(response.text);

          if (t.filename !== '') {
            //console.log(t.filename);
            this.setState({
              uploadedFileCloudinaryUrl: t.filename
            });
          }
        });
    }

    handle_upload() {
        axios.post("/api/v1/postreport/", {
            title: this.state.title,
            content: this.state.content,
            file: this.state.uploadedFileCloudinaryUrl,
            eid: this.props.eid
        }).then(res => {
            this.setState({status: res.status});
        });
        window.location.reload();
    }

    render() {

        return (
            <div>
                <div className="FileUpload">
                    <Dropzone
                        onDrop={this.onImageDrop.bind(this)}
                        multiple={false}
                        accept="image/*">
                        <div>Drop an image or click to select a file to upload.</div>
                    </Dropzone>
                </div>
                {this.state.uploadedFile ?
                    <div>
                        Your picture: <img src={this.state.uploadedFile.preview} style={{maxWidth:"100"}}/>
                    </div>
                    :
                    <div>
                    </div>
                }
                <Form horizontal>
                    <FormGroup controlId="formHorizontalName">
                        <ControlLabel>report title</ControlLabel>
                        <FormControl type="text" placeholder="report title" value={this.state.title} onChange={e => this.setState({ title: e.target.value })}/>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalName">
                        <ControlLabel>report content</ControlLabel>
                        <FormControl type="text" placeholder="review content" value={this.state.content} onChange={e => this.setState({ content: e.target.value })}/>
                    </FormGroup>

                    <FormGroup>
                        <Button onClick={this.handle_upload.bind(this)}>
                        Post!
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default ReportPost;