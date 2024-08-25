import { forwardRef, ReactNode } from 'react';

import './styles.css';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs, { BreadcrumbsProps } from 'components/Breadcrumbs';

interface Props {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
  breadCrumbs: BreadcrumbsProps;
}

const Page = forwardRef<HTMLDivElement, Props>(
  ({ children, title = '', meta, breadCrumbs, ...other }, ref) => (
    <>
      <Helmet>
        <title>{`${title} | Getdemo`}</title>
        {meta}
      </Helmet>

      {breadCrumbs && <Breadcrumbs {...breadCrumbs} />}
      <div className="page-content">{children}</div>
    </>
  )
);

export default Page;
