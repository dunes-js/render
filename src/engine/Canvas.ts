export class Canvas
{
  #canvas: HTMLCanvasElement

  constructor(id: string)
  constructor(c: HTMLElement)
  constructor(c: string | HTMLElement)
  {
    if (typeof c == "string")
    {
      this.#canvas = document.querySelector<
        HTMLCanvasElement>(c)!;
    }
    else
    {
      this.#canvas = c as HTMLCanvasElement;
    }

    if (!(this.#canvas instanceof HTMLCanvasElement))
    {
      throw "Canvas was not loaded properly";
    }
  }

  makeContextCurrent()
  {
    GL = this.#canvas.getContext("webgl2")!;
    if (!GL)
    {
      throw "Could not initialize WebGL2 context";
    }
  }

  get rect()
  {
    return this.#canvas.getBoundingClientRect();
  }
}