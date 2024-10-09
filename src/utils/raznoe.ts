type TState = {
  _sum: number;
  name: string;
  sum: number;
};
type TActions = {
  setName: (param: string) => TMyObject;
  sumPeriod: (start: number, end: number) => TMyObject;
  toString: () => TMyObject;
  toUpper: () => TMyObject;
  toSixLetter: () => TMyObject;
};

type TMyObject = TState & TActions;

function MyCreate<T extends Object>(param: T): T {
  return param;
}

export const my_abc = MyCreate<TState & TActions>({
  _sum: 0,
  name: "",
  setName(param) {
    this.name = param;
    return this;
  },
  sumPeriod(start, end) {
    const count = end - start + 1;
    this._sum = (count * (start + end)) / 2;
    return this;
  },
  toString() {
    this.name = this.name + "-" + this._sum.toString();
    return this;
  },
  toUpper() {
    this.name = this.name.toUpperCase();
    return this;
  },
  toSixLetter() {
    this.name = this.name.substring(0, 6);
    return this;
  },
  get sum() {
    return this._sum;
  },
  set sum(param: number) {
    this._sum = param;
  },
});
