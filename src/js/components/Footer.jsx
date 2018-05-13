import { h } from "hyperapp";
import sns from "../lib/sns";

function snsClick(type, state) {
  let text = "婚姻届に名前が書ける。証人にもなれる。";
  if (state.inputs.husbandFullname && state.inputs.wifeFullname) {
    text = `${state.inputs.husbandFullname}と${
      state.inputs.wifeFullname
    }の婚姻届を書いてみたよ。`;
  }
  sns({ type, url: location.href, text, hashtags: ["oshicon"] });
}

export default ({ state }) => (
  <footer className="footer">
    <p>※ 画像は長押し・右クリックで保存してください。</p>
    <p>
      ※
      実際の婚姻届は書名を直筆で書く必要があるため、こちらで作成したものは提出出来ません
    </p>
    <p>
      フォント:
      <a href="http://www8.plala.or.jp/p_dolce/index.html" target="_blank">
        あんずいろ様：あんずもじ
      </a>
    </p>
    <p>シェアする</p>
    <button
      className="tw"
      onclick={e => {
        snsClick("twitter", state);
      }}
    >
      ツイート
    </button>
    <button
      className="line"
      onclick={e => {
        snsClick("line", state);
      }}
    >
      LINEで送る
    </button>
    <button
      className="copy"
      onclick={e => {
        snsClick("copy", state);
      }}
    >
      URLをコピー
    </button>
  </footer>
);
