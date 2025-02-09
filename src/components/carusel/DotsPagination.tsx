import React from 'react';
import items from '@/const/items';

type DotsPaginationProps = {
  activePagination: number;
  onClick: (index: number) => void;
};

const DotsPagination: React.FC<DotsPaginationProps> = ({ activePagination, onClick }) => {
  return (
    <div className="dots-pagination">
      {items
        .map((_, index) => (
          <button
            key={index}
            className={`dot ${activePagination === index ? 'active' : ''}`}
            onClick={() => onClick(index)}
          />
        ))}
    </div>
  );
};

export default DotsPagination;