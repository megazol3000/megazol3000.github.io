function getHypo(mY, eY, mX, eX) {
  return Math.sqrt(Math.pow(mY - eY, 2) + Math.pow(mX - eX, 2)) - 50;
}

function getAngle(mY, eY, mX, eX) {
  const coef = mX < eX ? 270 : 90;
  return `rotate(${
    (Math.atan((mY - eY) / (mX - eX)) * 180) / Math.PI + coef
  }deg)`;
}

document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.querySelector(".container");
  const eyes = document.querySelectorAll(".eye");

  wrap.addEventListener("mousemove", (e) => {
    eyes.forEach((eye) => {
      const xEye = eye.getBoundingClientRect().x + 50;
      const yEye = eye.getBoundingClientRect().y + 50;
      const h = getHypo(e.y, yEye, e.x, xEye);
      eye.firstElementChild.style.transform = getAngle(e.y, yEye, e.x, xEye);
      const p = h * 0.06 > 60 ? 60 : h * 0.06;
      eye.querySelector(".ball").style.top = h > 0 ? p + "%" : 2 + "px";
    });
  });
});
