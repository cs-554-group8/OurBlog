import React, { Component } from "react";
//import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import queries from '../queries';
import { Query } from 'react-apollo';
import AddComment from './Comments/AddComment';

class  ArticleItem extends Component{
    constructor (props) {
        super(props);
        this.state= {
        //articles: [],
        id:'',
        showAddComment: false
        };
        this.handleOpenAddComment = this.handleOpenAddComment.bind(this);
    }
    handleOpenAddComment() {
        this.setState({showAddComment: true});
    }
componentDidMount(){
    const id = this.props.match.params.id
    this.setState({id: id});
}  
handleClose(){

}
render(){
    console.log("state", this.state.id);
        return (
            <Query query={queries.GET_BLOG}
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
                    // refetch();
                    return (
                        <div>
                        </div>
                    );
                }
                const { getBlog } = data;
                if (!getBlog) {
                    return (
                        <div>
                        </div>
                    );
                } else {
                    return(
                        <div>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{getBlog.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Created At: {getBlog.createdAt}</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">Updated At: {getBlog.updatedAt}</Card.Subtitle>
                                    <Card.Text>
                                        {getBlog.article}
                                    </Card.Text>
    
                                </Card.Body>
                            </Card>
                            <AddComment blogId={this.state.id} handleClose={this.handleClose}/>
                        </div>
            );
        }
    }
    }
</Query>
);
}
}


export default ArticleItem;