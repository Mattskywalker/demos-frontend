export interface Frame {
  createdAt: Date;
  demoId: string;
  html: string;
  id: string;
  order: number;
  updatedAt: Date;
}

export interface Demo {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  frames: Frame[];
}

export default class DemoService {
  async getDemo(demoid: string) {
    try {
      const response = await fetch(`http://localhost:3001/demo/${demoid}`, {
        method: 'GET',
      });

      const data = (await response.json()) as Demo;

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getFrame(frameid: string) {
    try {
      const response = await fetch(`http://localhost:3001/frame/${frameid}`, {
        method: 'GET',
      });

      const data = (await response.json()) as Frame;

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getAllDemos() {
    try {
      const response = await fetch('http://localhost:3001/demos', {
        method: 'GET',
      });

      const data = (await response.json()) as Demo[];
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async getDemoFrames(demoId: string) {
    try {
      const response = await fetch(
        `http://localhost:3001/demo/${demoId}/frames`,
        {
          method: 'GET',
        }
      );

      const data = (await response.json()) as Frame[];
      return data;
    } catch (e) {
      return [];
    }
  }

  async saveFrame(frame: Frame) {
    console.log('call saveFrame');
    try {
      const response = await fetch(`http://localhost:3001/frame/${frame.id}`, {
        method: 'PUT',
        body: JSON.stringify(frame),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = (await response.json()) as Frame[];
      return data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}
