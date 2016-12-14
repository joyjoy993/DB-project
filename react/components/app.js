import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {appStyles as styles} from '../styles/app.style.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

const muiTheme = getMuiTheme(lightBaseTheme);


export default class App extends Component {

    constructor(props) {
        super(props);
        injectTapEventPlugin();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.state) {
            this.listOfProjects = this.props.children;
        }
    };

    render() {
        let {location} = this.props;

        let selected = location.state && this.listOfProjects;

        var content = null;

        if (selected) {
            content =
                <div>
                    {this.listOfProjects}
                    {this.props.children}
                </div>;
        } else {
            document.body.style.overflowY = null;
            content =
                <div>
                    {this.props.children}
                </div>;
        }

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    {content}
                </div>
            </MuiThemeProvider>
        );
    }
}