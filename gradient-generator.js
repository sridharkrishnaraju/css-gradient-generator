/**
 * <gradient-generator> — visual CSS gradient generator with live preview + copy. Zero dependencies.
 * Built & maintained by SGBP — Singapore Build Partners (https://sgbp.tech). MIT.
 */
class GradientGenerator extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: "open" }); this._defaults(); }
  _defaults() { this.type = "linear"; this.angle = 135; this.c1 = "#EB0028"; this.c2 = "#1a1a2e"; }
  connectedCallback() { this.render(); }
  _css() {
    const g = this.type === "radial"
      ? `radial-gradient(circle, ${this.c1}, ${this.c2})`
      : `linear-gradient(${this.angle}deg, ${this.c1}, ${this.c2})`;
    return `background: ${g};`;
  }
  _update() {
    const $ = (s) => this.shadowRoot.querySelector(s);
    $("#preview").style.background = this._css().replace("background: ", "").replace(/;$/, "");
    $("#out").textContent = this._css();
    $("#angleRow").style.display = this.type === "radial" ? "none" : "flex";
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        *,*::before,*::after{box-sizing:border-box}
        :host{display:block;width:100%;max-width:520px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
        .card{border:1px solid #e2e2e2;border-radius:12px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.06);padding:16px}
        .stage{height:150px;border-radius:10px;border:1px solid #eee;margin-bottom:14px}
        .ctrl{display:flex;align-items:center;gap:10px;margin:8px 0}
        .ctrl label{font-size:12px;font-weight:600;color:#555;width:96px;flex:0 0 auto}
        input[type=range]{flex:1;min-width:0;accent-color:#EB0028}
        input[type=color]{width:46px;height:32px;padding:0;border:1px solid #ccc;border-radius:6px;background:none;cursor:pointer}
        input[type=color]::-webkit-color-swatch-wrapper{padding:2px}
        input[type=color]::-webkit-color-swatch{border:0;border-radius:4px}
        input[type=color]::-moz-color-swatch{border:0;border-radius:4px}
        select{flex:1;min-width:0;font:inherit;font-size:13px;padding:6px 8px;border:1px solid #ccc;border-radius:8px;background:#fff}
        .ctrl output{font-size:12px;font-family:ui-monospace,monospace;color:#333;width:46px;text-align:right;flex:0 0 auto}
        .swatches{display:flex;gap:10px}
        .sw{flex:1;display:flex;align-items:center;gap:8px}
        .sw span{font-size:12px;font-weight:600;color:#555}
        .outwrap{margin-top:14px;display:flex;align-items:stretch;gap:8px}
        pre{flex:1;min-width:0;background:#1a1a1a;color:#f4f4f4;border-radius:8px;padding:10px 12px;font-family:ui-monospace,monospace;font-size:12.5px;line-height:1.5;margin:0;overflow-x:auto;white-space:pre-wrap;word-break:break-word}
        .btns{display:flex;flex-direction:column;gap:6px;flex:0 0 auto}
        button{font:inherit;font-size:12px;font-weight:700;border-radius:8px;padding:8px 12px;cursor:pointer}
        .copy{color:#fff;background:#EB0028;border:0}
        .reset{color:#555;background:#fff;border:1px solid #ccc}
      </style>
      <div class="card">
        <div class="stage" id="preview"></div>
        <div class="ctrl"><label>Type</label>
          <select id="type"><option value="linear">Linear</option><option value="radial">Radial</option></select></div>
        <div class="ctrl" id="angleRow"><label>Angle</label>
          <input type="range" id="angle" min="0" max="360" value="${this.angle}"><output id="o-angle">${this.angle}&deg;</output></div>
        <div class="swatches">
          <div class="sw"><span>Color 1</span><input type="color" id="c1" value="${this.c1}"></div>
          <div class="sw"><span>Color 2</span><input type="color" id="c2" value="${this.c2}"></div>
        </div>
        <div class="outwrap"><pre id="out"></pre><div class="btns"><button class="copy" id="copy">Copy</button><button class="reset" id="reset">Reset</button></div></div>
      </div>`;
    const $ = (s) => this.shadowRoot.querySelector(s);
    $("#type").addEventListener("change", (e) => { this.type = e.target.value; this._update(); });
    $("#angle").addEventListener("input", (e) => { this.angle = +e.target.value; $("#o-angle").innerHTML = e.target.value + "&deg;"; this._update(); });
    $("#c1").addEventListener("input", (e) => { this.c1 = e.target.value; this._update(); });
    $("#c2").addEventListener("input", (e) => { this.c2 = e.target.value; this._update(); });
    $("#copy").addEventListener("click", () => { navigator.clipboard && navigator.clipboard.writeText(this._css()); const b = $("#copy"), o = b.textContent; b.textContent = "Copied"; setTimeout(() => b.textContent = o, 900); });
    $("#reset").addEventListener("click", () => { this._defaults(); this.render(); });
    this._update();
  }
}
if (!customElements.get("gradient-generator")) customElements.define("gradient-generator", GradientGenerator);
