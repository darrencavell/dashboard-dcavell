import React from 'react';

class About extends React.Component {
    componentDidMount(){
        fetch("https://swapi.co/api/people")
            .then(response => response.json())
            .then(data => console.log(data))
    }
    render(){
        return(
            <div>
                <h1>About</h1>
            </div>
        )
    }
}

export default About;