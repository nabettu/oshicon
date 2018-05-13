import { h, app } from "hyperapp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Painter from "./components/Painter";
//@jsx h

const image = document.createElement("img");
image.src = "./assets/konintodoke.png";
image.onload = () => {
  if (main) {
    main.updateImage();
  }
};
const canvas = document.createElement("canvas");
canvas.width = 1500;
canvas.height = 1000;
const context = canvas.getContext("2d");
context.font = "20px 'APJapanesefontT'";
context.textAlign = "center";

const state = {
  canvas,
  context,
  image,
  inputs: {
    husbandSurname: "",
    husbandName: "",
    wifeSurname: "",
    wifeName: "",
    husbandFullname: "",
    wifeFullname: "",
    witness1: "",
    witness2: ""
  }
};

const positions = {
  husbandSurname: {
    x: 305,
    y: 300
  },
  husbandName: {
    x: 420,
    y: 300
  },
  wifeSurname: {
    x: 540,
    y: 300
  },
  wifeName: {
    x: 660,
    y: 300
  },
  husbandFullname: {
    x: 360,
    y: 925
  },
  wifeFullname: {
    x: 600,
    y: 925
  },
  witness1: {
    x: 1010,
    y: 288
  },
  witness2: {
    x: 1260,
    y: 288
  }
};

const actions = {
  setName: elm => state => {
    state.inputs[elm.name] = elm.value;
    state.inputs.husbandFullname =
      state.inputs.husbandSurname + state.inputs.husbandName;
    state.inputs.wifeFullname =
      state.inputs.wifeSurname + state.inputs.wifeName;
    return state;
  },
  changeName: elm => (state, actions) => {
    actions.updateImage(actions.setName(elm));
  },
  setCanvas: canvas => (state, actions) => {
    const context = canvas.getContext("2d");
    context.font = "20px 'APJapanesefontT'";
    context.textAlign = "center";
    // setInterval(() => {
    //   actions.updateImage();
    // }, 500);
    return { canvas, context };
  },
  updateImage: e => (state, actions) => {
    // console.log(state.canvas);
    // console.log(state);
    state.context.drawImage(state.image, 0, 0);
    Object.keys(positions).map(keys => {
      // console.log(state.inputs[keys]);
      if (state.inputs[keys]) {
        state.context.fillText(
          state.inputs[keys],
          positions[keys].x,
          positions[keys].y
        );
      }
    });
    // console.log("base64");
    actions.setBase64(state.canvas.toDataURL());
  },
  setBase64: data => state => ({ base64: data })
};

const view = (state, actions) => (
  <main>
    <Header />
    <Painter state={state} actions={actions} />
    <Footer state={state} />
  </main>
);

const main = app(state, actions, view, document.body);
