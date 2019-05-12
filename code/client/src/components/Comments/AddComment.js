import React, {Component} from 'react';
import {Query, Mutation} from 'react-apollo';
import { Form, Button, Row, Col, FormGroup, Card } from 'react-bootstrap';
import queries from '../../queries';

class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddComment: this.props.isOpen,
            comment: '',
            blogId: '',
            postedBy: '',
        };
        this.handleOpenAddComment = this.handleOpenAddComment.bind(this);
        this.handleCloseAddComment = this.handleCloseAddComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.setState({blogId: this.props.blogId})
    }

    handleChange(event){
        this.setState({comment: event.target.value});
    }

    handleOpenAddComment() {
        this.setState({showAddComment: true});
    }

    handleCloseAddComment() {
        this.setState({showAddComment: false});
        this.props.handleClose(false);
    }

    render() {
        let content, blogId;
        return(
            <div>
                <Row className="justify-content-md-center">
                    <Col lg={8}>
                    <Mutation mutation={queries.POST_COMMENT}>
                            {(postComment, { data }) => (
                                <Form onSubmit={async (e) => {
                                    e.preventDefault();
                                    console.log(this.state.comment, this.state.blogId);
                                    postComment({
                                        variables: {
                                            content: this.state.comment,
                                            blogId: this.state.blogId,
                                            postedBy: this.state.postedBy
                                        }
                                    });

                                    this.setState({comment: "", blogId: "", postedBy: ""});
                                    this.setState({showAddComment: false});
                                alert('Comment Added');
                                this.handleCloseAddComment();
                            }}>
                            <Form.Group controlId="comment">
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control as="textarea" name="comment" value={this.state.value} onChange={this.handleChange} rows="3"
                                            ref={node => {
                                                content = node;
                                            }}
                                            required
                                        />
                                      
                                    </Form.Group>
                                    <div className= "card-footer">  {this.state.comment.postedBy} </div>
                                    <Button variant="outline-primary" type="submit">Post</Button>
                                </Form>
                            )}
                        </Mutation>              
                        </Col>
                </Row>
               
            </div>
        );
    }
}



export default AddComment;