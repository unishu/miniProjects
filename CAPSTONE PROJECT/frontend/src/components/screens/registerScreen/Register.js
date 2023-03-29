import React, {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom"
import ErrorMessage from "../../ErrorMessage";
import axios from "axios";
import Loading from "../../Loading";


export const Register = () => {
    //const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pic, setPic] = useState("");
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [picMessage, setPicmessage] = useState("");
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);



    const [validate, setValidate] = useState('');
    const [showPassword, setShowPassword] = useState(''); 
    const [success, setSuccess] = useState('')

     /*const collectInfo = () => {
        console.log(username, name, email, password);
    } */
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem("user");
        if(userInfo) {
           navigate("/dashboard") 
        }
        
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        
     /*   if (password !== confirmpassword) {
            setMessage('Passwords Do Not Match');
        } else {
            setMessage(null)
            try { 
                const config = {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        //"Content-type": "applications/json",
                        
                    }
                };
                

                setLoading(true);
                let { data } = await axios.post("http://localhost:5000/api/users/register", {
                    name, email, password
                }, config
                );
                
console.log(data)
                
                localStorage.setItem("user", JSON.stringify(data));
                navigate('/dashboard');
                setLoading(false);
            } catch (error) {
                setError(error?.response?.data?.message);
                setLoading(false)
            }
        };

       
*/
       if (password !== confirmpassword) {
        setMessage('Passwords do not match');
        setLoading(false)
       } else {
        setMessage(null);
      try { 

      let result = await fetch("http://localhost:5000/api/users/register", {
            //mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result =  await result.json();
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result))
        setLoading(false)
        navigate('/mypets')

    }catch (error){
        setError(error.response.data.message);

    }
         }
    
        // navigate ('/dashboard') need to import navigate from react dom router
        //or history.push(route link)

        //setSuccess('true') */
    }

   

  return (
    <>
    
    
    <div className="Auth-form-container ccontainer min-vh-100 d-flex align-items-center justify-content-center">
    <div className="Auth-form-container col-8 col-md-7 col-lg-3">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message} </ErrorMessage>}
        {loading && <Loading />}
        <form className="Auth-form d-flex flex-column align-content-end"
         onSubmit={handleSubmit}
            
            method= "POST"
            //onSubmit={register}
            autoComplete={"off"}
        >
            <div className="Auth-form-content">
                <h2 className="Auth-form-title">Create Account</h2>

                
                        
                        
                        <div className="form-group mb-3">
                            <label>Name</label><br/>
                            <input
                                type="text"
                                className="form-control mt-1"
                                //className={`${}`}
                                id="name"
                                name="name"
                                value={name}
                                placeholder="e.g Jane Doe "
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div
                                className="invalid-feedback text-start"
                            >
                                {}
                            </div>
                        </div>

                        

                        <div className="form-group mb-3">
                        <label>Email</label><br/>
                            <input
                                type="email"
                                className="form-control mt-1"
                                //className={`${}`}
                                id="email"
                                name="email"
                                value={email}
                                placeholder="Your Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <div className="invalid-feedback text-start"
                            >
                                {}
                            </div>
                        </div>

                        <div className="password mb-3">
                            <label>Password</label><br/>
                                <input
                                type="password"
                                    //type={ showPassword? "text": "password"}
                                    className="form-control mt-1"
                                    //className={`${}`}
                                    id="password "
                                    name="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                
                                <div 
                                //className={`${}`}
                                >
                                    {}
                                </div>
                                

                        </div>
                    
                        <div className="confirmpassword mb-3">
                            <label>Confirm Password</label><br/>
                                <input
                                type="password"
                                    //type={ showPassword? "text": "password"}
                                    className="form-control mt-1"
                                    //className={`${}`}
                                    id="confirmpassword "
                                    name="confirmpassword"
                                    value={confirmpassword}
                                    placeholder="Confirm Password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />

                                <div 
                                //className={`${}`}
                                >
                                    {}
                                </div>
                                

                        </div>

                
                        <div className="d-grid gap-2 mt-3">
                            <button
                                type="submit"
                                className="btn btn-primary w-100 theme-btn mx-auto"
                                //onClick={collectInfo}
                            >
                                Sign Up
                            </button>
                        </div>
                    

                    <hr/>
                    <div className="auth-option text-center">
                        Have an account?{" "}
                        <Link to="/login" variant = "body2">
                            Sign In 
                            </Link>
                    </div>
                
    
            </div>

        </form>
    </div>
    </div>
    
        
    
    </>
    
  ) }


//export default Register

/*

<div className="form-group mb-3">
                            <label>Username</label><br/>
                            <input
                                type="text"
                                className="form-control mt-1"
                                //className={`${}`}
                                id="username"
                                name="username"
                                value={username}
                                placeholder="e.g Jane Doe"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <div
                                className="invalid-feedback text-start"
                            >
                                {}
                            </div>
                        </div> */