import React from 'react';
import Card from './Card';
import work1 from '../../assets/images/work-1.png';
import work2 from '../../assets/images/work-2.png';
import work3 from '../../assets/images/work-3.png';
import './index.scss';

const Portfolio = () => {
  const projects = [
    {
      title: 'WeatherGuru',
      description: 'Cross-platform mobile Weather Application that provides forecasts for anywhere in the world. ',
      image: work1,
      projectLink: 'https://github.com/smithd36/react-native-tailwind-weather-app',
    },
    {
      title: 'MedBaseFX',
      description: 'Actively in-use, this database management app uses JavaFX and MySQL to manage employee records.',
      image: work2,
      projectLink: 'https://github.com/smithd36/medical-license-tracking-gui-system',
    },
    {
      title: 'The WoodCraftsman',
      description: 'A website for a local woodworking business, built to showcase and sell the owner\'s work.',
      image: work3,
      projectLink: 'https://github.com/smithd36/woodworking-gallery-site',
    },
  ];

  return (
    <div className="portfolio">
      {projects.map((project, index) => (
        <div className="image-container">
        <Card key={index} title={project.title} description={project.description} image={project.image} />
        </div>
      ))}
    </div>
  );
};

export default Portfolio;