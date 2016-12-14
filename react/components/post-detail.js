import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {Modal, Tab, Col, Row, Nav, NavItem, Panel, PanelGroup} from 'react-bootstrap';
import {cardStyles as styles} from '../styles/recipe-listing-cards.style';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Link} from 'react-router';

class PostDetail extends Component {



    render() {
        return (
            <div style={styles.root}>
                <GridList
                  cellHeight={180}
                  style={styles.gridList}
                >
                  {this.props.posts.map((post) => (
                    <Link to={{
                                pathname: `/recipes/${post.rid}`,
                                state: {
                                    modal: true
                                }
                            }}>
                      <GridTile
                        key={post.rid}
                        title={post.rtitle}
                        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                      >
                      {post.pic == null ?
                          <img src="../static/img/default.jpg"/>
                          :
                          <img src={"../static/img/" + post.pic}/>
                      }
                      </GridTile>
                    </Link>
                  ))}
                </GridList>
              </div>
        );
    }
}

export default PostDetail;