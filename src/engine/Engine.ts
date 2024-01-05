export abstract class Engine
{
  constructor()
  {}

  #running = true;

  #lastFrameTime = 0;
  protected deltaFrames = 0; 

  #lastUpdateTime = 0;
  protected deltaUpdates = 0; 

  protected fps = 0;
  protected upd = 0;
  protected delay = 0; 
  
  protected update_d = 0.1; 

  public async run()
  {
    await this.init();

    this.#lastFrameTime = Date.now();
    this.fps = 0;

    while(this.#running)
    {
      await this.#render();
      await this.#update();

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

  async #render()
  {
    await this.render();
    
    this.deltaFrames = (Date.now() - this.#lastFrameTime) / 1000;
    this.#lastFrameTime = Date.now();
    this.fps = 1/this.deltaFrames;
  }

  async #update()
  {
    const delta = (Date.now() - this.#lastUpdateTime)/1000;
    if (delta < this.update_d) return;

    await this.update();

    this.deltaUpdates = delta;
    this.#lastUpdateTime = Date.now();
    this.upd = 1/this.deltaUpdates;
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