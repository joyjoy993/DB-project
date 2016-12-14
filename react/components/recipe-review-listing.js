import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {Modal, Tab, Col, Row, Nav, NavItem, Panel, PanelGroup, Collapse, Button} from 'react-bootstrap';
import {cardStyles as styles} from '../styles/recipe-listing-cards.style';
import {Link} from 'react-router';
import {fetchCurrentUser} from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SuggestionPost from '../components/suggestion-post';
import StarRatingComponent from 'react-star-rating-component';

class RecipeReviewListing extends Component {

    constructor(props) {
        super(props);
        this.props.fetchCurrentUser();
        this.state = {
            collapse_open: false

        };
    }

    render() {
        return (
            <div>
                {this.props.reviews.length ?
                    <div>
                        {this.props.reviews.map((review) => {
                            return (
                                <div>
                                    <Panel header={"review title: "+ review.title} bsStyle="primary">
                                          {review.pic != null ?
                                            <img src={"../static/img/" + review.pic} height="180px"/>
                                            :
                                            <div></div>
                                          }
                                          <p>
                                            {"review content: " + review.content}
                                          </p>
                                          <p>
                                            {"review user: " + review.user}
                                          </p>
                                          <p>
                                            <StarRatingComponent
                                                editing={false}
                                                name="rate1" 
                                                starCount={5}
                                                value={review.rate}
                                            />
                                          </p>
                                            {review.suggestion ? 
                                                <p>
                                                    {"poster's suggestion: " + review.suggestion}
                                                </p>
                                                :
                                                <p>
                                                    poster's suggestion: None
                                                </p>
                                            }
                                    </Panel>
                                    {this.props.user != null && this.props.uname == this.props.user.uname ?
                                        <div>
                                            <Button onClick={() => this.setState({ collapse_open: !this.state.collapse_open })}>
                                                    Add Suggestion!
                                            </Button>
                                            <Collapse in={this.state.collapse_open}>
                                                <div>
                                                    <SuggestionPost revid={review.revid}/>
                                                </div>
                                            </Collapse>
                                        </div>
                                        :
                                        <div>
                                        </div>
                                    }
                                </div>

                            )

                        })}
                    </div>
                    :
                    <div>
                        None
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchCurrentUser: fetchCurrentUser
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeReviewListing);