const roomController = require('../controllers/roomController');
const gameController = require('../controllers/gameController');
const { INITIALIZING } = require('../../../constants/gameStatus');

const connectPeerHandler = socket => {
  const { gameManager, timer } = roomController.getRoomByRoomId(socket.roomId);
  const connectedPlayer = gameManager.getPlayerBySocketId(socket.id);
  connectedPlayer.setIsConnectedToStreamer(true);

  if (
    gameManager.getStreamer() &&
    gameManager.checkAllConnectionsToStreamer() &&
    gameManager.getStatus() !== INITIALIZING
  ) {
    /**
     * 연결 준비 후 정상 시작
     */
    gameManager.setStatus(INITIALIZING);
    timer.clear();
    gameController.prepareSet(gameManager, timer);
  }
};

module.exports = connectPeerHandler;
