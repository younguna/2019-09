import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Title, Description } from '../components';
import { MainHowToPlayTitle, MainHowToPlayDescription } from '../../config';
import { STYLE_COLORS } from '../../utils';

const useStyle = makeStyles({
  menu: {
    background: STYLE_COLORS.WHITE_COLOR,
    width: '100%',
    height: 220,
    padding: '20px',
    border: `0.1rem solid ${STYLE_COLORS.THEME_COLOR}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 5,
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
});

const HowToPlay = () => {
  const classes = useStyle();

  return (
    <Container maxWidth="md" className={classes.menu}>
      <Title content={MainHowToPlayTitle} />
      <Description content={MainHowToPlayDescription} />
    </Container>
  );
};

export default HowToPlay;
