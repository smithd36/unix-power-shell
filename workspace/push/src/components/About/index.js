import { useEffect, useState } from 'react'
import {
  faPython,
  faCss3,
  faGitAlt,
  faHtml5,
  faJsSquare,
  faReact,
} from '@fortawesome/free-brands-svg-icons'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TechStack from '../TechStack'
import Portfolio from '../Portfolio'
import './index.scss'


const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
      setTimeout(() => {
        setLetterClass('text-animate-hover');
      }, 3000);
    }, []);

  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['A', 'b', 'o', 'u', 't', ' ', 'M', 'e']}
              idx={15}
            />
          </h1>
          <p>
            I'm a very ambitious IT professional and junior software engineer looking for a role in a startup or an
            established company with the opportunity to work with the latest technology and diverse projects,
            while learning and contributing everything I have, each and every day!
          </p>
          <p align="LEFT">
             I am experienced in an I.T. Helpdesk role, with excellent soft and technical skills. Keen to collaboration, 
            teamwork and conflict resolution among team members, I also perform well in solo positions that may
            require less interaction and more independence. I am currently on track to graduate from Eastern New Mexico
            University in December of 2023 with a Bachelor's of Computer Science. I am also pursuing CompTIA A+, CompTIA Security+ 
            and CompTIA Network+ I.T. certifications at this time.
            <br />
            <br />
            Here are some recent projects I've worked on:
          </p>
          
          <Portfolio />

          <p>            
            I'm quietly confident, naturally curious, and perpetually working on
            improving my skills every day, one code, design, or logic problem at a time. I also love working with
            machine learning and data science concepts through the use of large language models and modern technologies 
            such as Python. I have also built many different software projects in a variety of other programming languages and frameworks.
            <br />
          </p>
          <TechStack />
        </div>
      </div>

        <div className="stage-cube-cont">
          <div className="cubespinner">
            <div className="face1">
              <FontAwesomeIcon icon={faPython} />
            </div>
            <div className="face2">
              <FontAwesomeIcon icon={faHtml5} color="#F06529" />
            </div>
            <div className="face3">
              <FontAwesomeIcon icon={faCss3} color="#28A4D9" />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faGitAlt} color="#EC4D28" />
            </div>
          </div>
        </div>
      <Loader type="pacman" />
    </>
  )
}

export default About