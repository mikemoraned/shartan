class CanvasRenderer {
  constructor() {

  }

  renderSett(sett, canvasContext, dimensions) {
    const { width, height } = dimensions;
      canvasContext.fillStyle = "red";
      canvasContext.fillRect(0, 0, width, height);
  }
}

export default CanvasRenderer;
