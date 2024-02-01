"use strict";

function createElement(html) {
  const root = document.createElement("div");
  root.insertAdjacentHTML("beforeend", html);
  return root.firstElementChild;
}

class Counter {
  _element = null;
  _subElements = {};

  constructor({ initialValue, increaseValue, decreaseValue, fontColor: { zero: zeroColor, positive: positiveColor, negative: negativeColor } }) {
    this._initialValue = initialValue;
    this._increaseValue = increaseValue;
    this._decreaseValue = decreaseValue;
    this._state = initialValue;
    this._colorZero = zeroColor;
    this._colorPositive = positiveColor;
    this._colorNegative = negativeColor;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._addListeners();
    this._render(this._state);
  }

  _addListeners() {
    this._subElements.minus.addEventListener("click", this._decrease.bind(this));
    this._subElements.reset.addEventListener("click", this._reset.bind(this));
    this._subElements.plus.addEventListener("click", this._increase.bind(this));
  }

  _render(value) {
    this._subElements.counterValue.textContent = `${value}`;
  }

  _increase() {
    this._state += this._increaseValue;
    this._render(this._state);
  }

  _reset() {
    if (confirm(`Вы точно хотите сбросить счетчик со значения ${this._state} на ${this._initialValue}?`)) {
      return this._render(this._initialValue);
    }
  }

  _decrease() {
    this._state -= this._decreaseValue;
    this._render(this._state);
  }

  _getTemplate() {
    return `<div class="counter">
								<h2 class="counter__title">Counter</h2>
								<span class="counter__result" data-element="counterValue"></span>
								<div class="counter__edit">
									<button class="counter__minus btn" data-element="minus">-</button>
									<button class="counter__reset btn" data-element="reset">reset</button>
									<button class="counter__plus btn" data-element="plus">+</button>
								</div>
							</div>`;
  }

  get element() {
    return this._element;
  }

  _getSubElements() {
    return Array.from(this._element.querySelectorAll("[data-element]")).reduce((acc, el) => {
      return {
        ...acc,
        [el.getAttribute("data-element")]: el,
      };
    }, {});
  }
}

const root = document.querySelector(".root");

const counter1 = new Counter({
  initialValue: 3,
  increaseValue: 2,
  decreaseValue: 1,
  fontColor: {
    zero: "black",
    positive: "green",
    negative: "dark blue",
  },
});

const counter2 = new Counter({
  initialValue: 1,
  increaseValue: 1,
  decreaseValue: 3,
  fontColor: {
    zero: "purple",
    positive: "yellow",
    negative: "red",
  },
});

root.insertAdjacentElement("afterbegin", counter1.element);
root.insertAdjacentElement("beforeend", counter2.element);
