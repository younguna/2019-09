import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClientManager from '../../../service/ClientManager';
import {
  MOBILE_VIEW_BREAKPOINT,
  WAITING_STATUS,
  MOBILE_VIEW,
  DESKTOP_VIEW,
  ALLOW_CAMERA_MESSAGE,
} from '../../../config';
import { GlobalContext } from '../../../contexts';
import GamePresentation from './presenter';
import useStyles from './style';
import useShiftingToWhichView from '../../../hooks/useShiftingToWhichView';
import useIsMobile from '../../../hooks/useIsMobile';

let clientManager;

const Game = ({ location, match }) => {
  const {
    gameStatus,
    viewPlayerList,
    currentSeconds,
    quiz,
    quizLength,
    clientManagerInitialized,
  } = useContext(GlobalContext);

  const classes = useStyles();
  const history = useHistory();
  const shiftingToWhichView = useShiftingToWhichView(MOBILE_VIEW_BREAKPOINT);
  const currentIsMobile = useIsMobile(MOBILE_VIEW_BREAKPOINT);
  const initialIsMobile = window.innerWidth < MOBILE_VIEW_BREAKPOINT;
  const [
    mobileChattingPanelVisibility,
    setMobileChattingPanelVisibility,
  ] = useState(initialIsMobile);
  const [isPlayerListVisible, setIsPlayerListVisible] = useState(
    !initialIsMobile,
  );

  const { isPrivateRoomCreation } = location;
  const insertedRoomId = match.params.roomId;

  if (!clientManagerInitialized) {
    clientManager = new ClientManager({
      history,
      insertedRoomId,
      isPrivateRoomCreation,
    });
    clientManager
      .getMediaPermission()
      .then(() => {
        clientManager.init();
        clientManager.setClientManagerInitialized(true);
      })
      .catch(() => {
        history.push('/');
        clientManager.setClientManagerInitialized(false);
        alert(ALLOW_CAMERA_MESSAGE);
      });
    clientManager.setClientManagerInitialized(true);
  }

  const exitButtonHandler = () => {
    clientManager.exitRoom();
  };

  const showPlayersButtonHandler = () => {
    setIsPlayerListVisible(!isPlayerListVisible);
  };

  const readyButtonHandler = () => {
    clientManager.toggleReady();
  };

  useEffect(() => {
    window.onpopstate = () => {
      exitButtonHandler();
    };
  }, []);

  useEffect(() => {
    setMobileChattingPanelVisibility(currentIsMobile);
  }, [currentIsMobile]);

  useEffect(() => {
    if (shiftingToWhichView === MOBILE_VIEW) {
      setIsPlayerListVisible(false);
      return;
    }
    if (shiftingToWhichView === DESKTOP_VIEW) {
      setIsPlayerListVisible(true);
    }
  }, [shiftingToWhichView]);

  const bottomLeftButtonContainerClasses =
    gameStatus === WAITING_STATUS
      ? [classes.mobileBottomLeftButtonContainer, classes.desktopViewHide]
      : classes.gameStartHide;

  const playerPanelContainerClasses = isPlayerListVisible
    ? classes.playerPanelContainer
    : [classes.playerPanelContainer, classes.mobileViewHide];

  const localPlayer = viewPlayerList.find(player => player.isLocalPlayer);

  const gameProps = {
    quiz,
    quizLength,
    exitButtonHandler,
    clientManager,
    showPlayersButtonHandler,
    playerPanelContainerClasses,
    bottomLeftButtonContainerClasses,
    localPlayer,
    currentSeconds,
    classes,
    readyButtonHandler,
    mobileChattingPanelVisibility,
  };

  return <GamePresentation gameProps={gameProps} />;
};

Game.propTypes = {
  location: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
};

export default Game;
