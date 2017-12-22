class CanvasRenderer {
  constructor() {

  }

  renderSett(sett, canvasContext, dimensions) {
    const { width, height } = dimensions;
    canvasContext.fillRect(0, 0, width, height);
  }
}

export default CanvasRenderer;
