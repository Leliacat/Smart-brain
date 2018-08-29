import React from 'react';


class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name:''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user.id ){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
    }

    render(){
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--silver mv4 mw6 shadow-5 center" style = {{background: 'rgba(240,255,240, .15)'}}>
                <main className="pa4 black-80">
                    <div className="measure">
                        
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <span className="f1 fw6 ph0 mh0" role='img' aria-label='emoji'>👽 </span>
                            <legend className="f1 fw6 ph0 mh0" style = {{marginBottom: '20px'}}>New account</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="user-name" style = {{marginTop: '30px'}}>Name</label>
                                <input 
                                onChange={ this.onNameChange }
                                className="pa2 input-reset bg-transparent hover-bg-white hover-black w-100" 
                                type="text" 
                                name="user-name"  
                                id="user-name"
                                autoComplete="user-name"/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                onChange={ this.onEmailChange }
                                className="pa2 input-reset bg-transparent hover-bg-white hover-black w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                autoComplete="user-email"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                onChange={ this.onPasswordChange }
                                className="pa2 input-reset bg-transparent hover-bg-white hover-black w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                autoComplete="current-password"/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                            onClick={ this.onSubmitSignIn }
                            className="br2 ph3 pv2 input-reset ba f4 white bg-light-purple grow pointer dib" 
                            type="submit" 
                            value="register"/>
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('signin')} href="#0" className="f6 link dim black db pointer">SignIn</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;