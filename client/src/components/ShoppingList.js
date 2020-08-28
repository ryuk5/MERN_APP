import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {

    //defining types for our props
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }


    componentDidMount() {
        this.props.getItems();
        console.log(this.props);
    }

    handleDelete = (id) => {
        this.props.deleteItem(id); //1-calling the action delete Item
    }

    render() {
        const { items } = this.props.item;
        const displayItems = items.map(item => {
            return (
                <CSSTransition key={item._id} timeout={500} classNames="fade">
                    <ListGroupItem>
                        { this.props.isAuthenticated ? <Button
                            className="remove-btn"
                            color="danger"
                            size="sm"
                            onClick={() => { this.handleDelete(item._id) }}
                        >
                            &times;
                        </Button> : null }
                        
                        
                        {item.name}
                    </ListGroupItem>
                </CSSTransition>
            )
        })
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {displayItems}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        item: state.item, //item which represents our reducer
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);