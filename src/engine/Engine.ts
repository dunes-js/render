export abstract class Engine
{
  constructor()
  {}

  #running = true;

  public async run()
  {
    await this.init();
    while(this.#running)
    {
      await this.render();
      await this.update();

      const error = GL.getError();
      if (error !== GL.NO_ERROR) {
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