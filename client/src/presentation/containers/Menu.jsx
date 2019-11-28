import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { MenuButton, TextInput } from '../components';
import { browserLocalStorage } from '../../utils';

const useStyle = makeStyles({
  menu: {
    background: '#F3F4FE',
    width: '100%',
    height: 'auto',
    padding: '2rem',
    border: '0.1rem solid #cccccc',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 5,
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    '& > *': {
      marginTop: '0.7rem',
      marginBottom: '0.7rem',
    },
  },

  fullAnchor: {
    width: '100%',
  },
});

const textInpuStyles = {
  width: '100%',
};

const Menu = () => {
  const [nickname, setNickname] = useState(
    browserLocalStorage.getItem('nickname') || '',
  );
  const classes = useStyle();

  // const getTextValue = nickname => {
  //   dispatch({ type: 'changeNickname', payload: { nickname } });
  // };
  const playButtonClickHandler = () => {
    browserLocalStorage.setItem('nickname', nickname);
  };

  return (
    <Container maxWidth="md" className={classes.menu}>
      <TextInput
        label="NICKNAME"
        style={textInpuStyles}
        value={nickname}
        textChangeHandler={setNickname}
      />

      <Link
        to="/game"
        className={classes.fullAnchor}
        onClick={playButtonClickHandler}
      >
        <MenuButton>PLAY</MenuButton>
      </Link>

      <MenuButton>RANK</MenuButton>
    </Container>
  );
};

export default Menu;
