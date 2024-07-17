import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { LoginUser, reset} from "../features/authSlice";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { user, isError, isSuccess, isLoading, message} = useSelector (
        (state) => state.auth
    );

    useEffect(() => {
        if (user || isSuccess) {
        navigate("/home");
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);

    const Auth = (e) => {
      // saat submit page tidak reload
        e.preventDefault();
        dispatch(LoginUser({ email, password }));
        console.log(email,'dan',password)
    };


    return (

        <div>
            <h1> Login  </h1>
        
            <form onSubmit={Auth} >
            
            <div>
            <label htmlFor="">Email</label>
            <input 
                type="text"
                id="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-ijo4 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username"
            />
            </div>
            
            
            <div>
            <label htmlFor="">Pasword</label>
            <input 
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-ijo4 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
            />
            </div>

            <div>
                <button type="submit" >Kirim</button>
            </div>
            
            </form>
        </div>

  )
}

export default Login