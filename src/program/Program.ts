import { WebGLClass } from "../WebGLClass.js";

export class Program extends WebGLClass
{
  #program: WebGLProgram;

  constructor(GL: WebGLRenderingContext)
  {
    super(GL);
    this.#program = GL.createProgram()!;
    if (!this.#program)
    {
      console.log("Failed to create program");
    }
  }

  public onVertex(source: string): void
  {
    const shader = Program.createShader(this.GL, source, this.GL.VERTEX_SHADER);
    this.GL.attachShader(this.#program, shader);
  }

  public onFragment(source: string): void
  {
    const shader = Program.createShader(this.GL, source, this.GL.FRAGMENT_SHADER);
    this.GL.attachShader(this.#program, shader);
  }

  public link(): void
  {
    this.GL.linkProgram(this.#program);

    if (!this.GL.getProgramParameter(this.#program, this.GL.LINK_STATUS)) {
      const info = this.GL.getProgramInfoLog(this.#program);
      throw `Could not compile WebGL program. \n\n${info}`;
    }
  }

  public use(): void
  {
    this.GL.useProgram(this.#program);
  }

  private static createShader(GL: WebGLRenderingContext, source: string, type: number)
  {
    const shader = GL.createShader(type)!;
    GL.shaderSource(shader, source);
    GL.compileShader(shader);

    if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
      const info = GL.getShaderInfoLog(shader);
      throw `Could not compile ${
        type == GL.VERTEX_SHADER? "vertex" : "fragment"
      } shader. \n\n${info}`;
    }

    return shader;
  }
}