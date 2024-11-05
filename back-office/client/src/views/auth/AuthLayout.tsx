import { useEffect, useRef } from 'react'
import { Outlet } from 'react-router';
import log from '../../../public/log.svg'
import register from '../../../public/register.svg'
import '../../assets/css/auth.css'
import '../../assets/css/auth_responsive.css'

const AuthLayout = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const signInBtn = container?.querySelector('#sign-in-btn');
    const signUpBtn = container?.querySelector('#sign-up-btn');

    const handleSignUpClick = () => container?.classList.add('sign-up-mode');
    const handleSignInClick = () => container?.classList.remove('sign-up-mode');

    signUpBtn?.addEventListener('click', handleSignUpClick);
    signInBtn?.addEventListener('click', handleSignInClick);

    return () => {
      signUpBtn?.removeEventListener('click', handleSignUpClick);
      signInBtn?.removeEventListener('click', handleSignInClick);
    };
  }, []);
  return (
    <div className="container" ref={containerRef}>
      <div className="forms-container">
        <div className="signin-signup">
          <Outlet />
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src={log} className="image" alt="Sign up illustration" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Already a member?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src={register} className="image" alt="Sign in illustration" />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout