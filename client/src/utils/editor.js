const pointSize = 20;

export default (canvas, img, points, selectedPos, pillion) => {
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const lineWidth = 65;
  const offsetX = canvas.width / 2 - img.width / 2;
  const offsetY = lineWidth / 2;
  ctx.drawImage(img, 0, 0);

  drawPoints(ctx, points.lenkerx, points.lenkery, selectedPos === "handleBar");
  drawPoints(ctx, points.sitzx, points.sitzy, selectedPos === "driverSeat");
  drawPoints(ctx, points.fussx, points.fussy, selectedPos === "driverFootPeg");
  pillion &&
    drawPoints(
      ctx,
      points.soziussitzx,
      points.soziussitzy,
      selectedPos === "pillionSeat"
    );
  pillion &&
    drawPoints(
      ctx,
      points.soziusfussx,
      points.soziusfussy,
      selectedPos === "pillionFootPeg"
    );
};

const drawPoints = (ctx, x, y, selected) => {
  ctx.fillStyle = "rgba(255, 255, 255, .7)";
  ctx.beginPath();
  ctx.arc(x, y, pointSize, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = selected ? "rgba(0, 0, 255, .3)" : "rgba(255, 0, 0, .3)";
  ctx.beginPath();
  ctx.arc(x, y, pointSize - 4, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 0, 0, .8)";
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.fill();
};
