import React, { Component } from "react";
import queries from './queries';
import { Query } from 'react-apollo';
import { Card } from 'react-bootstrap';
import UpdateUser from './components/UpdateUser'

class ShowProfile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name:'',
        email:'',
        password:'',
        id:''
      };
       
    }
    componentDidMount(){
     const id = this.props.match.params.id
     this.setState({id: id})
      }
     
      render(){
            return (
                <Query query={queries.GET_USER}
                variables={{ id: this.state.id }}
            >
             {({ loading, error, data, refetch }) => {
                    if (loading) {
                        console.log("loading");
                        return null;
                    }
                 if (error) return `Error: ${error}`
    
                    console.log("state id: ", this.state.id)
                    console.log("data", data)
                    if (!data) {
                        console.log("Data not found");
                        return (
                            <div>
                            </div>
                        );
                    }
                    const { getUser } = data;
                    if (!getUser) {
                        return (
                            <div>
                            </div>
                        );
                    } else {
                        return(
                            <div>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{getUser.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Created At: {getUser.createdAt}</Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-muted">Email: {getUser.email}</Card.Subtitle>
                                        {/* <Card.Subtitle>
                                            {getUser.blogs}
                                        </Card.Subtitle>
                                        <Card.Subtitle>
                                            {getUser.comments}
                                        </Card.Subtitle> */}
                                    </Card.Body>
                                </Card>
                                <br/>
                                <UpdateUser userId={this.state.id} handleClose={this.handleClose}/>
                            </div>
                );
            }
        }
        }
    </Query>
    );
    }

    }
      
  export default ShowProfile