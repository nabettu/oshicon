import { h } from "hyperapp";

export default ({ state, actions }) => (
  <div className="painter">
    <div className="inputs">
      <p>
        <label>夫になる人: 氏</label>
        <input
          type="text"
          name="husbandSurname"
          onchange={e => actions.changeName(e.target)}
        />
        <label className="second">名</label>
        <input
          type="text"
          name="husbandName"
          onchange={e => actions.changeName(e.target)}
        />
      </p>
      <p>
        <label>妻になる人: 氏</label>
        <input
          type="text"
          name="wifeSurname"
          onchange={e => actions.changeName(e.target)}
        />
        <label className="second">名</label>
        <input
          type="text"
          name="wifeName"
          onchange={e => actions.changeName(e.target)}
        />
      </p>
      <p>
        <label>証人1</label>
        <input
          type="text"
          name="witness1"
          onchange={e => actions.changeName(e.target)}
        />
        <label className="second">証人2</label>
        <input
          type="text"
          name="witness2"
          onchange={e => actions.changeName(e.target)}
        />
      </p>
    </div>
    <img className="canvas" width="1500" height="1000" src={state.base64} />
  </div>
);
