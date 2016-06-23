/**
 * Created by Franz on 4/30/2016.
 */
export class Config {
  port: number;
  mongoURI: string;
  constructor(private target?:string) {
    // TODO: drop environments to loadable json files
    target = target ? target : (process.env.NODE_ENV ? process.env.NODE_ENV : 'dev');
    if(target === 'production') {
      this.port = 80;
      this.mongoURI = 'mongodb://localhost/ocrXpress'
    } else if (target === 'test') {
      this.port = 9010;
      this.mongoURI = 'mongodb://localhost/ocrXpress-test';
    } else if (target === 'dev') {
      this.port = 9000;
      this.mongoURI = 'mongodb://localhost/ocrXpress-dev';
    } else {
      throw new Error('no target');
    }
  };
}



