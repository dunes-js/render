
export * from "./engine/Engine.js"
export * from "./engine/Canvas.js"
export * from "./program/Program.js"


declare global
{
  var GL: WebGL2RenderingContext;
}