export abstract class Engine
{
  constructor()
  {}

  #running = true;

  #lastCalledTime = 0;
  fps = 0;
  delta = 0; 
  delay = 0; 

  public async run()
  {
    await this.init();

    this.#lastCalledTime = Date.now();
    this.fps = 0;

    while(this.#running)
    {
      await this.render();
      await this.update();

      var delta = (Date.now() - this.#lastCalledTime)/1000;
      this.#lastCalledTime = Date.now();
      this.fps = 1/delta;

      const error = GL.getError();
      if (error !== GL.NO_ERROR) {
        console.error('WebGL error:', error);
        break;
      }

      if (this.delay)
      {
        await new Promise(res => setTimeout(res, this.delay));
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