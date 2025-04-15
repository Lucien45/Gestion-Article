/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { UserService } from '../../services/user.service';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // await signUp(email, password, username);
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Créer un compte
        </h2>
        
        {error && (
          <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Nom d'utilisateur
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="johndoe"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="vous@exemple.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Création...' : 'Créer un compte'}
          </button>
        </form>
      </div>
    </div>
  );
};

export const RegisterForm1: React.FC = () => {
  const navigate = useNavigate();
  const [NewUserData, setNewUserData] = useState({ 
    username: '', email: '', password: '', confirmPassword: '', preview: '',
    nom: '', prenom: '', civilite: '', date_naissance: ''
  });
  const [image, setImage] = useState<File | null>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [PasswordError, setPasswordError] = useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const loadProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const photo = e.target.files?.[0];
    if (photo) {
      setImage(photo);
      setNewUserData({ ...NewUserData, preview: URL.createObjectURL(photo) });
      console.log(photo);
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    if (e.target.name === "nom") {
      const value = e.target.value;
      if (/^[A-Za-z' ]*$/.test(value)) {
        setNewUserData({ ...NewUserData, nom: value});
      }
    }
    if (e.target.name === "prenom") {
      const value = e.target.value;
      if (/^[A-Za-z' ]*$/.test(value)) {
        setNewUserData({ ...NewUserData, prenom: value});
      }
    }
    if (e.target.name === "civilite") {
      setNewUserData({ ...NewUserData, civilite: e.target.value});
    }
    if (e.target.name === "email") {
      // Email validation regex pattern
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const value = e.target.value;
      setNewUserData({ ...NewUserData, email: value});
      if (!emailPattern.test(value)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }
    if (e.target.name === "password") {
      setNewUserData({ ...NewUserData, password: e.target.value});
    }
    if (e.target.name === "username") {
      setNewUserData({ ...NewUserData, username: e.target.value});
    }
    if (e.target.name === "date_naissance") {
      setNewUserData({ ...NewUserData, date_naissance: e.target.value});
    }
  };

  const handleConfirmPasswordChange = (e: { target: { value: string } }) => {
    const confirmPassword = e.target.value;
    setNewUserData((prevData) => ({ ...prevData, confirmPassword }));
  
    if (NewUserData.password !== confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("username", NewUserData.username);
    formData.append("email", NewUserData.email);
    formData.append("password", NewUserData.password);

    if (NewUserData.nom) {
      formData.append("nom", NewUserData.nom);
    }

    if (NewUserData.prenom) {
      formData.append("prenom", NewUserData.prenom);
    }

    if (image) {
      formData.append('profile', image);
     }
 
    if (NewUserData.date_naissance) {
      formData.append("date_naissance", NewUserData.date_naissance);
    }
    formData.append("civilite", NewUserData.civilite);

    try {
      const response = await UserService.SignUp(formData);
      console.log("Réponse serveur :", response);
      setNewUserData({ 
        username: '', email: '', password: '', confirmPassword: '', preview: '',
        nom: '', prenom: '', civilite: '', date_naissance: ''
      });
      setImage(null);
      navigate('auth/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.response?.data?.message ||'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        {error && (
          <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          INSCRIPTION
        </h2>
        <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="fullname">Nom</label>
              <input className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500" 
                type="text" id="nom" name="nom" value={NewUserData.nom} onChange={handleChange}
              />
            </div>
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="fullname">Prénom</label>
              <input className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500" 
                type="text" id="prenom" name="prenom" value={NewUserData.prenom} onChange={handleChange}
              />
            </div>
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="email">Email</label>
              <input className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500" 
                type="email" id="email" name="email" value={NewUserData.email} onChange={handleChange} required
              />
              {emailError ? <span className="text-red-500 text-sm">L'adresse email n'a pas un format valide</span> : ""}
            </div>
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="username">Nom d'utilisateur</label>
              <input className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500" 
                type="text" id="username" name="username" value={NewUserData.username} onChange={handleChange} required
              />
            </div>
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="password">Mot de passe</label>
              <input className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500" 
                type="password" id="password" name="password" value={NewUserData.password} onChange={handleChange} required
              />
            </div>
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="password">Confirmer le mot de passe</label>
              <input className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500" 
                type="password" id="password" value={NewUserData.confirmPassword} onChange={handleConfirmPasswordChange} required
              />
            </div>
          </div>
          <div className="mt-5 grid  gap-5">
            {PasswordError ? <span className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">Les deux mots de passe ne sont pas identique</span> : ""}
          </div>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="dob">Date de naissance</label>
              <input className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500" 
                type="date" id="date_naissance" name="date_naissance" value={NewUserData.date_naissance} onChange={handleChange}
              />
            </div>
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="gender">Civilité</label>
              <select className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500" 
                id="civilite" name="civilite" value={NewUserData.civilite} onChange={(e) => setNewUserData({ ...NewUserData, civilite: e.target.value })} 
              >
                <option value="" disabled>sélectionnez votre civilité</option>
                <option value="masculin">Masculin</option>
                <option value="féminin">Féminin</option>
              </select>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
            <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="photo">Photo de profile</label>
              <input className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500" 
                type="file" accept="image/*" onChange={loadProfile}
              />
            </div>
            <div>
              {NewUserData.preview && (
                <>
                  <img src={NewUserData.preview} alt="Aperçu" style={{ maxWidth: "150px", marginTop: "8px" }} />
                </>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div>
              <button className="flex items-center justify-center py-2 px-20 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                <svg viewBox="0 0 24 24" height={25} width={25} y="0px" x="0px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707 C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321 C6.4099731,6.9193726,8.977478,5,12,5z" fill="#F44336" />
                  <path d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12 c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458 l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z" fill="#2196F3" />
                  <path d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511 C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215 C5.1484375,13.6044312,5,12.8204346,5,12z" fill="#FFC107" />
                  <path d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959 C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834 C14.7412109,18.5588989,13.4284058,19,12,19z" fill="#00B060" />
                  <path opacity=".1" d="M12,23.75c-3.5316772,0-6.7072754-1.4571533-8.9524536-3.7786865C5.2453613,22.4378052,8.4364624,24,12,24 c3.5305786,0,6.6952515-1.5313721,8.8881226-3.9592285C18.6495972,22.324646,15.4981079,23.75,12,23.75z" />
                  <polygon opacity=".1" points="12,14.25 12,14.5 18.4862061,14.5 18.587492,14.25" />
                  <path d="M23.9944458,12.1470337C23.9952393,12.0977783,24,12.0493774,24,12 c0-0.0139771-0.0021973-0.0274658-0.0022583-0.0414429C23.9970703,12.0215454,23.9938965,12.0838013,23.9944458,12.1470337z" fill="#E6E6E6" />
                  <path opacity=".2" d="M12,9.5v0.25h11.7855721c-0.0157471-0.0825195-0.0329475-0.1680908-0.0503426-0.25H12z" fill="#FFF" />
                  <linearGradient gradientUnits="userSpaceOnUse" y2={12} y1={12} x2={24} x1={0} id="LxT-gk5MfRc1Gl_4XsNKba_xoyhGXWmHnqX_gr1">
                    <stop stopOpacity=".2" stopColor="#fff" offset={0} />
                    <stop stopOpacity={0} stopColor="#fff" offset={1} />
                  </linearGradient>
                  <path d="M23.7352295,9.5H12v5h6.4862061C17.4775391,17.121582,14.9771729,19,12,19 c-3.8659668,0-7-3.1340332-7-7c0-3.8660278,3.1340332-7,7-7c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686 c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374l3.637146-3.4699707L19.8414307,2.940979 C17.7369385,1.1170654,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12c0,6.6273804,5.3725586,12,12,12 c6.1176758,0,11.1554565-4.5812378,11.8960571-10.4981689C23.9585571,13.0101929,24,12.508667,24,12 C24,11.1421509,23.906311,10.3068237,23.7352295,9.5z" fill="url(#LxT-gk5MfRc1Gl_4XsNKba_xoyhGXWmHnqX_gr1)" />
                  <path opacity=".1" d="M15.7885132,5.890686C14.6939087,5.1806641,13.4018555,4.75,12,4.75c-3.8659668,0-7,3.1339722-7,7 c0,0.0421753,0.0005674,0.0751343,0.0012999,0.1171875C5.0687437,8.0595093,8.1762085,5,12,5 c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374 l3.637146-3.4699707l-3.637146,3.2199707C16.1289062,6.1018066,15.9560547,5.9995728,15.7885132,5.890686z" />
                  <path opacity=".2" d="M12,0.25c2.9750366,0,5.6829224,1.0983887,7.7792969,2.8916016l0.144165-0.1375122 l-0.110014-0.0958166C17.7089558,1.0843592,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12 c0,0.0421753,0.0058594,0.0828857,0.0062866,0.125C0.0740356,5.5558472,5.4147339,0.25,12,0.25z" fill="#FFF" />
                </svg>
                <span className="ml-2">Inscrivez-vous avec Google</span>
              </button>
              <button className="flex items-center justify-center py-2 px-20 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg mt-4">
                <svg height={25} width={25} y="0px" x="0px" xmlnsXlink="http://www.w3.org/1999/xlink32" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64">
                  <g fillRule="evenodd" fill="none" strokeWidth={1} stroke="none">
                    <g fillRule="nonzero" transform="translate(3.000000, 3.000000)">
                      <circle r="29.4882047" cy="29.4927506" cx="29.5091719" fill="#3C5A9A" />
                      <path fill="#FFFFFF" d="M39.0974944,9.05587273 L32.5651312,9.05587273 C28.6886088,9.05587273 24.3768224,10.6862851 24.3768224,16.3054653 C24.395747,18.2634019 24.3768224,20.1385313 24.3768224,22.2488655 L19.8922122,22.2488655 L19.8922122,29.3852113 L24.5156022,29.3852113 L24.5156022,49.9295284 L33.0113092,49.9295284 L33.0113092,29.2496356 L38.6187742,29.2496356 L39.1261316,22.2288395 L32.8649196,22.2288395 C32.8649196,22.2288395 32.8789377,19.1056932 32.8649196,18.1987181 C32.8649196,15.9781412 35.1755132,16.1053059 35.3144932,16.1053059 C36.4140178,16.1053059 38.5518876,16.1085101 39.1006986,16.1053059 L39.1006986,9.05587273 L39.0974944,9.05587273 L39.0974944,9.05587273 Z" />
                    </g>
                  </g>
                </svg>
                <span className="ml-2">Inscrivez-vous avec Facebook</span>
              </button>
            </div>
          </div>
          <div className="mt-5">
            <button className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" 
              type="submit" disabled={isLoading}
            >
              {isLoading ? 'Création...' : 'Créer un compte'}
            </button>
          </div>
        </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
              <a className="text-xs text-gray-500 uppercase dark:text-gray-500 hover:underline" href="login">Déjà un compte ? Se connecter</a>
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
          </div>
        </div>
      </div>
    </div>
  )
}