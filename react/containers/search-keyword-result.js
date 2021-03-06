import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
import {Col, Row} from 'react-bootstrap';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {cardStyles as styles} from '../styles/recipe-listing-cards.style';
import {Link} from 'react-router';
import NavigationBar from '../components/navigation-bar';
import axios from 'axios';
import TextTruncate from 'react-text-truncate';

class SearchKeywordResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: null
        };
    }

    search() {
        axios.post("/api/v1/search/keyword/", {
            keyword: this.props.params.keyword
        }).then(res => {
            this.setState({recipes: res.data.recipes});
        });
    }

    componentWillMount() {
        this.search();
    }

    render() {
        if (this.state.recipes == null) {
            return (
                <div>
                    <CircularProgress size={60}/>
                </div>
            )
        }
        return (
            <div style={styles.cards}>
                <NavigationBar />
                {this.renderRecipes()}
            </div>
        )
    }

    renderRecipes() {
        return this.state.recipes.map((recipe) => {
            return (
                <Col key={recipe.rid} xs={12} sm={6} md={4} lg={4}>
                    <Card style={styles.card}>
                        {recipe.pic == null ?
                            <CardMedia mediaStyle={styles.cardMedia}>
                                <img src="../../static/img/default.jpg"/>
                            </CardMedia>
                            :
                            <CardMedia mediaStyle={styles.cardMedia}>
                                <img src={"../../static/img/" + recipe.pic}/>
                            </CardMedia>
                        }
                        <CardTitle title={recipe.rtitle}
                                   titleColor="white"
                                   titleStyle={styles.titleStyle}
                                   subtitleColor="white"
                                   style={styles.cardTitle}/>
                        <CardText style={styles.cardDetailText}>
                            <Row style={styles.row}>
                                <Col style={styles.row}>
                                    <div style={styles.col.title}>
                                        number of serving
                                    </div>
                                    {recipe.numofserving == null ? "null" : `${recipe.numofserving} serving`}
                                </Col>
                            </Row>
                            <Row style={styles.row}>
                                <Col style={styles.row}>
                                    <div style={styles.col.title}>
                                        description
                                    </div>
                                    {recipe.description == null 
                                        ? 
                                        "null" 
                                        : 
                                        <TextTruncate
                                            line={1}
                                            truncateText="…"
                                            text={recipe.description}
                                        />
                                    }
                                </Col>
                            </Row>
                            <Row style={styles.row}>
                                <Col style={styles.row}>
                                    <div style={styles.col.title}>
                                        user who posted this recipe
                                    </div>
                                    {recipe.uname == null ? "null" : recipe.uname}
                                </Col>
                            </Row>
                            <Link to={{
                                pathname: `/recipes/${recipe.rid}`,
                                state: {
                                    modal: true
                                }
                            }}>
                                detail
                            </Link>
                        </CardText>
                    </Card>
                </Col>
            );
        });
    }
}

export default SearchKeywordResult;
