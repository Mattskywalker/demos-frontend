import React from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

export interface BreadcrumbsProps {
  path: string[];
  backTo: string;
}

const Breadcrumbs = ({ path, backTo }: BreadcrumbsProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(backTo);
  };

  return (
    <div className="breadcrumbs">
      <button onClick={handleNavigate}>{'<='}</button>
      {path.map((data) => (
        <div>
          {'>'}
          <h3>{data}</h3>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
