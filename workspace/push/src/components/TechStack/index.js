import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faCss3, faJs, faReact, faPython, faJava, faSass, faLinux, faWindows, faGit, faNode } from '@fortawesome/free-brands-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

const TechStack = () => {
  const technologies = [
    { name: 'HTML5', icon: faHtml5, color: '#0451b0' },
    { name: 'JavaScript', icon: faJs, color: '#FFFF00' },
    { name: 'React.js', icon: faReact, color: 'aqua' },
    { name: 'Python', icon: faPython, color: 'red' },
    { name: 'Java', icon: faJava, color: '#fff' },
    { name: 'CSS3', icon: faCss3, color: 'orange' },
    { name: 'Sass', icon: faSass, color: 'pink' },
    { name: 'SQL Database', icon: faDatabase, color: 'blue' },
    { name: 'Git', icon: faGit, color: 'orange' },
    { name: 'Linux', icon: faLinux, color: '#FF4500' },
    { name: 'Windows', icon: faWindows, color: 'blue' },
    { name: 'Node.js', icon: faNode, color: 'green' },
  ];

  return (
    <div className="technologies">
      {technologies.map((technology, index) => (
        <div key={index} className="technology-item">
          <div className="oval-bg" style={{ backgroundColor: technology.bgColor, color: technology.color}}>
            <FontAwesomeIcon icon={technology.icon} size="2x" color="#33333" />
          </div>
          <span className="technology-name">{technology.name}</span>
        </div>
      ))}
    </div>
  );
};

export default TechStack;