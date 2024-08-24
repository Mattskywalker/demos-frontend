import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Demo, Frame } from 'services/DemoService';

interface IFrameProvider {
  children: ReactNode;
}

interface FrameContextData {
  frames: Frame[];
  setFrames(frames: Frame[]): void;
  selectedDemo: Demo | undefined;
  setSelectedDemo(demo: Demo): void;
  clearFrames(): void;
  updateFrameById(frame: Frame): void;
}

const FrameContext = createContext<FrameContextData>({} as FrameContextData);

export function FrameProvider({ children }: IFrameProvider): JSX.Element {
  const [selectedDemo, setSelectedDemo] = useState<Demo>();
  const [frames, setFrames] = useState<Frame[]>([]);

  const updateFrameById = (frame: Frame) => {
    setFrames((prevFrames) => {
      const index = prevFrames.findIndex((data) => data.id === frame.id);
      if (index === -1) return prevFrames;

      prevFrames[index] = frame;
      return [...prevFrames];
    });
  };

  const clearFrames = () => {
    setFrames([]);
  };

  return (
    <FrameContext.Provider
      value={{
        updateFrameById,
        setSelectedDemo,
        clearFrames,
        setFrames,
        selectedDemo,
        frames,
      }}
    >
      {children}
    </FrameContext.Provider>
  );
}

export function useFrames(): FrameContextData {
  const context = useContext(FrameContext);
  return context;
}
