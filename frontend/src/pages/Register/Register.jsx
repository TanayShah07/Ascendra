import "./Register.css";
import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

const Register = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        college: "",
        branch: "",
        graduation_year: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(form.password !== form.confirmPassword){

            toast.error("Passwords do not match");

            return;

        }

        try{

            const payload = {
                full_name: form.full_name,
                email: form.email,
                password: form.password,
                college: form.college,
                branch: form.branch,
                graduation_year: Number(form.graduation_year)
            };

            await registerUser(payload);

            toast.success("Registration Successful");

            navigate("/login");

        }

        catch(err){

            toast.error(
                err.response?.data?.detail || "Registration Failed"
            );

        }

    };

    return(

<div className="register-page">
    <button
    className="back-home"
    onClick={() => navigate("/")}
>

    <ArrowLeft size={18} />

    Back to Home

</button>

<form
className="register-card"
onSubmit={handleSubmit}
>

<h1>Create Account</h1>

<p>

Join Ascendra and start your AI Placement Journey

</p>

<input
type="text"
placeholder="Full Name"
name="full_name"
onChange={handleChange}
required
/>

<input
type="email"
placeholder="Email"
name="email"
onChange={handleChange}
required
/>

<input
type="text"
placeholder="College"
name="college"
onChange={handleChange}
required
/>

<input
type="text"
placeholder="Branch"
name="branch"
onChange={handleChange}
required
/>

<input
type="number"
placeholder="Graduation Year"
name="graduation_year"
onChange={handleChange}
required
/>

<input
type="password"
placeholder="Password"
name="password"
onChange={handleChange}
required
/>

<input
type="password"
placeholder="Confirm Password"
name="confirmPassword"
onChange={handleChange}
required
/>

<button>

Create Account

</button>

<span>

Already have an account?

<b onClick={()=>navigate("/login")}>

 Login

</b>

</span>

</form>

</div>

);

};

export default Register;