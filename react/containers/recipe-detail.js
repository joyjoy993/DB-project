import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchRecipe, fetchReviews} from '../actions/index';
import CircularProgress from 'material-ui/CircularProgress';
import {Modal, Collapse, Button, Col, ControlLabel} from 'react-bootstrap';
import Chip from 'material-ui/Chip';
import {cardStyles as styles} from '../styles/recipe-listing-cards.style';
import {Card, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import {List} from 'material-ui/List';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import RecipeReviewListing from '../components/recipe-review-listing';
import ReviewPost from '../components/review-post';
import { browserHistory } from 'react-router'

class RecipeDetail extends Component {

    constructor(props) {
        super(props);
        this.props.fetchRecipe(this.props.params.id);
        this.props.fetchReviews(this.props.params.id);
        this.state = {
            showModal: true,
            collapse_open: false,
            showreviews: false

        };
        document.body.style.overflowY = "hidden";
    }

    close() {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close.bind(this)} backdrop="static">
                    <Modal.Header closeButton onHide={browserHistory.goBack}>
                        <Modal.Title>Recipe Detail</Modal.Title>
                    </Modal.Header>
                <Modal.Body>
                    {this.props.recipe ?
                        <div>
                            {this.props.recipe.pic == null ?
                            <CardMedia>
                                <img src="../../static/img/default.jpg" height="180px"/>
                            </CardMedia>
                            :
                            <CardMedia>
                                <img src={"../../static/img/" + this.props.recipe.pic} height="180px"/>
                            </CardMedia>
                            }
                            <CardText>
                                <Table striped hover bordered style={{marginBottom: "0px"}}>
                                    <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={true}>
                                        <TableRow selectable={false}>
                                            <TableRowColumn style={styles.tableRow}>
                                                recipe name
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                {this.props.recipe.rtitle == null ? "null" : this.props.recipe.rtitle}
                                            </TableRowColumn>
                                        </TableRow>
                                        <TableRow selectable={false}>
                                            <TableRowColumn style={styles.tableRow}>
                                                description
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                {this.props.recipe.description == null ? 
                                                    "null" 
                                                    : 
                                                    this.props.recipe.description.split("\n").map(i => {
                                                        return <div>{i}</div>;
                                                    })
                                                }
                                            </TableRowColumn>
                                        </TableRow>
                                        <TableRow selectable={false}>
                                            <TableRowColumn style={styles.tableRow}>
                                                number of serving
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                {this.props.recipe.numofserving == null ? "null" : this.props.recipe.numofserving}
                                            </TableRowColumn>
                                        </TableRow>
                                        <TableRow selectable={false}>
                                            <TableRowColumn style={styles.tableRow}>
                                                ingredients
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                {this.props.recipe ?
                                                    <div>
                                                        {this.props.recipe.ingredients.map((ingredient) => {
                                                            return (
                                                                <div>
                                                                {ingredient.ingredient + ": " + ingredient.amount + " " + ingredient.unit}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                    :
                                                    <CircularProgress size={60} style={{margin: "auto", display: "block"}}/>
                                                }
                                            </TableRowColumn>
                                        </TableRow>
                                        <TableRow selectable={false}>
                                            <TableRowColumn style={styles.tableRow}>
                                                user who posted this recipe
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                {this.props.recipe.uname == null ? "null" : this.props.recipe.uname}
                                            </TableRowColumn>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <Button onClick={() => this.setState({ showreviews: !this.state.showreviews })}>
                                                    Show Reviews!
                                </Button>
                                <Collapse in={this.state.showreviews}>
                                    <div>
                                        {this.props.reviews ?
                                            <RecipeReviewListing reviews={this.props.reviews} uname={this.props.recipe.uname}/>
                                            :
                                            <CircularProgress size={60} style={{margin: "auto", display: "block"}}/>
                                        }
                                        <Button onClick={() => this.setState({ collapse_open: !this.state.collapse_open })}>
                                                            Add Review!
                                        </Button>
                                        <Collapse in={this.state.collapse_open}>
                                            <div>
                                                <ReviewPost recipeid={this.props.params.id}/>
                                            </div>
                                        </Collapse>
                                    </div>
                                </Collapse>
                            </CardText>
                        </div>
                        :
                        <CircularProgress size={60} style={{margin: "auto", display: "block"}}/>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {this.props.recipe ?
                        <div style={styles.wrapper}>
                            {this.props.recipe.tags.map((tag) => {
                                return (
                                    <Chip
                                        key={tag.key}
                                        style={styles.chip}
                                        onClick={() => {
                                            browserHistory.push('/search/tag/'+tag.key);
                                            window.location.reload();
                                        }}
                                        onTouchTap={() => {}}
                                        >
                                    {tag.title}
                                    </Chip>
                                )
                            })}
                        </div>
                        :
                        <CircularProgress size={60} style={{margin: "auto", display: "block"}}/>
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        recipe: state.recipe,
        reviews: state.reviews
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchRecipe: fetchRecipe,
            fetchReviews: fetchReviews
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);