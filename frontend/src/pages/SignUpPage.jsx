import React from 'react'
import { axiosInstance } from '../lib/axios'
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare ,Mail,Lock, Eye, EyeOff, Loader2} from 'lucide-react';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from "react-hot-toast";
const SignUpPage = () => {

const [showPassword,setShowPassword] = useState(false);
//showing password state

const [formData,setFormData]=useState({
  fullName:"",
  email:"",
  password:"",
});

//form data object

const {signup,isSigningUp}=useAuthStore();
//use the zustand auth store to manage the state

const validateForm=()=>{

  if(!formData.fullName.trim()) return toast.error("FullName is required");
  if(!formData.email.trim()) return toast.error("Email is required");
  if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
  if(!formData.password.trim()) return toast.error("Password is required");
  return true;

};
//function to vlaidate the form

const handleSubmit=(e)=>{

  e.preventDefault();

  const success=validateForm()
  if (success===true)  signup(formData);

}

// on clicking the submit button this function will be called


  return (

    <div className="min-h-screen grid lg: grid-cols-2">

      {/* left side */}

      <div className="flex flex-col justify-center items-center p-6 sm:p-12">

        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">

            <div className="flex flex-col items-center gap-2 group">

              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center
               group-hover:bg-primary/20 transition-colors">

                  <MessageSquare className=" size-6  text-primary"/>


              </div>

              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>


            </div>

          </div>


            {/* submission form */}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Fullname input Field */}

            <div className="form-control">
              <label  className="label">
              <span className="label-text font-medium">FullName</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="size-5 text-base-content/40"/>
                  </div>
                  <input 
                  type="tetx"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e)=>setFormData({...formData,fullName:e.target.value})}
                   />
                </div>

                

            </div>

            {/* Email input Field */}
            <div className="form-control">
              <label  className="label">
              <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="size-5 text-base-content/40"/>
                  </div>
                  <input 
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="JohnDoe@mail.com"
                  value={formData.email}
                  onChange={(e)=>setFormData({...formData,email:e.target.value})}
                   />
                </div>
                 
            </div>

            {/* Password field */}
            <div className="form-control">
              <label  className="label">
              <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="size-5 text-base-content/40"/>
                  </div>
                  <input 
                  type={showPassword?"text":"password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="********"
                  value={formData.password}
                  onChange={(e)=>setFormData({...formData,password:e.target.value})}
                   />
                   <button
                   type="button"
                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
                   onClick={()=>setShowPassword(!showPassword)}
                   >
                    {showPassword?(
                        <EyeOff className="size-5 text -base-content"/>

                    ):<Eye className="size-5 text-base-content"/>}

                   </button>



                </div>
                 
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full" disbaled={isSigningUp}>
              {isSigningUp? (
                <>
                <Loader2 className="size-5 animate-spin"/>
                Loading...
                
                </>
              ):(
                "Create Account"
              )


              }


            </button>


          </form>

          {/*Sign In  Link */}

          <div className="text-center">
            <p className="text-base-content/60">
            Already have an Account?{" "}
            <Link to="/login" className="link link-primary">
            Sign In
            </Link>
            
            </p>

          </div>

        </div>

      </div>


      {/* Right Side */}

      <AuthImagePattern
      title="Join our community."
      subtitle="Connect with friends, share moments and stay in touch with your loved ones."
      />

    </div>

  );
};

export default SignUpPage;
