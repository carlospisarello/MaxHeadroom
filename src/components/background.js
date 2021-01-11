import React, {useEffect, useRef, useState} from 'react';
import anime from 'animejs';
import './background.scss';
import {useSelector} from "react-redux";

const Background = ({background}) => {
  const [frames, setFrames] = useState([]);
  const bgAnimation = useRef(null);
  const color = useSelector(state => state.colors.background);

  setTimeout(() => {
    bgAnimation.current = anime({
      targets: ".background",
      direction: "normal",
      autoplay: true,
      loop: true,
      keyframes: frames,
      easing: "easeInOutSine",
      duration: 250000,
    })
  }, 15000);

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const renderBackground = (bg) => {
    return (
      bg.map(row => <span>{row}</span>)
    );
  };

  const generateFrames = () => {
    const frames = [];

    for(let i = 0; i < 50; i += 1) {
      frames.push({
        rotateZ: `${randomIntFromInterval(-40, 40)}deg`,
        rotateX: `${randomIntFromInterval(-40, 40)}deg`,
        rotateY: `${randomIntFromInterval(-40, 40)}deg`,
      });
      if(i === 49 ) {
        console.log(frames);
        setFrames(frames)
      }
    }
  };

  useEffect(() => {
    generateFrames();
  }, []);

  const styles = {
    color: `${color}`
  }

  return (
    <div className={'background'} style={styles}>
      <div className={'top face'}>{renderBackground(background.image)}</div>
      <div className={'bottom face'}>{renderBackground(background.image)}</div>
      <div className={'right face'}>{renderBackground(background.image)}</div>
      <div className={'left face'}>{renderBackground(background.image)}</div>
      <div className={'back face'}>{renderBackground(background.image)}</div>
    </div>
  )
};

export default Background;