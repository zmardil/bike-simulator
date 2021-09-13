const colors = {
  driver: "rgba(22, 184, 255, 1)",
  pillion: "rgba(22, 200, 255, 1)",
};

const debug = false;

export default (canvas, img, settings, data) => {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw
  const lineWidth = 65;
  const offsetX = canvas.width / 2 - img.width / 2;
  const offsetY = lineWidth / 2 + 30;
  // inputs
  const bodySize = (settings.bodySize / 2) * 10; // range 140 - 210, step 1
  const armAngleMax = settings.armAngleMax; // range 0 - 120, step 5
  const footOnGround = settings.footOnGround; // checkbox
  const driverOffset = settings.driverOffset; // range (30) - 30, step 5
  const footOffsetX = 0; // range (20) - 20, step 1
  const footOffsetY = 0; // range (20) - 20, step 1
  const pillionFootOffsetX = 0; // range (20) - 20, step 1
  const pillionFootOffsetY = 0; // range (20) - 20, step 1
  const handlebarOffsetX = 0; // range (20) - 20, step 1
  const handlebarOffsetY = 0; // range (20) - 20, step 1
  const showShadow = true;
  const showPillion = settings.showPillion;
  const pillionSize = settings.pillionSize; // range 100 - 210, step 1
  const pillionPosition = settings.pillionPosition; // range (30) - 30, step 5
  const showArms = settings.showArms;

  // Seat coordinates
  let sitzX = parseInt(data.sitzx) + parseInt(driverOffset);
  let sitzY = Math.round(img.height - parseInt(data.sitzy));
  sitzX = offsetX + sitzX;
  sitzY = canvas.height - sitzY - offsetY;

  // Foot peg coordinates
  let fussX = parseInt(data.fussx) + parseInt(footOffsetX);
  let fussY =
    Math.round(img.height - parseInt(data.fussy)) + parseInt(footOffsetY);
  fussX = offsetX + fussX + 10;
  fussY = canvas.height - fussY - offsetY;

  // Handlebar coordinates
  let lenkerX = parseInt(data.lenkerx) + parseInt(handlebarOffsetX);
  let lenkerY =
    Math.round(img.height - parseInt(data.lenkery)) +
    parseInt(handlebarOffsetY);
  lenkerX = offsetX + lenkerX;
  lenkerY = canvas.height - lenkerY - offsetY / 2;

  // Background
  ctx.fillStyle = "rgba(255,255,255,1.00)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw Image
  ctx.shadowBlur = 0;
  ctx.drawImage(
    img,
    offsetX,
    canvas.height - img.height - offsetY / 2,
    img.width,
    img.height
  );

  // Calculate Points
  var knieXY;
  var schnittpunkte;

  // Legs
  if (footOnGround) {
    fussX = canvas.width;
    fussY = canvas.height - offsetY - 10;
    knieXY = [fussX, fussY - (bodySize / 8) * 2];

    while (
      !PointInsideCircle(knieXY, [sitzX, sitzY], (bodySize / 8) * 2) &&
      fussX > 0
    ) {
      fussX -= 1;
      knieXY[0] -= 1;
    }
  } else {
    // Thigh interfaces
    schnittpunkte = Intersect2Circles(
      [sitzX, sitzY],
      (bodySize / 8) * 2,
      [fussX, fussY],
      (bodySize / 8) * 2
    );
    if (schnittpunkte[0][0] > schnittpunkte[1][0]) {
      knieXY = schnittpunkte[0];
    } else {
      knieXY = schnittpunkte[1];
    }
  }

  // Thigh
  if (fussX === 0) {
    fussX = sitzX;
    fussY = sitzY + (bodySize / 8) * 4;
    knieXY[0] = sitzX;
    knieXY[1] = sitzY + (bodySize / 8) * 2;
  }

  // Torso
  var schulterXY = [sitzX, sitzY - (bodySize / 8) * 2.5];
  var angle = 270;
  schnittpunkte = Intersect2Circles(
    [lenkerX, lenkerY],
    (bodySize / 8) * 1.5,
    schulterXY,
    (bodySize / 8) * 1.5
  );

  // Upper body angle
  while (schnittpunkte[1] === undefined) {
    angle += 0.1;
    schulterXY = Rotate(sitzX, sitzY, angle, (bodySize / 8) * 2.5);
    schnittpunkte = Intersect2Circles(
      [lenkerX, lenkerY],
      (bodySize / 8) * 1.5,
      schulterXY,
      (bodySize / 8) * 1.5
    );
    if (angle > 360) {
      break;
    }
  }
  var elleXY;
  if (schnittpunkte[0][1] > schnittpunkte[1][1]) {
    elleXY = schnittpunkte[0];
  } else {
    elleXY = schnittpunkte[1];
  }

  while (
    FindAngle(schulterXY, elleXY, [lenkerX, lenkerY]) >
    180 - armAngleMax
  ) {
    angle += 0.1;
    schulterXY = Rotate(sitzX, sitzY, angle, (bodySize / 8) * 2.5);
    schnittpunkte = Intersect2Circles(
      [lenkerX, lenkerY],
      (bodySize / 8) * 1.5,
      schulterXY,
      (bodySize / 8) * 1.5
    );
    if (schnittpunkte[0][1] > schnittpunkte[1][1]) {
      elleXY = schnittpunkte[0];
    } else {
      elleXY = schnittpunkte[1];
    }
    if (angle > 360) {
      break;
    }
  }

  // Neck
  var halsXY = Rotate(schulterXY[0], schulterXY[1], angle + 10, bodySize / 8);

  // Foot
  var fussSpitzeXY = [fussX + bodySize / 12, fussY];
  var fussAngle = FindAngle(fussSpitzeXY, [fussX, fussY], knieXY);
  var zielAngle = 75;

  if (footOnGround) {
    fussSpitzeXY = [canvas.width, canvas.height - offsetY - 10];

    while (!PointInsideCircle(fussSpitzeXY, [fussX, fussY], bodySize / 12)) {
      fussSpitzeXY[0] -= 1;
      if (FindAngle(fussSpitzeXY, [fussX, fussY], knieXY) > 170) {
        fussSpitzeXY = Rotate(fussX, fussY, 80, bodySize / 12);
        break;
      }
    }
  } else {
    if (fussAngle > zielAngle) {
      fussSpitzeXY = Rotate(
        fussX,
        fussY,
        -1 * (fussAngle - zielAngle),
        bodySize / 12
      );
    } else {
      fussSpitzeXY = Rotate(fussX, fussY, zielAngle - fussAngle, bodySize / 12);
    }
  }

  // Draw Driver
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  // ctx.strokeStyle = "rgba(255,150,0,1.00)";
  // ctx.fillStyle = "rgba(255,150,0,1.00)";
  ctx.strokeStyle = colors.driver;
  ctx.fillStyle = colors.driver;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  if (showShadow) {
    ctx.shadowBlur = 5;
  } else {
    ctx.shadowBlur = 0;
  }
  ctx.shadowColor = "black";

  // Draw neck
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(schulterXY[0], schulterXY[1]);
  ctx.lineTo(halsXY[0], halsXY[1]);
  ctx.stroke();

  // Draw torso
  ctx.beginPath();
  ctx.moveTo(sitzX, sitzY);
  ctx.lineWidth = lineWidth + 20;
  ctx.lineTo(schulterXY[0], schulterXY[1]);
  ctx.stroke();

  // Draw head
  ctx.beginPath();
  ctx.arc(halsXY[0], halsXY[1], (bodySize / 8) * 0.65, 0, 2 * Math.PI, false);
  ctx.lineWidth = 3;
  ctx.fill();

  // Draw legs
  ctx.lineWidth = lineWidth + 10;
  ctx.beginPath();
  ctx.moveTo(fussSpitzeXY[0], fussSpitzeXY[1]);
  ctx.lineTo(fussX, fussY);
  ctx.lineTo(knieXY[0], knieXY[1]);
  ctx.lineTo(sitzX, sitzY);
  ctx.stroke();

  // Draw arms
  // ctx.strokeStyle = "rgba(255,150,0,1.00)";
  ctx.strokeStyle = colors.driver;
  ctx.lineWidth = lineWidth - 10;
  ctx.beginPath();
  ctx.moveTo(schulterXY[0], schulterXY[1]);
  ctx.lineTo(elleXY[0], elleXY[1]);
  ctx.lineTo(lenkerX, lenkerY);
  ctx.stroke();

  // Draw floor
  if (footOnGround) {
    var shadow = ctx.shadowBlur;
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(0,0,0,1.00)";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(offsetX, canvas.height - 35);
    ctx.lineTo(offsetX + img.width, canvas.height - 35);
    ctx.stroke();
    ctx.shadowBlur = shadow;
  }

  // Debug
  if (false) {
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";

    //Thigh radius
    ctx.beginPath();
    ctx.arc(sitzX, sitzY, (bodySize / 8) * 2, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;

    ctx.stroke();

    //Lower leg radius
    ctx.beginPath();
    ctx.arc(fussX, fussY, (bodySize / 8) * 2, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.stroke();

    //Forearm radius
    ctx.beginPath();
    ctx.arc(lenkerX, lenkerY, (bodySize / 8) * 1.5, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.stroke();

    //Upper arm radius
    ctx.beginPath();
    ctx.arc(
      schulterXY[0],
      schulterXY[1],
      (bodySize / 8) * 1.5,
      0,
      2 * Math.PI,
      false
    );
    ctx.lineWidth = 3;
    ctx.stroke();

    //Draw points
    ctx.fillRect(sitzX - 3, sitzY - 3, 6, 6);
    ctx.fillRect(fussX - 3, fussY - 3, 6, 6);
    ctx.fillRect(lenkerX - 3, lenkerY - 3, 6, 6);
    ctx.fillRect(knieXY[0] - 3, knieXY[1] - 3, 6, 6);
    ctx.fillRect(schulterXY[0] - 3, schulterXY[1] - 3, 6, 6);

    // Bikelength
    ctx.lineCap = "butt";
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.moveTo(offsetX + 0, 10);
    ctx.lineTo(offsetX + 1048, 10);
    ctx.stroke();
  }

  // Show Pillion
  if (showPillion && data.soziussitzx !== "null") {
    var soziusBodySize = (pillionSize / 2) * 10;
    var soziusOffset = pillionPosition;

    var soziusSitzX = parseInt(data.soziussitzx) + parseInt(soziusOffset); //<?php echo $rows[0]["SitzX"]; ?>;
    var soziusSitzY = Math.round(img.height - parseInt(data.soziussitzy)); //<?php echo $rows[0]["SitzY"]; ?>;
    soziusSitzX = offsetX + soziusSitzX;
    soziusSitzY = canvas.height - soziusSitzY - offsetY;

    // Coordinates of footpedes
    var soziusFussX = parseInt(data.soziusfussx) + parseInt(pillionFootOffsetX); //<?php echo $rows[0]["FussX"]; ?>;
    var soziusFussY =
      Math.round(img.height - parseInt(data.soziusfussy)) +
      parseInt(pillionFootOffsetY); //<?php echo $rows[0]["FussY"]; ?>;
    soziusFussX = offsetX + soziusFussX;
    soziusFussY = canvas.height - soziusFussY - offsetY;

    // Calculate Body Points
    //Knee
    var soziusKnieXY;
    schnittpunkte = Intersect2Circles(
      [soziusSitzX, soziusSitzY],
      (soziusBodySize / 8) * 2,
      [soziusFussX, soziusFussY],
      (soziusBodySize / 8) * 2
    );
    if (schnittpunkte[0][0] > schnittpunkte[1][0]) {
      soziusKnieXY = schnittpunkte[0];
    } else {
      soziusKnieXY = schnittpunkte[1];
    }

    var soziusSchulterXY = Rotate(
      soziusSitzX,
      soziusSitzY,
      angle,
      (soziusBodySize / 8) * 2.5
    );
    var soziusHalsXY = Rotate(
      soziusSchulterXY[0],
      soziusSchulterXY[1],
      angle + 10,
      soziusBodySize / 8
    );
    var soziusHandXY = Rotate(sitzX, sitzY, angle, bodySize / 8);
    var soziusElleXY;
    schnittpunkte = Intersect2Circles(
      soziusHandXY,
      (soziusBodySize / 8) * 1.5,
      soziusSchulterXY,
      (soziusBodySize / 8) * 1.5
    );
    if (schnittpunkte[0][1] > schnittpunkte[1][1]) {
      soziusElleXY = schnittpunkte[0];
    } else {
      soziusElleXY = schnittpunkte[1];
    }

    // Foot
    var soziusFussSpitzeXY = [soziusFussX + soziusBodySize / 12, soziusFussY];
    var SoziusFussAngle = FindAngle(
      soziusFussSpitzeXY,
      [soziusFussX, soziusFussY],
      soziusKnieXY
    );
    if (SoziusFussAngle > 90) {
      soziusFussSpitzeXY = Rotate(
        soziusFussX,
        soziusFussY,
        -1 * (SoziusFussAngle - 90),
        soziusBodySize / 12
      );
    } else {
      soziusFussSpitzeXY = Rotate(
        soziusFussX,
        soziusFussY,
        90 - SoziusFussAngle,
        soziusBodySize / 12
      );
    }

    //Line Properties
    // ctx.strokeStyle = "rgba(255,220,0,1.00)";
    // ctx.fillStyle = "rgba(255,220,0,1.00)";
    ctx.strokeStyle = colors.pillion;
    ctx.fillStyle = colors.pillion;

    // Draw Neck
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(soziusSchulterXY[0], soziusSchulterXY[1]);
    ctx.lineTo(soziusHalsXY[0], soziusHalsXY[1]);
    ctx.stroke();

    // Torso
    ctx.beginPath();
    ctx.moveTo(soziusSitzX, soziusSitzY);
    ctx.lineWidth = lineWidth + 20;
    ctx.lineTo(soziusSchulterXY[0], soziusSchulterXY[1]);
    ctx.stroke();

    // Draw head
    ctx.beginPath();
    ctx.arc(
      soziusHalsXY[0],
      soziusHalsXY[1],
      (soziusBodySize / 8) * 0.65,
      0,
      2 * Math.PI,
      false
    );
    ctx.lineWidth = 3;
    ctx.fill();

    if (showArms) {
      // Draw Arms
      ctx.lineWidth = lineWidth - 10;
      ctx.beginPath();
      ctx.moveTo(soziusSchulterXY[0], soziusSchulterXY[1]);
      ctx.lineTo(soziusElleXY[0], soziusElleXY[1]);
      ctx.lineTo(soziusHandXY[0], soziusHandXY[1]);
      ctx.stroke();
    }

    // Draw Legs
    ctx.lineWidth = lineWidth + 10;
    ctx.beginPath();
    ctx.moveTo(soziusFussSpitzeXY[0], soziusFussSpitzeXY[1]);
    ctx.lineTo(soziusFussX, soziusFussY);
    ctx.lineTo(soziusKnieXY[0], soziusKnieXY[1]);
    ctx.lineTo(soziusSitzX, soziusSitzY);
    ctx.stroke();

    // Pillion debug
    if (debug) {
      ctx.strokeStyle = "blue";
      ctx.fillStyle = "blue";

      // Thigh radius
      ctx.beginPath();
      ctx.arc(
        soziusSitzX,
        soziusSitzY,
        (soziusBodySize / 8) * 2,
        0,
        2 * Math.PI,
        false
      );
      ctx.lineWidth = 3;

      ctx.stroke();

      //Lower leg radius
      ctx.beginPath();
      ctx.arc(
        soziusFussX,
        soziusFussY,
        (soziusBodySize / 8) * 2,
        0,
        2 * Math.PI,
        false
      );
      ctx.lineWidth = 3;
      ctx.stroke();

      // Points
      ctx.fillRect(soziusSitzX - 3, soziusSitzY - 3, 6, 6);
      ctx.fillRect(soziusFussX - 3, soziusFussY - 3, 6, 6);
      ctx.fillRect(soziusKnieXY[0] - 3, soziusKnieXY[1] - 3, 6, 6);
      ctx.fillRect(soziusSchulterXY[0] - 3, soziusSchulterXY[1] - 3, 6, 6);
      ctx.fillRect(soziusFussX - 3, soziusFussY - 3, 6, 6);
      ctx.fillRect(soziusHandXY[0] - 3, soziusHandXY[1] - 3, 6, 6);
    }
  }
};

/*
 * Check if Point is inside Circle
 */
function PointInsideCircle(pointXY, circleCenterXY, circleRadius) {
  var distance = Math.sqrt(
    (pointXY[0] - circleCenterXY[0]) * (pointXY[0] - circleCenterXY[0]) +
      (pointXY[1] - circleCenterXY[1]) * (pointXY[1] - circleCenterXY[1])
  );
  return distance <= circleRadius;
}

/*
 * Calculates the angle ABC (in radians)
 *
 * A first point, ex: {x: 0, y: 0}
 * C second point
 * B center point
 */
function FindAngle(A, B, C) {
  var AB = Math.sqrt(Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2));
  var BC = Math.sqrt(Math.pow(B[0] - C[0], 2) + Math.pow(B[1] - C[1], 2));
  var AC = Math.sqrt(Math.pow(C[0] - A[0], 2) + Math.pow(C[1] - A[1], 2));
  return (
    (Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) * 180) / Math.PI
  );
}

/*
 * Rotate Point in Distance length from coord
 */
function Rotate(xCoord, yCoord, angle, length) {
  length = typeof length !== "undefined" ? length : 10;
  angle = (angle * Math.PI) / 180; // if you're using degrees instead of radians
  return [length * Math.cos(angle) + xCoord, length * Math.sin(angle) + yCoord];
}

// Intersection calculation of two circles
function Intersect2Circles(A, a, B, b) {
  // A, B = [ x, y ]
  // return = [ Q1, Q2 ] or [ Q ] or [] where Q = [ x, y ]
  var AB0 = B[0] - A[0];
  var AB1 = B[1] - A[1];
  var c = Math.sqrt(AB0 * AB0 + AB1 * AB1);
  if (c === 0) {
    // no distance between centers
    return [];
  }
  var x = (a * a + c * c - b * b) / (2 * c);
  var y = a * a - x * x;
  if (y < 0) {
    // no intersection
    return [];
  }
  if (y > 0) {
    y = Math.sqrt(y);
  }
  // compute unit vectors ex and ey
  var ex0 = AB0 / c;
  var ex1 = AB1 / c;
  var ey0 = -ex1;
  var ey1 = ex0;
  var Q1x = A[0] + x * ex0;
  var Q1y = A[1] + x * ex1;
  if (y === 0) {
    // one touch point
    return [[Q1x, Q1y]];
  }
  // two intersections
  var Q2x = Q1x - y * ey0;
  var Q2y = Q1y - y * ey1;
  Q1x += y * ey0;
  Q1y += y * ey1;
  return [
    [Q1x, Q1y],
    [Q2x, Q2y],
  ];
}

// Fill num with leading zeros to size
function pad(num, size) {
  var s = num + "";
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
}
