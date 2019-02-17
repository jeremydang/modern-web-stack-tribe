import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { AppoloProvider, ApolloProvider } from 'react-apollo';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import ExampleList from './ExampleList';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const getExampleQuery = gql`
    {
        examples {
            id
            name
            age
        }
    }
`
class Example extends Component {
    render() {
        console.log(this.props);
        return (
            <ApolloProvider client={client}>
                <Query query={getExampleQuery}
                >
                    {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;

                    console.log(data)
                    }}
                </Query>
            </ApolloProvider>
        )
    }
}

export default Example
