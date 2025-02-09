'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import items from '@/const/items';
import CaruselItem from './CaruselItem';
import DotsPagination from './DotsPagination';

const CaruselItems: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [activePagination, setActivePagination] = useState(0);

  useEffect(() => {
    const sliderElement = sliderRef.current;

    if (sliderElement) {
      const handleScroll = () => syncPaginationWithScroll();

      sliderElement.addEventListener('scroll', handleScroll);
      return () => {
        sliderElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [syncPaginationWithScroll]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    isDragging.current = true;
    if (sliderRef.current) {
      startX.current = event.pageX - sliderRef.current.offsetLeft;
      scrollLeft.current = sliderRef.current.scrollLeft;
      sliderRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !sliderRef.current) return;
    event.preventDefault();
    const x = event.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
    if (sliderRef.current) {
      event.stopPropagation();
      sliderRef.current.scrollLeft += event.deltaY;
    }
  };

  function syncPaginationWithScroll() {
    if (sliderRef.current) {
      const scrollPosition = sliderRef.current.scrollLeft;
      const activeIndex = Math.round(scrollPosition / 365); 
      setActivePagination(activeIndex);
    }
  }
  
  const handlePaginationClick = (index: number) => {
    setActivePagination(index);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: index * 365,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const sliderElement = sliderRef.current;

    if (sliderElement) {
      const handleScroll = () => syncPaginationWithScroll();

      sliderElement.addEventListener('scroll', handleScroll);
      return () => {
        sliderElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [syncPaginationWithScroll]);

  return (
    <div className="slider-container">
      <DotsPagination activePagination={activePagination} onClick={handlePaginationClick} />
      <div
        ref={sliderRef}
        className="carusel-block"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <div className="main-carusel">
          {items.map((item, index) => (
            <CaruselItem
              href={index + 1}
              src={item.src}
              alt={item.alt}
              text={item.text}
              key={item.alt}
              isActive={index === activePagination}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaruselItems;