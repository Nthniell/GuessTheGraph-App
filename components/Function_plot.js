import functionPlot from "function-plot";

const convertExponents = (equation) => {
  return equation.replace(/x\^(\d+)/g, (match, power) => {
    const times = parseInt(power);
    if (times <= 1) return 'x';
    return Array(times).fill('x').join('*');
  });
};

let contentsBounds = document.body.getBoundingClientRect();
let width = 800;
let height = 500;
let ratio = contentsBounds.width / width;
width *= ratio;
height *= ratio;

functionPlot({
  target: "#quadratic",
  width,
  height,
  yAxis: { domain: [-1, 9] },
  grid: true,
  data: [
    {
      fn: convertExponents("x^2"),
      derivative: {
        fn: "2 * x",
        updateOnMouseMove: true
      }
    }
  ]
});
