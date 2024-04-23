import React from "react";
import "./styles.css";

class Register extends React.Component{
    constructor(props){
        super();
        this.state={
            email:'',
            password:'',
            name: '',
            surname: '',
            phone_number: 0,
            city: '',
            error: ""
        }
    }
    onEmailChange = (event) =>{
        this.setState({email: event.target.value})
    }
    onPasswordChange = (event) =>{
        this.setState({password: event.target.value})
    }
    onNameChange = (event) =>{
        this.setState({name: event.target.value})
    }
    onSurnameChange = (event) =>{
        this.setState({surname: event.target.value})
    }
    onPhoneNumberChange = (event) =>{
        this.setState({phone_number: event.target.value})
    }
    onCityChange = (event) =>{
        this.setState({city: event.target.value})
    }
    handleChangeRouteToRegister = (newValue) => {
        this.props.changeRoute(newValue);
    }
    checkPhoneNumber(phone_number) {
        const regex = /^[0-9]{9}$/;
        if (regex.test(phone_number)) {
            return true;
        } else {
            this.setState({ error: "Podany numer telefonu jest nieprawidłowy" });
            return false;
        }
    }

    checkEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(email)) {
            return true;
        } else {
            this.setState({ error: "Podany adres e-mail jest nieprawidłowy" });
            return false;
        }
    }

    checkNameOrSurname(name, mode) {
        const regex = /^[A-Z][a-z]+$/;
        if (regex.test(name)|| !name.length === 0) {
            return true;
        } else {
            if (!regex.test(name)) {console.log("regex");}
            if (!name.length === 0) {console.log("length");}

            console.log(name);
            if(mode === "name"){
                this.setState({ error: "Podane imię jest nieprawidłowe" });
            }
            if(mode === "surname"){
                this.setState({ error: "Podane nazwisko jest nieprawidłowe" });
            }
            if(mode==="city"){
                this.setState({ error: "Podane miasto jest nieprawidłowe" });
            }
            return false;
        }
    }

    checkPassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (regex.test(password)) {
            return true;
        } else {
            this.setState({ error: "Podane hasło nie spełnia wymaganych kryteriów bezpieczeństwa, powinno składać się z co najmniej: 8-znaków, 1-wielkiej litery, 1-małej litery, 1-cyfry" });
            return false;
        }
    }

    onCreateUserClick = () =>{
        this.setState({error: ""});
        if(!this.checkEmail(this.state.email)){
            return;
        }
        if(!this.checkPassword(this.state.password)){
            return;
        }
        if(!this.checkPhoneNumber(this.state.phone_number)){
            return;
        }
        
        if(!this.checkNameOrSurname(this.state.name, "name")){
            return;
        }
        if(!this.checkNameOrSurname(this.state.surname, "surname")){
            return;
        }
        if(!this.checkNameOrSurname(this.state.city, "city")){
            return;
        }
        fetch('http://localhost:3000/Register/', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email:this.state.email,
                password:this.state.password,
                name: this.state.name,
                surname: this.state.surname,
                phone_number: this.state.phone_number,
                city: this.state.city,
            })
        }).then(response => response.json())
        .then(data=>{
            if(data.detail){
                const matches = data.detail.match(/\(([^)]+)\)/);
                console.log(matches);
                if(matches){
                    if(matches[1]==="phone_number"){
                        this.setState({error: "Podany numer telefonu jest nieprawidłowy"});
                    }
                    if(matches[1]==="email"){
                        this.setState({error: "Użytkownik o podanym adresie e-mail już istnieje"});
                    }
                }
                return;
            }   

            if(!data){
                console.log("Wrong authorization")
            }else{
                this.setState({succes: true});
                this.handleChangeRouteToRegister("signin");
                console.log("succes");
            }
        })
    }

    render(){
        return (
            <div className="centered">
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80 ">
                        <form className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f2 fw6 ph0 mh0" >Rejestracja</legend>
                                <div className="mt3">
                                    <label className={`db fw6 lh-copy f6 `} htmlFor="email-address">Adres e-mail</label>
                                    <input onChange={this.onEmailChange} className={`pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100`} type="email" name="email-address" id="email-address" />
                                </div>
                                <div className="mv3">
                                    <label className={`db fw6 lh-copy f6`} htmlFor="password">Hasło</label>
                                    <div>
                                        <input onChange={this.onPasswordChange} className={`b pa2 input-reset ba bg-transparent hover-bg-black hover-white  w-100`} type="password" name="password" id="password" />
                                    </div>
                                </div>
                                <div className="mt3">
                                    <label className={`db fw6 lh-copy f6 `} htmlFor="name">Imię</label>
                                    <input onChange={this.onNameChange} className={`pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100`} type="text" name="name" id="name" />
                                </div>
                                <div className="mt3">
                                    <label className={`db fw6 lh-copy f6 `} htmlFor="surname">Nazwisko</label>
                                    <input onChange={this.onSurnameChange} className={`pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100`} type="text" name="surname" id="surname" />
                                </div>
                                <div className="mt3">
                                    <label className={`db fw6 lh-copy f6 `} htmlFor="phone_number">Numer telefonu</label>
                                    <input onChange={this.onPhoneNumberChange} className={`pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100`} type="number" name="phone_number" id="phone_number" />
                                </div>
                                <div className="mt3">
                                    <label className={`db fw6 lh-copy f6 `} htmlFor="city">Miasto</label>
                                    <input onChange={this.onCityChange} className={`pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100`} type="text" name="city" id="city"/>
                                </div>
                            </fieldset>
                            
                            <div className="lh-copy mt3">
                                <input className="b ph3 pv2 input-reset ba  bg-transparent grow pointer f6 dib"  onClick={this.onCreateUserClick} type="button" value="Utwórz nowe konto" />
                                {this.state.error.length !== 0 && <p className="red">{this.state.error}</p>}
                            </div>                           
                        </form>
                    </main>
                </article>
            </div>
        )
    }
}
export default Register;