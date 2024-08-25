import { LoadingAnimation } from 'components/Loadable';
import { createContext, ReactNode, useContext, useState } from 'react';

interface ILoaderProvider {
  children: ReactNode;
}

interface LoaderContextData {
  loading: boolean;
  enabelLoading(): void;
  disableLoading(): void;
}

const LoaderContext = createContext<LoaderContextData>({} as LoaderContextData);

export function LoaderProvider({ children }: ILoaderProvider): JSX.Element {
  const [loading, setLoading] = useState(false);

  const enabelLoading = () => {
    setLoading(true);
  };
  const disableLoading = () => {
    setLoading(false);
  };

  return (
    <LoaderContext.Provider value={{ disableLoading, enabelLoading, loading }}>
      {children}
      {loading && (
        <span
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgb(0,0,0,0.4)',
            top: '0',
          }}
        >
          <span style={{ opacity: 2 }}>
            <LoadingAnimation />
          </span>
        </span>
      )}
    </LoaderContext.Provider>
  );
}

export function useLoader(): LoaderContextData {
  const context = useContext(LoaderContext);
  return context;
}
