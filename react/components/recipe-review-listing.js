import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {Modal, Tab, Col, Row, Nav, NavItem, Panel, PanelGroup, Collapse, Button} from 'react-bootstrap';
import {cardStyles as styles} from '../styles/recipe-listing-cards.style';
import {Link} from 'react-router';
import {fetchCurrentUser} from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import StarRatingComponent from 'react-star-rating-component';
import RecipeReviewDetail from '../components/recipe-review-detail';

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
                                    {this.props.user ?
                                        <RecipeReviewDetail review={review} user={this.props.user} uname={this.props.uname}/>
                                        :
                                        <div></div>
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