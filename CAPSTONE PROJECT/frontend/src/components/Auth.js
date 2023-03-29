import React, { useState, useEffect } from "react"

export const Auth = () => {

  //const userRef = useRef(); sets focus on first imput when component loads
  //const errRef = useRef(); sets focus on err mostly for assistive tech/screen reader


  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('') //remove, replaced with react router to navigate to pg of our choice if authentication ins successful
  const [success, setSuccess] = useState('') //corresponds to error message that we might get when you try to authenticate

  /*
  useEffect (() => {
      userRef.current.focus();
  }, []) */

  useEffect (() => { //esentially empties error message if the user changes the user and password state (or state of any obj in the []), essentially anything in the input form since they have seen the error message
      setErrMsg('');
  }, [email, password]) //or [email, password] whatever you decide to use as signin criteria

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(email);

      setSuccess('true')

  }
  
  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  if (authMode === "signin") {
    
    return (
      
      <div className="Auth-form-container col-8 col-md-7 col-lg-4 h-100 auth-background-col mx-auto mt-5">
        <div className="Auth-form d-flex flex-column align-content-end">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="auth-form-container text-start">
            <form onSubmit={handleSubmit}
                        className="auth-fomr"
                        method="POST"
                        //onSubmit={authenticate}
                        autoComplete={"off"}
                    >
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                id="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="invalid-feedback">

              </div>
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div classname="form-check p-0 ">
                <input 
                    classname="form-check-input" 
                    type="checkbox" 
                    value="" 
                    id="flexCheckDefault" 
                /> {" "}
                <label class="form-check-label" for="flexCheckDefault">
                    Remember me
                </label>
            </div>
            <div className="forgot-password-option p-0 ">
                                Forgot {" "}
                            <span class name="line">
                            {/*router link here; a href below will be replaced by this */}
                            <a href="#">Password?</a> 
                            </span>
                        
                            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            </form>
          </div>
          
        </div>
      </div>
      </div>
    )
  }

  

  return (
    <div className="Auth-form-container col-8 col-md-7 col-lg-4 mx-auto mt-5">
      <form className="Auth-form d-flex flex-column align-content-end ">
        <div className="Auth-form-content ">
          <h3 className="Auth-form-title">Create account</h3>
    
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
        </div>
      </form>
    </div>
  )
}