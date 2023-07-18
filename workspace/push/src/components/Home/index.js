import { Link } from 'react-router-dom';
import LogoTitle from '../../assets/images/logo-s.png';
import './index.scss';
import { useState } from 'react';
import AnimatedLetters from '../AnimatedLetters';
import { useEffect } from 'react';
import Logo from './Logo';
import Loader from 'react-loaders';

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const nameArray = ['r', 'e', 'y'];
  const jobArray = [
    'W',
    'e',
    'b',
    ' ',
    'D',
    'e',
    'v',
    'e',
    'l',
    'o',
    'p',
    'e',
    'r'
  ];

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 6000);
  }, []);

  return (
    <>
    <div className="container home-page">
      <div className="text-zone">
        <span className="fade-in">
          <h1>
          <span className={letterClass}>H</span>
          <span className={`${letterClass} _1`}>i,</span>
          <br />
            <span className={`${letterClass} _2`}>I</span>
            <span className={`${letterClass} _3`}>'m </span>
            <img src={LogoTitle} alt="developer" />
            <AnimatedLetters className="name" letterClass={letterClass} 
            strArray={nameArray} 
            idx={0} />
            <br />

            <AnimatedLetters letterClass={letterClass}
            strArray={jobArray}
            idx={12} />
          </h1>
          <h2>
          Welcome to my corner of the web! I'm IT professional and junior developer based in New
          Mexico. I like making things people enjoy using! That may be a website,
          app, or anything in between. My goal is to always build solutions
          that provide pixel-perfect experiences. I have a strong passion for
          software and web development, with a primary focus on front-end engineering.
          <br />
          <Link to="/contact" className="flat-button">
            Get in Touch!
          </Link>
          </h2>
        </span>
        <Logo className="logo"/>
      </div>
    </div>
    <Loader type="pacman" />
    </>
  );
};

export default Home;