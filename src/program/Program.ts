import { WebGLClass } from "../WebGLClass.js";

export class Program extends WebGLClass
{
  #program: WebGLProgram;

  constructor(GL: WebGL2RenderingContext)
  {
    super(GL);
    this.#program = GL.createProgram()!;
    if (!this.#program)
    {
      console.log("Failed to create program");
    }
  }

  public get program()
  {
    return this.#program;
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

  public unuse(): void
  {
    this.GL.useProgram(null);
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

  public uniform(name: string): WebGLUniformLocation | null
  {
    return this.GL.getUniformLocation(this.#program, name);
  }

  public setBool(name: string, value: boolean)
  {
    this.GL.uniform1i(
      this.GL.getUniformLocation(this.#program, name), 
      value?1:0
    );
  }

  public setInt(name: string, value: number)
  {
    this.GL.uniform1i(
      this.GL.getUniformLocation(this.#program, name), 
      value
    );
  }

  public setFloat(name: string, value: number)
  {
    this.GL.uniform1f(
      this.GL.getUniformLocation(this.#program, name), 
      value
    );
  }

  public setVec2(name: string, value: number[], offset?: number, length?: number)
  {
    this.GL.uniform2fv(
      this.GL.getUniformLocation(this.#program, name), 
      value, offset, length
    );
  }

  public setVec3(name: string, value: number[], offset?: number, length?: number)
  {
    this.GL.uniform3fv(
      this.GL.getUniformLocation(this.#program, name), 
      value, offset, length
    );
  }

  public setVec4(name: string, value: number[], offset?: number, length?: number)
  {
    this.GL.uniform4fv(
      this.GL.getUniformLocation(this.#program, name), 
      value, offset, length
    );
  }

  public setMat2(name: string, value: number[], transpose = false, offset?: number, length?: number)
  {
    this.GL.uniformMatrix2fv(
      this.GL.getUniformLocation(this.#program, name), 
      transpose, value, offset, length
    );
  }

  public setMat3(name: string, value: number[], transpose = false, offset?: number, length?: number)
  {
    this.GL.uniformMatrix3fv(
      this.GL.getUniformLocation(this.#program, name), 
      transpose, value, offset, length
    );
  }

  public setMat4(name: string, value: number[], transpose = false, offset?: number, length?: number)
  {
    this.GL.uniformMatrix4fv(
      this.GL.getUniformLocation(this.#program, name), 
      transpose, value, offset, length
    );
  }
}