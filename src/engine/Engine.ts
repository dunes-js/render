
export abstract class Engine
{

  constructor(
    protected CANVAS: HTMLCanvasElement,
    protected GL: WebGL2RenderingContext = CANVAS.getContext("webgl2")!
  )
  {
    if (this.GL === null) {
      throw "Unable to initialize WebGL. Your browser or machine may not support it.";
    }
  }

  #running = true;

  public async run()
  {
    await this.init();
    while(this.#running)
    {
      await this.render();
      await this.update();

      const error = this.GL.getError();
      if (error !== this.GL.NO_ERROR) {
        console.error('WebGL error:', error);
      }
    }
    await this.conclude();
  }

  protected abstract init(): Promise<void>;
  protected abstract render(): Promise<void>;
  protected abstract update(): Promise<void>;
  protected abstract conclude(): Promise<void>;
  
  protected async quit()
  {
    this.#running = false;
  };
}