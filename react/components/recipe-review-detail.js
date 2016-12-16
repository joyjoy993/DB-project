import React, {Component} from 'react';
import {Modal, Tab, Col, Row, Nav, NavItem, Panel, PanelGroup, Collapse, Button} from 'react-bootstrap';
import {fetchCurrentUser} from '../actions/index';
import PosterReplyPost from '../components/poster-reply-post';
import StarRatingComponent from 'react-star-rating-component';

class RecipeReviewDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse_open: false

        };
    }

    render() {
        return (
            <div>
                <Panel header={"review title: "+ this.props.review.title} bsStyle="primary">
                      {this.props.review.pic != null ?
                        <img src={"../static/img/" + this.props.review.pic} height="180px"/>
                        :
                        <div></div>
                      }
                      <p>
                        {"review content: " + this.props.review.content}
                      </p>
                      <p>
                        {"review user: " + this.props.review.user}
                      </p>
                      <p>
                        <StarRatingComponent
                            editing={false}
                            name="rate1" 
                            starCount={5}
                            value={this.props.review.rate}
                        />
                      </p>
                        {this.props.review.reply ? 
                            <p>
                                {"poster's reply: " + this.props.review.reply}
                            </p>
                            :
                            <p>
                                poster's reply: None
                            </p>
                        }
                </Panel>
                {this.props.user != null && this.props.uname == this.props.user.uname && this.props.review.reply == null ?
                    <div>
                        <Button onClick={() => this.setState({ collapse_open: !this.state.collapse_open })}>
                                Add reply!
                        </Button>
                        <Collapse in={this.state.collapse_open}>
                            <div>
                                <PosterReplyPost revid={this.props.review.revid}/>
                            </div>
                        </Collapse>
                    </div>
                    :
                    <div>
                    </div>
                }
            </div>

        );
    }
}   


export default RecipeReviewDetail;