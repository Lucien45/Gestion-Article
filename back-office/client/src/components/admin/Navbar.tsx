import { useEffect, useState } from 'react';
import profile from '../../../public/profile-removebg-preview.png'
import { UserService } from '../../services/user.service';

interface NavbarProps {
  toggleSidebar: () => void;
}

interface User {
  id: number;
  email: string;
  username: string;
  profile?: string;
  role: string;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [dataUser, setDataUser] = useState<User>();
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); 

  useEffect(() => {
    // UserService.getUser()
    // .then(function (res) {
    //   setDataUser(res.data);
    //   console.log('User data:', res.data);
    // })
    // .catch(function (error) {
    //   console.warn(error.response.data.message);
    // });
  }, []);

  return (
    <>
      <div className="logosec">
        <div className="logo">APP ADMIN</div>
        <i className="fas fa-bars icn menuicn" onClick={toggleSidebar}></i>
      </div>
      <div className="searchbar">
        <input type="text" placeholder="Search" />
        <div className="searchbtn">
          <i className="fas fa-search srchicn"></i>
        </div>
      </div>
      <div className="message">
        <div className="circle"></div>
        <i className="fas fa-envelope"></i>
        <div className="dp">
          <img src={profile} className="dpicn" alt="profile" />
        </div>
      </div>
    </>
  )
}

export default Navbar