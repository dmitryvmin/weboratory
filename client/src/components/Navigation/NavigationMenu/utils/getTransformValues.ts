// Gets x/y coordinates for displaying menu items in the second quadrant
function getTransformValues({
  count,
  idx,
  startingAngle = 0,
  arcSpan = 120, // size of the arc
  arcRadius = 80, // hypotenuse
}) {
  // angle distance between items
  const angleSeparation = arcSpan / (count - 1);
  const idxAngle = angleSeparation * idx - ((arcSpan - 90) / 2) - 20;
  const idxAngleRadians = (Math.PI / 180) * idxAngle + startingAngle;
  // adjacent
  const x = Math.cos(idxAngleRadians) * -arcRadius;
  // opposite side
  const y = Math.sin(idxAngleRadians) * -arcRadius;

  return ({
    x: x - 10,
    y: y - 0,
  });
}

export { getTransformValues };
