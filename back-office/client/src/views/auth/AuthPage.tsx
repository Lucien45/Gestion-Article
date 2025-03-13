import React from "react"

const AuthPage: React.FC = () => {
  return (
    <>
        <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username ou email" />
            </div>
            <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
            </div>
            <input type="submit" className="btn solid" />

            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
                <a href="#" className="social-icon">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                    <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                    <i className="fab fa-linkedin-in"></i>
                </a>
            </div>
        </form>
        <form action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" required/>
            </div>
            <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" required/>
            </div>
            <div className="input-field">
                <i className="fas fa-upload"></i>
                <input type="file" className="form-control"/>
            </div>
            <div className="input-field">
                <i className="fas fa-user-tag"></i>
                <select required >
                    <option disabled value="">selectionner un role</option>
                    <option disabled value="admin">ADMIN</option>
                    <option value="editeur">EDITEUR</option>
                    <option value="auteur">AUTEUR</option>
                </select>
            </div>
            <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" required/>
            </div>
            <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Comfirmer Password" required/>
            </div>
            <input type="submit" className="btn" value="Sign up" />
        </form>
    </>
  )
}

export default AuthPage