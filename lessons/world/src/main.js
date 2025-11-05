import { Graph } from "./js/math/graph";
import { Point } from "./js/primitives/point";
import { Segment } from "./js/primitives/segment";

const myCanvas = document.getElementById("myCanvas");
const addPointButton = document.getElementById("addPoint");
const addSegmentButton = document.getElementById("addSegment");

myCanvas.width = 700;
myCanvas.height = 700;

const ctx = myCanvas.getContext("2d");
const p1 = new Point(200, 200);
const p2 = new Point(500, 200);
const p3 = new Point(400, 400);
const p4 = new Point(100, 300);

const s1 = new Segment(p1, p2);
const s2 = new Segment(p1, p3);
const s3 = new Segment(p3, p4);
const s4 = new Segment(p2, p4);


const graph = new Graph([p1, p2, p3, p4], [s1, s2, s3]);
graph.draw(ctx);


addPointButton.addEventListener("click",()=>{
  const success = graph.tryAddPoint(
    new Point(Math.random()*myCanvas.width, Math.random()*myCanvas.height)
  )
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graph.draw(ctx);

  console.log(success?"Point added":"Point already exists");
});

addSegmentButton.addEventListener("click",()=>{
  const index1 = Math.floor(Math.random()*graph.points.length);
  const index2 = Math.floor(Math.random()*graph.points.length);

  let success = false;
  if(index1 !== index2) {
    success = graph.tryAddSegment(
      new Segment(graph.points[index1], graph.points[index2])
    );
}
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graph.draw(ctx);

});