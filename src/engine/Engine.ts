export abstract class Engine
{
  constructor()
  {}

  #running = true;
  #lastTime = 0;
  #timer = 0;
  #deltaTime = 0;
  #nowTime = 0;

  protected frames = 0;
  protected updates = 0;
  protected maxUpdates = 60;

  public async run()
  {
    this.#lastTime = Date.now();
    this.#timer = this.#lastTime;

    await this.init();
    while(this.#running)
    {
      await this.render();
      await this.update();

      this.#nowTime = Date.now();
      this.#deltaTime += (this.#nowTime - this.#lastTime) / this.maxUpdates;
      this.#lastTime = this.#nowTime;
      
      while (this.#deltaTime >= 1000){
        this.update();
        this.updates++;
        this.#deltaTime--;
      }

      this.frames++;

      if (Date.now() - this.#timer > 1000) {
        this.#timer ++;
        this.updates = 0; 
        this.frames = 0;
      }

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