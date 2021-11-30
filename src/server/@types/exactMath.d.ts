declare module "exact-math" {
  type mathResolvable = number | string;
  namespace exactMath {
    function add(a:mathResolvable, ...b:mathResolvable[]):number;
    function sub(a:mathResolvable, ...b:mathResolvable[]):number;
    function mul(a:mathResolvable, ...b:mathResolvable[]):number;
    function div(a:mathResolvable, ...b:mathResolvable[]):number;
    function formula(fml:mathResolvable):number;
    function round(x:mathResolvable, digit:mathResolvable):number;
    function ceil(x:mathResolvable, digit:mathResolvable):number;
    function floor(x:mathResolvable, digit:mathResolvable):number;
    function pow(x:mathResolvable, y:mathResolvable):number;
  }
  export default exactMath;
}