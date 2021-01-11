import React, {useState, useEffect, useRef} from 'react';
import './max.scss';
import {PHOTOGRAMS, BACKGROUNDS} from "../data/photograms";
import Background from "./background";
import Console from "./console";

const Max = () => {
  const [photogram, setPhotogram] = useState(PHOTOGRAMS[0]);
  const [laughSwitcher, setLaughSwitcher] = useState(false);
  const laughingInterval = useRef(null);
  const isLaughing = useRef(true);
  const isLoading = useRef(true);
  const isLooking = useRef('front');

  setTimeout(() => {
    isLoading.current = false;
  }, 15000);

  const talk = (e) => {
    if(!isLoading.current) {
      switch (e.keyCode) {
        case 48:
        case 96:
          if(!isLaughing.current) {
            switch(isLooking.current) {
              case 'right':
                setPhotogram(PHOTOGRAMS[5]);
                break;
              case 'left':
                setPhotogram(PHOTOGRAMS[7]);
                break;
              case 'front':
                setPhotogram(PHOTOGRAMS[1]);
                break;
              default:
                setPhotogram(PHOTOGRAMS[1]);
                break;
            };
          }
          break;
        case 97:
        case 49:
          setLaughSwitcher(!laughSwitcher);
          break;
        case 100:
        case 52:
          if(isLooking.current === 'left') {
            isLooking.current = 'front';
          } else {
            isLooking.current = 'left';
          }
          break;
        case 102:
        case 54:
          if(isLooking.current === 'right') {
            isLooking.current = 'front';
          } else {
            isLooking.current = 'right';
          }
          break;
        default: return;
      }
    }
  }

  useEffect(() => {
    isLaughing.current = !isLaughing.current;
    if(isLaughing.current) {
      animateLaugh();
      laughingInterval.current = setInterval(() => {
        animateLaugh();
      }, 400);
    } else {
      switch(isLooking.current) {
        case 'right':
          setPhotogram(PHOTOGRAMS[4]);
          break;
        case 'left':
          setPhotogram(PHOTOGRAMS[6]);
          break;
        case 'front':
          setPhotogram(PHOTOGRAMS[0]);
          break;
        default:
          setPhotogram(PHOTOGRAMS[0]);
          break;
      };
      clearInterval(laughingInterval.current);
    }
  }, [laughSwitcher]);

  const shutUp = (e) => {
    if(!isLaughing.current) {
      switch(isLooking.current) {
        case 'right':
          setPhotogram(PHOTOGRAMS[4]);
          break;
        case 'left':
          setPhotogram(PHOTOGRAMS[6]);
          break;
        case 'front':
          setPhotogram(PHOTOGRAMS[0]);
          break;
        default:
          setPhotogram(PHOTOGRAMS[0]);
          break;
      };
    }
  };

  const animateLaugh = () => {
    setPhotogram(PHOTOGRAMS[2]);
    setTimeout(() => {
      if(isLaughing.current) {
        setPhotogram(PHOTOGRAMS[3]);
      } else {
        setPhotogram(PHOTOGRAMS[0]);
      }
    }, 200)
  }

  const renderImageRow = (row) => {
    const regex = /[^@]+/g;
    const result = regex.exec(row);
    let processedRow;
    if(result) {
      processedRow = row.split(result);
      processedRow.splice(1, 0, result[0]);
    } else {
      processedRow = [row];
    }

    return (
      processedRow.map((i, idx) => {
        if(i[0] === '@') {
          return <span key={idx} className={'invisible'}>{i}</span>
        } return <span key={idx} className={'visible'}>{i}</span>
      })
    )
  };

  return (
    <div className={'screen'}>
      <div className={'max'}>
        <p tabIndex="0" onKeyDown={talk} onKeyUp={shutUp}>{photogram.image.map((i) => renderImageRow(i))}</p>
        <Background background={BACKGROUNDS[0]}/>
      </div>
      <Console/>
    </div>
  );
};

export default Max;