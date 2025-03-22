/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, FormEvent, useState } from "react"
import { Utils } from "../../utils/Utils";
import { UserService } from "../../services/user.service";
import { Token } from "../../utils/Token";

interface SignInData {
    identification: string;
    password: string;
}

const AuthPage: React.FC = () => {
    const [signInData, setSignInData] = useState<SignInData>({ identification: '', password: '' });
    const [signUpData, setSignUpData] = useState({ username: '', email: '', password: '', confirmPassword: '', preview: '', role: ''});

    const [image, setImage] = useState<File | null>(null);

    const loadProfile = (e: ChangeEvent<HTMLInputElement>) => {
        const photo = e.target.files?.[0];
        if (photo) {
            setImage(photo);
            setSignUpData({ ...signUpData, preview: URL.createObjectURL(photo) });
            console.log(photo);
        }
    };
    const handleSingUp = async (e: FormEvent) => {
        e.preventDefault()

        if (signUpData.password !== signUpData.confirmPassword) {
            Utils.errorPage('Les mots de passe ne correspondent pas ')
            return;
        }

        Utils.confirmMessage(
            "Êtes-vous sûr de vouloir créer un compte avec ces informations ?", 
            async () => {
                try {
                    const formData = new FormData();
                    formData.append('email', signUpData.email);
                    formData.append('username', signUpData.username);
                    formData.append('password', signUpData.password);
                    if (image) {
                        formData.append('profile', image);
                    }
                    if (signUpData.role) {
                        formData.append('role', signUpData.role);
                    }

                    await UserService.SignUp(formData)
                    .then((res) => {
                        console.log(res);
                        Utils.success('Votre compte a été créé avec succès ✅!');
                        setImage(null);
                        setSignUpData({ username: '', email: '', password: '', confirmPassword: '', preview: '', role:''});
                    })
                    .catch((error) => {
                        Utils.errorPage(error.response?.data?.message || 'Une erreur s\'est produite ❌');
                        setImage(null);
                        setSignUpData({ username: '', email: '', password: '', confirmPassword: '', preview: '', role:''});
                    });
    
                } catch (error: any) {
                    Utils.errorPage(error.response?.data?.message || 'Une erreur s\'est produite dans API ❌');
                }
            },
            () => { 
                console.log('Inscription annulée par l\'utilisateur.');

            }
        );
    }

    const handleSingIn = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const data = {
                identification: signInData.identification,
                password: signInData.password,
            };

            UserService.SignIn(data)
            .then((res)=>{
                setSignInData({identification: '', password: ''});
                // localStorage.setItem("token", res.data.token);
                Token.AddToken('authUser', res.data.token);
                window.location.href = '/admin';  
            })
            .catch(() => {
              Utils.errorPage("Mot de passe ou login incorrect ")
            })
        } catch (error: any) {
            Utils.errorPage(error.response?.data?.message);
        }
    }
  return (
    <>
        <form onSubmit={handleSingIn} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" 
                    value={signInData.identification} 
                    onChange={(e) => setSignInData({ ...signInData, identification: e.target.value })}
                    placeholder="Username ou email" 
                />
            </div>
            <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" 
                value={signInData.password} 
                onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                placeholder="Password" />
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
        <form onSubmit={handleSingUp} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" 
                    value={signUpData.username} 
                    onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })} 
                    placeholder="Username" 
                    required
                />
            </div>
            <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" 
                    value={signUpData.email} 
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })} 
                    placeholder="Email" 
                    required
                />
            </div>
            <div className="input-field">
                <i className="fas fa-upload"></i>
                <input type="file" onChange={loadProfile}  
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '16px',
                        outline: 'none'
                    }}
                />
            </div>
            <div style={{ flex: 1 }}>
                {signUpData.preview && (
                    <div style={{ textAlign: 'center' }}>
                        <img
                            src={signUpData.preview}
                            alt="Preview"
                            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                    </div>
                )}
            </div>
            <div className="input-field">
                <i className="fas fa-user-tag"></i>
                <select value={signUpData.role} 
                    onChange={(e) => setSignUpData({ ...signUpData, role: e.target.value })} 
                    required 
                >
                    <option value="">selectionner un role</option>
                    <option value="editeur">EDITEUR</option>
                    <option value="auteur">AUTEUR</option>
                </select>
            </div>
            <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" 
                    value={signUpData.password} 
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })} 
                    placeholder="Password" required
                />
            </div>
            <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" 
                    value={signUpData.confirmPassword} 
                    onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })} 
                    placeholder="Comfirmer Password" required/>
            </div>
            <input type="submit" className="btn" value="Sign up" />
        </form>
    </>
  )
}

export default AuthPage