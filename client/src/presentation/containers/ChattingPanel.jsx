import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { ChattingWindow, InputWindow } from '../components';

const useStyle = makeStyles({
  chattingPanel: {
    height: '48rem',
    position: 'relative',
    border: '1px solid #e7e7e7',
    backgroundColor: '#F3F4FE',
  },
});

const ChattingPanel = () => {
  const classes = useStyle();
  return (
    <Box className={classes.chattingPanel}>
      <ChattingWindow chatList={[]} />
      <InputWindow />
    </Box>
  );
};

export default ChattingPanel;
