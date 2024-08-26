import { GlobalEventHandlersEventMap } from 'Interfaces/GlobalEventHandlersEventMap';
export interface Frame {
  createdAt: Date;
  demoId: string;
  html: string;
  id: string;
  order: number;
  updatedAt: Date;
  event: {
    event: keyof GlobalEventHandlersEventMap;
    selectors: string;
    title: string;
    text: string;
  };
}

export interface Demo {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  frames: Frame[];
}

const api = 'http://localhost:3001';

export default class DemoService {
  async getDemo(demoid: string) {
    try {
      const response = await fetch(`${api}/demo/${demoid}`, {
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
      const response = await fetch(`${api}/frame/${frameid}`, {
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
      const response = await fetch('${api}/demos', {
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
      const response = await fetch(`${api}/demo/${demoId}/frames`, {
        method: 'GET',
      });

      const data = (await response.json()) as Frame[];
      return data;
    } catch (e) {
      return [];
    }
  }

  async saveFrame(frame: Frame) {
    try {
      const response = await fetch(`${api}/frame/${frame.id}`, {
        method: 'PUT',
        body: JSON.stringify(frame),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = (await response.json()) as Frame[];

      return data;
    } catch (e) {
      throw new Error(`cant save: ${e}`);
    }
  }
}
