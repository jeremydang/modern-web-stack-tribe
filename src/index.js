import './index.css';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import React from "react";
import { render } from "react-dom";
import { ApolloProvider, Query } from "react-apollo";
import ExampleList from './Components/ExampleApp/ExampleList';
//ReactDOM.render(<Example />, document.getElementById('root'));

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql"
});

const App = () => (
    <ApolloProvider client={client}>
        <Query
        query={gql`
        {
            examples {
                name
                age
                id
            }
        }
        `}
    >
        {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return <ExampleList examples={data.examples}/>
        }}
    </Query>
    </ApolloProvider>
);

  
render(<App />, document.getElementById("root"));
