import gsap from "gsap";
import { Flip } from "gsap/all";
gsap.registerPlugin(Flip);

const desk = document.querySelector(".desk");
const header = document.querySelector(".header");
const items = gsap.utils.toArray(".item");
const flipTargets = [header, ...items];
const switches = document.querySelectorAll(".modes button");

let activeMode = "chaos";

const itemSizes = {
  music: 325,
  appicon: 100,
  cd: 400,
  cursor: 125,
  dialog: 300,
  folder: 150,
  lighter: 225,
  macmini: 250,
  paper: 375,
  passport: 250,
  portrait: 375,
};

const arrangements = {
  chaos: {
    header: { x: 50, y: 47.5, center: true },
    items: [
      { id: "music", x: -2.5, y: -2.5, rotation: -15 },
      { id: "appicon", x: 20, y: 15, rotation: 5 },
      { id: "cd", x: 72.5, y: 5, rotation: 0 },
      { id: "cursor", x: 72.5, y: 75, rotation: 0 },
      { id: "dialog", x: 80, y: 60, rotation: 15 },
      { id: "folder", x: 90, y: 50, rotation: 5 },
      { id: "lighter", x: 2.5, y: 45, rotation: -10 },
      { id: "macmini", x: 9.5, y: 55, rotation: 15 },
      { id: "paper", x: 5, y: 15, rotation: 10 },
      { id: "passport", x: -2.5, y: 65, rotation: -35 },
      { id: "portrait", x: 65, y: 20, rotation: -5 },
    ],
  },
  cleanup: {
    header: { x: 70, y: 37.5, center: false },
    items: [
      { id: "music", x: 76.5, y: -5, rotation: 0 },
      { id: "appicon", x: 64.5, y: 6, rotation: 0 },
      { id: "cd", x: 0, y: 47.5, rotation: 0 },
      { id: "cursor", x: 63.5, y: 23, rotation: 0 },
      { id: "dialog", x: 34.5, y: 59, rotation: 0 },
      { id: "folder", x: 24.5, y: 33, rotation: 0 },
      { id: "lighter", x: -6, y: 3.5, rotation: 0 },
      { id: "macmini", x: 82.5, y: 66, rotation: 0 },
      { id: "paper", x: 9, y: -3.5, rotation: 0 },
      { id: "passport", x: 60, y: 65.5, rotation: 0 },
      { id: "portrait", x: 36.5, y: 5.5, rotation: 0 },
    ],
  },
  notebook: {
    header: { x: 50, y: 47.5, center: true },
    items: [
      { id: "music", x: 45, y: 0.5, rotation: 20 },
      { id: "appicon", x: 65, y: 70, rotation: 25 },
      { id: "cd", x: 27.5, y: 15, rotation: 10 },
      { id: "cursor", x: 75, y: 35, rotation: 0 },
      { id: "dialog", x: 30, y: 57.5, rotation: 10 },
      { id: "folder", x: 25, y: 40, rotation: 10 },
      { id: "lighter", x: 30, y: 7.5, rotation: 30 },
      { id: "macmini", x: 50, y: 50, rotation: -5 },
      { id: "paper", x: 10, y: 10, rotation: -30 },
      { id: "passport", x: 16.5, y: 50, rotation: -20 },
      { id: "portrait", x: 57.5, y: 20, rotation: 10 },
    ],
  },
};

function setLayout(mode) {
  const deskWidth = desk.offsetWidth;
  const deskHeight = desk.offsetHeight;
  const layout = arrangements[mode];

  const isMobile = deskWidth < 1000;
  const offsetX = isMobile
    ? header.offsetWidth / 2
    : layout.header.center
      ? header.offsetWidth / 2
      : 0;
  const offsetY = isMobile
    ? header.offsetHeight / 2
    : layout.header.center
      ? header.offsetHeight / 2
      : 0;
  const headerX = isMobile ? 50 : layout.header.x;
  const headerY = isMobile ? 47.5 : layout.header.y;

  gsap.set(header, {
    x: (headerX / 100) * deskWidth - offsetX,
    y: (headerY / 100) * deskHeight - offsetY,
    rotation: 0,
  });

  layout.items.forEach(({ id, x, y, rotation }) => {
    gsap.set(`#${id}`, {
      x: (x / 100) * deskWidth,
      y: (y / 100) * deskHeight,
      width: itemSizes[id],
      height: itemSizes[id],
      rotation,
    });
  });
}

function switchMode(mode) {
  if (mode === activeMode) return;

  const state = Flip.getState(flipTargets);
  setLayout(mode);

  Flip.from(state, {
    duration: 1.25,
    ease: "power3.inOut",
    stagger: { amount: 0.1, from: "center" },
    absolute: true,
  });

  activeMode = mode;
}

setLayout("chaos");

switches.forEach((btn) => {
  btn.addEventListener("click", () => {
    switches.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    switchMode(btn.dataset.mode);
  });
});

window.addEventListener("resize", () => setLayout(activeMode));
