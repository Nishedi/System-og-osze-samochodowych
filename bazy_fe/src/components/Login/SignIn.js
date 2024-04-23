import React from "react";
import "./styles.css";

class SignIn extends React.Component{
    constructor(props){
        super();
        this.state={
            email:'',
            password:'',
            succes: false
        }
    }
    onEmailChange = (event) =>{
        this.setState({email: event.target.value})
    }
    onPasswordChange = (event) =>{
        this.setState({password: event.target.value})
    }
    handleChangeRouteToRegister = (newValue) => {
        this.props.changeRoute(newValue);
    }
    handleChangeUserData = (newData) =>{
        this.props.changeUserData(newData);
    }

    onSignInClick = () =>{
        if(this.state.email.length===0 || this.state.password.length===0) {
            this.setState({succes: true});
            return;
        }
        this.props.changeSignedIn(true);
        this.setState({succes: false});
        fetch('http://localhost:3000/signIn/', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(response => response.json())
        .then(data=>{
            console.log(data);
            if(data.message==="Failed logging") this.setState({succes: true});
            else{
                this.handleChangeUserData(data);
                this.handleChangeRouteToRegister("browser");
            }
        })
    }

    onCreateUserClick = () =>{
        this.handleChangeRouteToRegister("register");
    }
    

    emailOrPasswordCorrectness = (bool) => {
        return (
            <div>
                <div className="mt3">
                    <label className={`db fw6 lh-copy f6 ${bool?"red":""}`} htmlFor="email-address">Adres e-mail</label>
                    <input onChange={this.onEmailChange} className={`pa2 input-reset ba bg-transparent hover-bg-black hover-white ${bool ? "red b--red" : ""} w-100`} type="email" name="email-address" id="email-address" />
                </div>
                <div className="mv3">
                    <label className={`db fw6 lh-copy f6 ${bool?"red":""}`} htmlFor="password">Hasło</label>
                    <div>
                        <input onChange={this.onPasswordChange} className={`b pa2 input-reset ba bg-transparent hover-bg-black hover-white ${bool ? "red b--red" : ""} w-100`} type="password" name="password" id="password" />
                        {bool && <p className="red">nieprawidłowy e-mail lub hasło</p>}
                    </div>
                </div>
            </div>
        );
    }
    

    render(){
        return (
            <div className="centered">
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80 ">
                        <form className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f2 fw6 ph0 mh0" >Zaloguj się</legend>
                                {this.emailOrPasswordCorrectness(this.state.succes)}
                            </fieldset>
                            <div className="">
                                <input
                                    onClick={this.onSignInClick}
                                    className="b ph5 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="button"
                                    value="Zaloguj"
                                />
                            </div>
                            <div className="lh-copy mt3">
                                <input className="b ph3 pv2 input-reset ba  bg-transparent grow pointer f6 dib"  onClick={this.onCreateUserClick} type="button" value="Utwórz nowe konto" />
                            </div>                            
                        </form>
                    </main>
                </article>
            </div>
        )
    }
}
export default SignIn;