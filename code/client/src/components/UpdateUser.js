import React, {Component} from 'react';
import { Mutation } from 'react-apollo';
import { Form } from 'react-bootstrap';
//Import the file where my query constants are defined
import queries from '../queries';

/* The React Apollo package grants access to a Query component, which takes a query as prop and executes it when its rendered. 
That’s the important part: it executes the query when it is rendered. 
It uses React’s render props pattern, using a child as a function implementation where you can access the result of the query as an argument.
*/
class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditUser: this.props.isOpen,
            name: "",
            password: "",
            email: ""

        };
        this.handleCloseEditUser = this.handleCloseEditUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        this.setState({blogId: this.props.blogId})
    }

    handleCloseEditUser() {
        this.setState({showEditUser: false});
        console.log("hi");
        this.props.handleClose();
    }
    handleChange(event){
        this.setState({name: event.target.value});
    }


    render() {
        let name, password, email;
        
        return (
            <div>
                    <Mutation mutation={queries.UPDATE_USER}>
                        {(updateUser, {data}) => (
                            <Form
                                className='form'
                                id='update-user'
                                onSubmit={e => {

                                    e.preventDefault();
                                    updateUser({
                                        variables: {
                                            id: this.state.user.id,
                                            name: this.prstateops.name,
                                            password: this.state.password,
                                            email: this.state.email
                    
                                        }
                                    });    
                                    this.setState({name: "", password: "", email: ""});
                                    this.setState({showEditUser: false});
                                    alert('user Updated');
                                    this.props.handleClose();
                                }}>
                                <Form.Group controlId="user">
                                    <Form.label>
                                        User Name:
                                        <br />
                                        <input
                                            ref={(node) => {
                                                name = node;
                                            }}
                                            defaultValue={this.props.name}
                                            autoFocus={true}
                                        />
                                    </Form.label>
                                    <br/>
                                    <br/>
                                    <Form.label>
                                        Email:
                                        <br />
                                        <input
                                            ref={(node) => {
                                                email = node;
                                            }}
                                            defaultValue={this.props.email}
                                            autoFocus={true}
                                        />
                                    </Form.label>
                                    <br/>
                                    <br/>
                                    <Form.label>
                                        Password:
                                        <br />
                                        <input
                                            ref={(node) => {
                                                password = node;
                                            }}
                                            defaultValue={this.props.password}
                                            autoFocus={true}
                                        />
                                    </Form.label>

                                </Form.Group>
                                <br />                    
                                <br />
                                <br />
                                <br />
                                <button className='button add-button' type='submit'>
                                    Update Profile
                                </button>
                            </Form>
                        )}
                    </Mutation>
                    <button className='button cancel-button' onClick={this.handleCloseEditUser}>
                        Cancel
                    </button>
            </div>
        );
    }
}

export default UpdateUser;