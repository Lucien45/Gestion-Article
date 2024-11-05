import { useState } from 'react';

const Sidebar = () => {
  const [activeOption, setActiveOption] = useState('option1'); 

  const handleOptionClick = (option: string) => {
    setActiveOption(option); 
  };

  return (
    <nav className="nav">
      <div className="nav-upper-options">
        <div className={`nav-option option1 ${activeOption === 'option1' ? 'active' : ''}`} onClick={() => handleOptionClick('option1')} >
          <i className="fas fa-tachometer-alt nav-icon"></i>
          <h3>Dashboard</h3>
        </div>

        <div className={`nav-option option2 ${activeOption === 'option2' ? 'active' : ''}`} onClick={() => handleOptionClick('option2')} >
          <i className="fas fa-newspaper nav-icon"></i>
          <h3>Articles</h3>
        </div>

        <div className={`nav-option option3 ${activeOption === 'option3' ? 'active' : ''}`} onClick={() => handleOptionClick('option3')} >
          <i className="fas fa-chart-line nav-icon"></i>
          <h3>Report</h3>
        </div>

        <div className={`nav-option option4 ${activeOption === 'option4' ? 'active' : ''}`} onClick={() => handleOptionClick('option4')} >
          <i className="fas fa-building nav-icon"></i>
          <h3>Institution</h3>
        </div>

        <div className={`nav-option option5 ${activeOption === 'option5' ? 'active' : ''}`} onClick={() => handleOptionClick('option5')} >
          <i className="fas fa-user nav-icon"></i>
          <h3>Profile</h3>
        </div>

        <div className={`nav-option option6 ${activeOption === 'option6' ? 'active' : ''}`} onClick={() => handleOptionClick('option6')} >
          <i className="fas fa-cog nav-icon"></i>
          <h3>Settings</h3>
        </div>

        <div className={`nav-option logout ${activeOption === 'logout' ? 'active' : ''}`} onClick={() => handleOptionClick('logout')} >
          <i className="fas fa-sign-out-alt nav-icon"></i>
          <h3>Logout</h3>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar