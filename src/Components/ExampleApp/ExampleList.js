import React, { Component } from 'react';
import graphql from 'react-apollo';
import gql from "graphql-tag";

const getExampleQuery = gql`
    {
        examples {
            id
            name
            age
        }
    }
`

class ExampleList extends Component
{
    renderExamples = (examples) => {
        return examples.map(example => {
            return (
                <ul>
                    <li>example.id</li>
                    <li>example.name</li>
                    <li>example.age</li>
                </ul>
                )
        });
    };

    render() {
        return (
            <div className="header">
                {this.renderExamples(this.props)}
            </div>
        )
    }
}

export default graphql(getExampleQuery)(ExampleList)