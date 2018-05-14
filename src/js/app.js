import { h, app } from "hyperapp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Painter from "./components/Painter";
import img from "../img/konintodoke.png";
//@jsx h

const image = document.createElement("img");
image.src = img;
image.onload = () => {
  if (main) {
    main.updateImage();
  }
};
const canvas = document.createElement("canvas");
canvas.width = 1300;
canvas.height = 900;
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
    x: 205,
    y: 250
  },
  husbandName: {
    x: 320,
    y: 250
  },
  wifeSurname: {
    x: 440,
    y: 250
  },
  wifeName: {
    x: 560,
    y: 250
  },
  husbandFullname: {
    x: 260,
    y: 875
  },
  wifeFullname: {
    x: 500,
    y: 875
  },
  witness1: {
    x: 910,
    y: 238
  },
  witness2: {
    x: 1160,
    y: 238
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
