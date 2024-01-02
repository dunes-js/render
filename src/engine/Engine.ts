
export abstract class Engine
{

  protected GL: WebGLRenderingContext;
  constructor(private CANVAS: HTMLCanvasElement)
  {
    this.GL = CANVAS.getContext("webgl2")!;
  }

  #running = true;

  public async run()
  {
    await this.init();
    while(this.#running)
    {
      await this.render();
      await this.update(this.CANVAS.width, this.CANVAS.height);

    }
    await this.conclude();
  }

  protected abstract init(): Promise<void>;
  protected abstract render(): Promise<void>;
  protected abstract update(width: number, height: number): Promise<void>;
  protected abstract conclude(): Promise<void>;
  
  protected async quit()
  {
    this.#running = false;
  };
}