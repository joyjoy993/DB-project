import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Form, FormGroup, Col, Button, FormControl, ControlLabel, Checkbox, option} from 'react-bootstrap';
import {fetchTags} from '../actions/index';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { browserHistory, Link } from 'react-router';

class RecipePost extends Component {

    constructor(props) {
        super(props);
        this.props.fetchTags();
        this.state = {
            rtitle: "",
            numofserving: 0,
            description: "",
            tags: [],
            status: null,
            uploadedFile: null,
            ingredient: "",
            amount: 0,
            unit: "",
            solid: false,
            ingredients: [],
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

    add_ingredient() {
        if(this.state.ingredient != "" && this.state.amount != 0 && this.state.unit != "") {
            var newingredients = this.state.ingredients; 
            newingredients.push({
                ingredient: this.state.ingredient,
                amount: this.state.amount,
                unit: this.state.unit,
                solid: this.state.solid
            }); 
            this.setState({ ingredients: newingredients,
                            ingredient: "",
                            amount: 0,
                            unit: "",
                            solid: false
                            })
        }
    }

    handle_upload() {
        axios.post("/api/v1/postrecipe/", {
            rtitle: this.state.rtitle,
            numofserving: this.state.numofserving,
            description: this.state.description,
            tags: this.state.tags,
            file: this.state.uploadedFileCloudinaryUrl,
            ingredients: this.state.ingredients
        }).then(res => {
            this.setState({status: res.status});
        });
        window.location.reload();
        //console.log(this.state);
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
                    <Col componentClass={ControlLabel} sm={2}>
                    recipe title
                    </Col>
                    <Col sm={10}>
                    <FormControl type="text" placeholder="recipe title" value={this.state.rtitle} onChange={e => this.setState({ rtitle: e.target.value })}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalNumber">
                    <Col componentClass={ControlLabel} sm={2}>
                    number of serving
                    </Col>
                    <Col sm={10}>
                    <FormControl type="number" placeholder="number of serving" value={this.state.numofserving} onChange={e => this.setState({ numofserving: e.target.value })}/>
                    </Col>
                </FormGroup>

                <Form inline>
                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                        ingredient
                        </Col>
                        <Col sm={10}>
                        <FormControl type="text" placeholder="ingredient" value={this.state.ingredient} onChange={e => this.setState({ ingredient: e.target.value })}/>
                        </Col>
                    </FormGroup>
                    {' '}
                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                        unit
                        </Col>
                        <Col sm={10}>
                        <FormControl type="text" placeholder="name of unit" value={this.state.unit} onChange={e => this.setState({ unit: e.target.value })}/>
                        </Col>
                    </FormGroup>

                </Form>

                <Form inline>
                    <FormGroup controlId="formHorizontalNumber">
                        <Col componentClass={ControlLabel} sm={2}>
                        amount
                        </Col>
                        <Col sm={10}>
                        <FormControl type="number" placeholder="amount" value={this.state.amount} onChange={e => this.setState({ amount: e.target.value })}/>
                        </Col>
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Checkbox onChange={e => this.setState({ solid: !this.state.solid})}>solid</Checkbox>
                        </Col>
                    </FormGroup>
                </Form>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button onClick={this.add_ingredient.bind(this)}>
                        add ingredient
                        </Button>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formControlsSelectMultiple">
                    {this.state.ingredients.length != 0 ?
                        <FormControl componentClass="select" multiple>
                            {this.state.ingredients.map((ingredient) => {
                                return (
                                    <option value={ingredient.tname}>{ingredient.ingredient + ": " + ingredient.amount + " " + ingredient.unit}</option>
                                )
                            })
                            }
                        </FormControl>
                        :
                        <div>
                        </div>
                    }        
                </FormGroup>


                <FormGroup controlId="formControlsSelectMultiple">
                    {this.props.tags ?
                        <FormControl componentClass="select" multiple onChange={e => {var newtags = this.state.tags; newtags.push(e.target.value); this.setState({ tags: newtags }) }}>
                            {this.props.tags.map((tag) => {
                                return (
                                    <option value={tag.tid}>{tag.tname}</option>
                                )
                            })
                            }
                        </FormControl>
                        :
                        <div>
                        </div>
                    }        
                </FormGroup>

                <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                        description
                        </Col>
                        <Col sm={10}>
                        <FormControl type="text" placeholder="description" onChange={e => this.setState({ description: e.target.value })}/>
                        </Col>
                    </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button onClick={this.handle_upload.bind(this)}>
                        Post!
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tags: state.tags
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchTags: fetchTags
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePost);