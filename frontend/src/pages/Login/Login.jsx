import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const Login = () => {

    const navigate=useNavigate();

    const { login } = useAuth();

    const [form,setForm]=useState({

        email:"",

        password:""

    });

    const handleChange=(e)=>{

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    };

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try{

            const res=await loginUser(form);

            login(res.data.access_token);

            toast.success("Login Successful");

            navigate("/dashboard");

        }

        catch{

            toast.error("Invalid Credentials");

        }

    };

    return(

<div className="login-page">
    <button
    className="back-home"
    onClick={() => navigate("/")}
>

    <ArrowLeft size={18} />

    Back to Home

</button>

<form

className="login-card"

onSubmit={handleSubmit}

>

<h1>

Welcome Back

</h1>

<p>

Login to continue your AI Interview Journey

</p>

<input

type="email"

name="email"

placeholder="Email"

value={form.email}

onChange={handleChange}

/>

<input

type="password"

name="password"

placeholder="Password"

value={form.password}

onChange={handleChange}

/>

<button>

Login

</button>

<span>

Don't have an account?

<b onClick={()=>navigate("/register")}>

Register

</b>

</span>

</form>

</div>

);

};

export default Login;