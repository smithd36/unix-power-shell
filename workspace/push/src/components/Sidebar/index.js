import { Link, NavLink } from 'react-router-dom';
import './index.scss';
import LogoS from '../../assets/images/logo-s.png';
import { faEnvelope, faHome, faUser, faArrowsUpToLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`nav-bar ${isSidebarOpen ? 'open' : 'closed'}`}>
      

      <Link className='logo' >
        <FontAwesomeIcon
          icon={faArrowsUpToLine}
          color="#4d4d4e"
          className="menu-icon bar"
          onClick={toggleSidebar}
        />
    
        <img src={LogoS} alt="logo" to="/" />
      </Link>
      <nav>
        <NavLink exact={true} activeClassName="active" to="/" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
        </NavLink>

        <NavLink exact={true} activeClassName="active" className="about-link" to="/about" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
        </NavLink>

        <NavLink exact={true} activeClassName="active" className="contact-link" to="/contact" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
        </NavLink>
      </nav>

      <ul>
        <li>
          <a target="_blank" rel='noreferrer' href='https://www.linkedin.com/in/drey-smith-390245224/'>
            <FontAwesomeIcon icon={faLinkedin} color="#4d4d4e" />
          </a>

          <a target="_blank" rel='noreferrer' href='https://github.com/smithd36'>
            <FontAwesomeIcon icon={faGithub} color="#4d4d4e" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
