import gql from 'graphql-tag';

const ME = gql`
    query {
        me {
            id
            name
            email
        }
    }
`;

const UPDATE_USER = gql`
    mutation updateUser ($name: String!, $password:String, $email: String!, $phone: String, $address: String, $interest:String){
        updateUser(
            name: $name,
            email: $email,
            password: $password,
            phone: $phone,
            address: $address,
            interest: $interest
        ) {
            name
            phone
            address
            interest
        }
    }
`;

const POST_BLOG = gql`
mutation postBlog($title:String!, $article:String!){
    postBlog(
        title: $title, 
        article: $article
    ) {
      id
      title
    }
  }
`;

const GET_ALL_BLOGS = gql`
query {
    allBlogs {
        id
        createdAt
        updatedAt
        title
        article
        likes
        postedBy {
          id
          name
        }
        comments {
          id
        }
        tags {
            tag
        }
    }
}
`;

const ELASTIC_SEARCH = gql`
query elasticSearch($searchString: String){
    elasticSearch(
        searchString: $searchString
    ) {
        id
        title
        text
    }
}
`;

const GET_BLOG = gql`
    query getBlog($id: ID!) {
        getBlog(
            id: $id
        ) {
            id
            createdAt
            updatedAt
            title
            article
            likes
            postedBy {
                id
                name
            }
            comments {
                id
                content
            }
            relatedTag {
                id
                tag
            }
        }
    }
`;

const GET_ALL_TAGS = gql`
    query{
        allTags{
            id
            tag
        }
    }
`;


const POST_COMMENT = gql`
mutation postComment($content:String!, $blogId:ID!){
    postComment(
        content: $content, 
        blogId: $blogId
    ) {
      content
      postedBy
    }
  }
`;

const LIKE_BLOG = gql`
    mutation likeBlog($id: ID!){
        likeBlog(
            id: $id
        ) {
            id
            title
            article
            likes
        }
    }
`;

const SIGN_UP = gql`
    mutation signup($name: String!, $email: String!, $password: String!) {
        signup(
            name: $name,
            password: $password,
            email: $email
        ) {
           token
           user {
               id
           }
        }
    }
`;

const LOGIN = gql`
    mutation login($email: String!, $password: String!){
        login(
            email: $email,
            password: $password
        ) {
            token
        }
    }
`;

const GET_TAG = gql`
query getTag ($id: ID!){
    getTag(
        id: $id
    ) {
        id
        tag
        blogs {
            id
            title
        }
    }
  }
`;

let TOKEN = "aaa";

const GET_USER = gql`
     query getUser($id: ID!){
        getUser(id: $id){
            id
            createdAt
            name
            password
            email
            phone
            address
            interest
            blogs{
                id
                title
                content
            }
            comments {
                id
              } 
        }

        
     }
`;



export default {
    ME,
    UPDATE_USER,
    POST_BLOG,
    GET_ALL_BLOGS,
    ELASTIC_SEARCH,
    GET_BLOG,
    GET_ALL_TAGS,
    POST_COMMENT,
    LIKE_BLOG,
    SIGN_UP,
    LOGIN,
    TOKEN,
    GET_USER,
    GET_TAG

}