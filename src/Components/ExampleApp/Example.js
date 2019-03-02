import React, { Component } from 'react';

class Example extends Component {
    render() {
        let {name, age} = this.props;
        return (
            <li className="example">
                <div className="example-name">{name}</div>
                <div className="example-age">{age}</div>
            </li>
        )
    }
}

export default Example
