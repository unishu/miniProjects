import React, {useState, useEffect} from "react";
//import SignIn from "../MUI/SignIn"
import axios from "axios";
import ErrorMessage from "../../ErrorMessage";
import Loading from "../../Loading";
import { useNavigate, Link } from "react-router-dom";


export const Login = () => {

    //const userRef = useRef(); sets focus on first imput when component loads
    //const errRef = useRef(); sets focus on err mostly for assistive tech/screen reader


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false); //remove, replaced with react router to navigate to pg of our choice if authentication ins successful
    const [loading, setLoading] = useState(false);
    //const [success, setSuccess] = useState('') //corresponds to error message that we might get when you try to authenticate

    const navigate = useNavigate();
  

     useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/dashboard");
        }
     }, []);
    /*
    useEffect (() => {
        userRef.current.focus();
    }, []) */

    /* useEffect (() => { //esentially empties error message if the user changes the user and password state (or state of any obj in the []), essentially anything in the input form since they have seen the error message
        setErrMsg('');
    }, [email, password]) //or [email, password] whatever you decide to use as signin criteria */

   /*  const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);


        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        setLoading(true)
        let { data }= await axios.post('http://localhost:5000/api/users/login', {
            email, password,
        }, config
        );
   
        console.log(data)

    localStorage.setItem("user", JSON.stringify(data)); 
    navigate('/dashboard');  
    setLoading(false)
        } catch (error) {
            setError(error?.response?.data?.message);
            setLoading(false)
            

    }; */

    /* const handleLogin = (props) => {
        console.warn(email, password)
        props.history.push('/dashboard');
    }*/

   const submitHandler = async (e) => {
        e.preventDefault();
        console.warn( email, password); 
        setLoading(true)
   try {    
           /* const {
                userLogin: {user},
   } = getState() */
    
            let result = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setLoading(false)
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user", JSON.stringify(result));  
        setLoading(false)
    
        navigate('/mypets')
       // if(result.name) {

} catch (error) {
        setError(error.response.data.message);
    }
    setLoading(false)
        
    
    } 


  

    return (
        <>
      
            
        <div className="Auth-form-container ccontainer min-vh-100 d-flex align-items-center justify-content-center">
        <div className="Auth-form container">
            <div className="Auth-form-content col-8 col-md-7 col-lg-4 h-100 auth-background-col mx-auto ">
                <h2>Sign in</h2>
                <div className="auth-form-container text-start mt-4">
                   {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                   {loading && <Loading />}
                    <form onSubmit={submitHandler}
                        className="auth-fomr"
                        method="POST"
                        //onSubmit={authenticate}
                        autoComplete={"off"}
                    >
                        <div className="e-mail mb-3 floating-label">
                            <label className="emailheader">Email</label><br/>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">

                            </div>
                        </div>
                        <div className="password">
                            
                                <label className="password-header">Password</label><br/>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={password}
                                    placeholder="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-primary btn-sm"
                                    //onClick={(e) => togglePassword(e)}
                                >
                                    <i
                                        //className={showPassword ? "far fa-eye" : "far fa-eye-slash"}
                                    ></i>{" "}
                                </button>

                                <div className="invalid-feedback">

                                </div>
                            

                            <div className="form-check forgot-password-section">
                                <div className="remember checkbox">
                                </div>
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

                            <div className="forgot-password-option p-0 mb-3">
                                Forgot{" "}
                            <span class name="line" //onClick={changeAuthMode}
                            >
                            {/*router link here; a href below will be replaced by this */}
                            <a href="#">Password?</a> 
                            </span>
                        
                            </div>

    
                        </div>
                        <div className="text-center">
                            <button 
                                type="submit"
                                
                                className="btn btn-primary w-100 theme-btn mx-auto"
                                //onClick={handleLogin}
                            >
                                Sign In
                            </button>
                        </div>
                    </form>

                    <hr />
                    <div className="auth-option text-center">
                        Don't have an account?{" "}
                        <Link to="/register" variant = "body2">
                            Sign Up 
                            </Link>
                    
                        
                    </div>
                </div>
            </div>
            
           
        </div>
        </div>
        
        </>

    )
}



/*
  {success ? (
            <section>
                You are logged in!
                <br/>
                <a href="#">Go to home</a>
            </section>
        ) : (

            */