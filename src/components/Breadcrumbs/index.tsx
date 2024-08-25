import React from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import ArrowBack from 'assets/ArrowBack';
import ArrowForward from 'assets/ArrowForward';

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
      <button className="back" onClick={handleNavigate}>
        <div>
          <ArrowBack size="24px" />
        </div>
      </button>
      {path.map((data, index) => (
        <div key={data}>
          {!!index && <ArrowForward size="12px" />}
          <h3>{data}</h3>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
