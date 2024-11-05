import profile from '../../../public/profile-removebg-preview.png'

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
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