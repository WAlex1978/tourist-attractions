import React, { Component, Fragment } from 'react';
import { Card, Text } from '../../shared/styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        paddingLeft: "5px",
        paddingRight: "5px",
        paddingBottom: "10px",
    }
});

class Visited extends Component {
    state = {
        classes: this.props.classes,
    }

    render() {
        return (
            <Card style={{flex: 1}}>
                <Text align="center" margin="10px">My Visited Locations ( {this.props.locations.length} )</Text>
                {this.props.locations.length > 0 ?
                    <div className={this.state.classes.root}>
                        <GridList cellHeight={250} className={this.state.classes.gridList} cols={3}>
                            {this.props.locations.map((location, i) => (
                                <GridListTile key={i} component={Link} to={"/location/" + location.id}>
                                    <img src={location.image} alt={location.name} />
                                    <GridListTileBar title={location.name} />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div> :
                <Fragment>
                    <Divider />
                    <Text margin="10px" size=".95rem" align="center">User has not yet visited any locations.</Text> 
                </Fragment> }
            </Card>
        );
    }
}

Visited.propTypes = {
    classes: PropTypes.object.isRequired,
};
 
export default withStyles (styles) (Visited);