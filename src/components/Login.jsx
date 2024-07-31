import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../backend/firebase";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // console.log("User signed in:", userCredential.user);
      navigate("/");
      // Handle successful sign-in (e.g., redirect to another page)
    } catch (error) {
      alert(error.message); // Set the error message
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // console.log("User signed in with Google:", result.user);
      navigate("/");
      // Handle successful Google sign-in (e.g., redirect to another page)
    } catch (error) {
      alert(error.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent successfully. Check your inbox."); // Inform user
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="w-full h-full">
      <div
        className="relative w-full h-[115vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.firstnaukri.com/collegedir/index.php/MediaService/getCollegePhoto/colid/52545ad5a6fcdda9d0bc6df3be224c1cbceb69fcb0f6effc/curid/4183')",
        }}
      >
        <div className="w-[90%] md:w-[30%] h-fit pb-8 py-5 px-5 md:px-10 relative mx-auto md:absolute top-10 right-0 md:right-10 rounded-xl shadow-[0_0px_20px_0px_rgba(0,0,0,0.3)] shadow-black bg-white opacity-90">
          <h1 className="text-2xl md:text-3xl font-[750] text-green-900 relative py-1 left-0 text-left">
            Login or create an account
          </h1>
          <div className="mt-3">
            <h1 className="text-md font-[600] relative  left-0 text-left mb-1">
              Email address
            </h1>
            <input
              type="email"
              value={email}
              className="bg-transparent outline-none placeholder-green-800 pl-2 py-2 w-full rounded-xl border-2 border-[#E8DECF] "
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h1 className="text-md font-[600] relative  left-0 text-left">
              Password
            </h1>
            <input
              type="password"
              value={password}
              className="bg-transparent outline-none placeholder-green-800 pl-2 py-2 w-full rounded-xl border-2 border-[#E8DECF] "
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <h1
            className="text-sm text-green-900 font-[500] relative  left-0 cursor-pointer text-center m-auto w-fit py-2 mt-3"
            onClick={handleForgotPassword}
          >
            Forgot password?
          </h1>
          <div
            className="bg-[#F28F0D] hover:bg-[#f89f2b] font-[600] px-4 py-2 md:py-3 rounded-xl cursor-pointer  md:block text-center mt-3"
            onClick={(e) => handleSignIn(e)}
          >
            Log in
          </div>
          <div
            className="bg-green-200 hover:bg-green-300 flex justify-center items-center font-[600] px-4 py-2 rounded-xl cursor-pointer text-center mt-3 gap-2"
            onClick={handleGoogleSignIn}
          >
            <img src={{}} alt="" />
            <div>Continue with Google</div>
          </div>
          <h1 className="text-sm text-green-900 font-[500] relative  left-0 text-center py-2 md:py-3 ">
            Don`t have an account?
          </h1>
          <Link
            to="/signup"
            className="bg-green-200 hover:bg-green-300 flex justify-center items-center font-[600] px-4 py-2 md:py-3 rounded-xl cursor-pointer text-center gap-2"
          >
            <div>Sign up</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
