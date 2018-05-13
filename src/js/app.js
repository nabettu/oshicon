import { h, app } from "hyperapp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Painter from "./components/Painter";
//@jsx h

const state = {
  canvas: null,
  image: null,
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

window.positions = {
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
    context.font = "20px 'ＭＳ Ｐゴシック'";
    context.textAlign = "center";
    // setInterval(() => {
    //   actions.updateImage();
    // }, 500);
    return {
      canvas,
      context
    };
  },
  setImage: elm => state => ({ image: elm }),
  updateImage: e => state => {
    // console.log(state.canvas);
    console.log(state);
    state.context.drawImage(state.image, 0, 0);
    Object.keys(positions).map(keys => {
      console.log(keys);
      if (state.inputs[keys]) {
        state.context.fillText(
          state.inputs[keys],
          positions[keys].x,
          positions[keys].y
        );
      }
    });
  }
};

const view = (state, actions) => (
  <main>
    <Header />
    <Painter state={state} actions={actions} />
    <Footer state={state} />
  </main>
);

export const main = app(state, actions, view, document.body);
