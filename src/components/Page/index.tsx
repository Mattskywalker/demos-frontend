import { forwardRef, ReactNode } from 'react';

import './styles.css';
import { Helmet } from 'react-helmet-async';

interface Props {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
}

const Page = forwardRef<HTMLDivElement, Props>(
  ({ children, title = '', meta, ...other }, ref) => (
    <>
      <Helmet>
        <title>{`${title} | Getdemo`}</title>
        {meta}
      </Helmet>

      <div className="page-content">{children}</div>
    </>
  )
);

export default Page;
