import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchRecipes} from '../actions/index';
import CircularProgress from 'material-ui/CircularProgress';
import {Col, Row} from 'react-bootstrap';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {cardStyles as styles} from '../styles/recipe-listing-cards.style';
import {Link} from 'react-router';
import NavigationBar from '../components/navigation-bar';

class RecipeListing extends Component {

    constructor(props) {
        super(props);
        this.props.fetchRecipes();
    }

    render() {
        if (this.props.recipes == null) {
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
        return this.props.recipes.map((recipe) => {
            return (
                <Col key={recipe.rid} xs={12} sm={6} md={4} lg={4}>
                    <Card style={styles.card}>
                        {recipe.pic == null ?
                            <CardMedia mediaStyle={styles.cardMedia}>
                                <img src="../static/img/default.jpg" height="180px"/>
                            </CardMedia>
                            :
                            <CardMedia mediaStyle={styles.cardMedia}>
                                <img src={"../static/img/" + recipe.pic} height="180px"/>
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
                                    {recipe.description == null ? "null" : recipe.description}
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


function mapStateToProps(state) {
    return {
        recipes: state.recipes,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchRecipes: fetchRecipes,
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListing);
