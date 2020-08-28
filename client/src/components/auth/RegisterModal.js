import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null // I wanna be able to show msg if we have an error
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool, //we are not going to do required bcz could be null
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) { //here we will check to see if anything's
            //check for register error
            //this is where the id comes in this is why we add id in certain error
            if (error.id === 'REGISTER_FAIL') {
                //then we know that we wanna output that error
                this.setState({ //3ana our msg value
                    msg: error.msg.msg //if this msg has something in it then we wanna output it in a alert
                });
            } else {
                this.setState({
                    msg: null
                });
            }
        }


        //If authenticated close modal
        if (this.state.modal) { //means that the modal is open
            //we also need to be sure that we are authenticated
            if (isAuthenticated) { //Remauque: the value of isAuthenticated is in the props 5ater jébénha fél mapStateToProps
                this.toggle(); //this will close the modal
            }
        }
    }

    toggle = () => {
        //Clear erros
        this.props.clearErrors();
        this.setState({ modal: !this.state.modal });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        //Deconstructring
        const { name, email, password } = this.state;

        //Creating a user object
        const newUser = {
            name,
            email,
            password
        };

        //calling the register action Attempt to register
        this.props.register(newUser);

        // Close Modal
        //We wanna close the modal if everything is ok 
        //we don't wanna close the modal if there's an error i wanna display the error to the user
    }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">Register</NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >

                    <ModalHeader toggle={this.toggle}>
                        Register
                    </ModalHeader>

                    <ModalBody>
                        {(this.state.msg) ? (<Alert color="danger">{this.state.msg}</Alert>) : (null)}
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className="mb-3"
                                    onChange={this.handleChange}
                                />


                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                    onChange={this.handleChange}
                                />


                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="mb-3"
                                    onChange={this.handleChange}
                                />
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >
                                    Register
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated, //W need to bring the value of isAuthenticated because we want to close the modal once we register we want to close it if we're authenticated
        error: state.error
    }
}

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);