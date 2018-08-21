import React from 'react';


class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
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
            <article className="br3 ba b--silver mw6 shadow-5 center" style = {{background: 'rgba(240,255,240, .15)'}}>
                <main className="pa4 black-80">
                    <div className="measure">
                        
                        <fieldset id="sign_up" className="ba b--transparent mv2 ph0 mh0">
                        <span className="f1 fw6 ph0 mh0" role='img' aria-label='emoji'>👽 </span>
                            <legend className="f1 fw6 ph0 mh0" style = {{marginBottom: '20px'}}>Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address" style = {{marginTop: '30px'}}>Email</label>
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
                            value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        ); 
    }
}

export default SignIn;