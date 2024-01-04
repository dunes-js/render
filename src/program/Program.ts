
export class Program
{
  #program: WebGLProgram;

  constructor()
  {
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
    const shader = Program.createShader(GL, source, GL.VERTEX_SHADER);
    GL.attachShader(this.#program, shader);
  }

  public onFragment(source: string): void
  {
    const shader = Program.createShader(GL, source, GL.FRAGMENT_SHADER);
    GL.attachShader(this.#program, shader);
  }

  public link(): void
  {
    GL.linkProgram(this.#program);

    if (!GL.getProgramParameter(this.#program, GL.LINK_STATUS)) {
      const info = GL.getProgramInfoLog(this.#program);
      throw `Could not compile WebGL program. \n\n${info}`;
    }
  }

  public use(): void
  {
    GL.useProgram(this.#program);
  }

  public unuse(): void
  {
    GL.useProgram(null);
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
    return GL.getUniformLocation(this.#program, name);
  }

  public setBool(name: string, value: boolean)
  {
    GL.uniform1i(
      GL.getUniformLocation(this.#program, name), 
      value?1:0
    );
  }

  public setInt(name: string, value: number)
  {
    GL.uniform1i(
      GL.getUniformLocation(this.#program, name), 
      value
    );
  }

  public setFloat(name: string, value: number)
  {
    GL.uniform1f(
      GL.getUniformLocation(this.#program, name), 
      value
    );
  }

  public setVec2(name: string, value: number[], offset?: number, length?: number)
  {
    GL.uniform2fv(
      GL.getUniformLocation(this.#program, name), 
      value, offset, length
    );
  }

  public setVec3(name: string, value: number[], offset?: number, length?: number)
  {
    GL.uniform3fv(
      GL.getUniformLocation(this.#program, name), 
      value, offset, length
    );
  }

  public setVec4(name: string, value: number[], offset?: number, length?: number)
  {
    GL.uniform4fv(
      GL.getUniformLocation(this.#program, name), 
      value, offset, length
    );
  }

  public setMat2(name: string, value: number[], transpose = false, offset?: number, length?: number)
  {
    GL.uniformMatrix2fv(
      GL.getUniformLocation(this.#program, name), 
      transpose, value, offset, length
    );
  }

  public setMat3(name: string, value: number[], transpose = false, offset?: number, length?: number)
  {
    GL.uniformMatrix3fv(
      GL.getUniformLocation(this.#program, name), 
      transpose, value, offset, length
    );
  }

  public setMat4(name: string, value: number[], transpose = false, offset?: number, length?: number)
  {
    GL.uniformMatrix4fv(
      GL.getUniformLocation(this.#program, name), 
      transpose, value, offset, length
    );
  }
}