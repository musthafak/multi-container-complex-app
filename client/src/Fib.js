import React, { Component } from "react";
import axios from "axios";;

class Fib extends Component {
    state = {
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({values: values.data});
    }

    renderValues() {
        const entries = [];
        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For Index {key} I calculated {this.state.values[key]}
                </div>
            );
        }
        
        return entries;
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post('/api/values', {
            index: this.state.index
        });
        this.setState({index: ''});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter your index:
                    </label>
                    <input value={this.state.index}
                    onChange={event => this.setState({index: event.target.value})} />
                    <button>Submit</button>
                </form>

                <h3>Calculated values:</h3>
                {this.renderValues()}
            </div>
        )
    }

};

export default Fib;
