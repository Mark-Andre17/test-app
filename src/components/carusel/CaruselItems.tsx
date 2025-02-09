'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import items from '@/const/items';
import CaruselItem from './CaruselItem';
import DotsPagination from './DotsPagination';

// Вынесем константу для лучшей поддерживаемости
const ITEM_WIDTH = 365;

const CaruselItems: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [activePagination, setActivePagination] = useState(0);
  const animationFrameId = useRef<number | undefined>(undefined);

  const syncPaginationWithScroll = useCallback(() => {
    if (sliderRef.current) {
      animationFrameId.current = requestAnimationFrame(() => {
        const scrollPosition = sliderRef.current!.scrollLeft;
        const activeIndex = Math.round(scrollPosition / ITEM_WIDTH);
        setActivePagination(activeIndex);
      });
    }
  }, []);

  useEffect(() => {
    const sliderElement = sliderRef.current;
    if (!sliderElement) return;

    const handleScroll = () => syncPaginationWithScroll();
    
    sliderElement.addEventListener('scroll', handleScroll);
    
    return () => {
      sliderElement.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [syncPaginationWithScroll]);

  const getSliderElement = () => sliderRef.current;

  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    isDragging.current = true;
    const slider = getSliderElement();
    if (slider) {
      startX.current = event.pageX - slider.offsetLeft;
      scrollLeft.current = slider.scrollLeft;
      slider.style.cursor = 'grabbing';
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    const slider = getSliderElement();
    if (slider) slider.style.cursor = 'grab';
  }, []);

  const handleMouseLeave = useCallback(() => {
    isDragging.current = false;
    const slider = getSliderElement();
    if (slider) slider.style.cursor = 'grab';
  }, []);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const slider = getSliderElement();
    if (!slider) return;

    event.preventDefault();
    const x = event.pageX - slider.offsetLeft;
    const walk = (x - startX.current) * 1;
    slider.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleWheel = useCallback<React.WheelEventHandler<HTMLDivElement>>((event) => {
    const slider = getSliderElement();
    if (slider) {
      event.stopPropagation();
      slider.scrollLeft += event.deltaY;
    }
  }, []);

  const handlePaginationClick = useCallback((index: number) => {
    const slider = getSliderElement();
    if (slider) {
      setActivePagination(index);
      slider.scrollTo({
        left: index * ITEM_WIDTH,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <div className="slider-container">
      <DotsPagination 
        activePagination={activePagination} 
        onClick={handlePaginationClick} 
      />
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