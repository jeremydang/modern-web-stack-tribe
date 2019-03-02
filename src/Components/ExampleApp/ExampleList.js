import React, { Component } from 'react';
import Example from './Example';

class ExampleList extends Component {
    renderExamples = () => {
        return this.props.examples.map((example, index) => {
            return <Example name={example.name} age={example.age} key={example.id}/>
        })
    };

    render() {
        return (
            <ul className="example-list">
                {this.renderExamples()}
            </ul>
        )
    }
}

export default ExampleList
