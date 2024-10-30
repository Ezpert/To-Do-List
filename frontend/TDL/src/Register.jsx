import axios from 'axios'
import React from "react";


class Register extends React.Component{

    state = {
        details: [],
        postFormData: {},
        postResponse: null
    }


    componentDidMount() {
        let data;
        axios.get("http://localhost:8000/register/").then(res =>{
            data = res.data;
            this.setState({
                details:data
            });
        })
            .catch(err => {return "Bye!"})
    }

   //Make a button to go back to the sign in page
    goToMain(){
        axios.get("http://localhost:8000/signin/").then(response =>{
            console.log(response.data)
        })
            .catch(error => {
                console.error('Error:', error)
            })
    }



    handleFormSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/register/", this.state.postFormData).then(res => {
            console.log(res.data);
            this.setState({
                postResponse: res.data,
                postFormData: {}
            });

        })
            .catch(err => console.error("Error", err));
    }

    updateData = (newData) => {
        this.setState(prevState =>({
            postFormData: {...prevState.postFormData, ...newData}
        }))

    }

    render(){
        return(
            <div>
                <form onSubmit={this.goToMain}>
                    <button type="submit">Submit</button>

                </form>
                <header>Data Generated From Django</header>
                {this.state.details.map((output, id) => (
                    <div key={id}>
                        <h1>{output && output.username ? output.username : 'Username not available'}</h1>
                    </div>
                ))}
                <form onSubmit={this.handleFormSubmit}>
                    <input
                        type = "text"
                        placeholder = "Username"
                        value={this.state.postFormData.username || ''}
                        onChange={(e) => this.updateData({username: e.target.value})}
                    />
                    <input
                        type = "password"
                        placeholder= "Password"
                        value = {this.state.postFormData.password || ''}
                        onChange={(e) => this.updateData({password: e.target.value})}
                    />
                    <button type="submit">Submit</button>

                </form>
                {this.state.details.map((output, id) => (
                    <div key={id}>
                        <h1>{output.username}</h1>

                    </div>

                ))}

                {this.state.postResponse && (
                    <p>POST Response: {JSON.stringify(this.state.postResponse)}</p>
                )}
                <p>funciona?</p>
            </div>


        )
    }


}


export default Register