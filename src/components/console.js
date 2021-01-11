import React, {useState} from 'react';
import './console.scss';
import {useDispatch} from "react-redux";
import {setBackgroundColor} from "../redux/modules/colors/colors.actions";

const Console = () => {
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setInputText(event.target.value);
  }

  const execConsole = (event) => {
    event.preventDefault();
    if(inputText.startsWith ('set ')) {
      const splitted = inputText.split(' ');
      switch(splitted[1]) {
        case 'background':
          console.log('is setting background');
          dispatch(setBackgroundColor('teal'));
          break;
        case 'max':
          console.log('is setting max');
          break;
        default:
          console.log(`${splitted[1]} is not recognized by The Maxter`);
      }
    } else {
      const splitted = inputText.split(' ');
      console.log(`${splitted[0]} is not recognized by the maxter`);
    }
  }

  return (
  <form className={'console'} onSubmit={execConsole}>
    <input type={'text'} onChange={handleChange}/>
  </form>
)
};

export default Console;