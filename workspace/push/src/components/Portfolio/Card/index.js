import React from 'react';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Card = ({ title, description, image, projectLink }) => {

  return (
    <div className="card" style={{ backgroundImage: `url(${image})` }}>
      <div className="content">
        <h3>{title}</h3>
        <p>{description}</p>
        <a className="gh-button" target="_blank" rel='noreferrer' href={ projectLink }>
          <FontAwesomeIcon icon={faGithub} color="#4d4d4e" />
          </a>
      </div>
    </div>
  );
};

export default Card;