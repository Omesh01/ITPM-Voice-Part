import React from 'react';
import '../App.css';

class User extends React.Component {

    constructor(props) {
        super(props);
    }

    render (){
        return (
            <div class="container">
                <img class="home_image" src={ './hero.png' }/>
            <div className="col-lg-12">
            <br/>
                <div class="home_Title">
                    <h5>text data </h5>
                    <a class="btn btn-outline-primary col-md-12" href="/main" >Start</a>
                </div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
            </div>
        );
    }
}

export default User;
