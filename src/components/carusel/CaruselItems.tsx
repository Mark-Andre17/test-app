'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import items from '@/const/items';
import CaruselItem from './CaruselItem';
import DotsPagination from './DotsPagination';

const CaruselItems: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null); // Референс на контейнер слайдера
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [activePagination, setActivePagination] = useState(0); // Состояние активной точки пагинации

  // Обработчик нажатия мышью
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    isDragging.current = true;
    if (sliderRef.current) {
      startX.current = event.pageX - sliderRef.current.offsetLeft;
      scrollLeft.current = sliderRef.current.scrollLeft;
      sliderRef.current.style.cursor = 'grabbing';
    }
  };

  // Обработчик отпускания мыши
  const handleMouseUp = () => {
    isDragging.current = false;
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
    }
  };

  // Обработчик ухода мыши за пределы слайдера
  const handleMouseLeave = () => {
    isDragging.current = false;
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
    }
  };

  // Обработчик движения мыши
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !sliderRef.current) return;
    event.preventDefault();
    const x = event.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1; // Коэффициент указан как 1, для более плавного движения можно увеличить
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Обработчик скролла колесиком
  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
    if (sliderRef.current) {
      event.preventDefault();
      sliderRef.current.scrollLeft += event.deltaY;
    }
  };

  // Обновляем активную точку пагинации после скролла
  const syncPaginationWithScroll = useCallback(() => {
    if (sliderRef.current) {
      const scrollPosition = sliderRef.current.scrollLeft; // Текущая позиция прокрутки
      const activeIndex = Math.round(scrollPosition / 368); // Рассчитываем текущий индекс (368 — ширина каждого элемента)
      setActivePagination(activeIndex);
    }
  }, []);

  // Обработчик клика на точку пагинации
  const handlePaginationClick = (index: number) => {
    setActivePagination(index);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: index * 368, // Скроллим до нужного слайда
        behavior: 'smooth', // Плавная прокрутка
      });
    }
  };

  // Слушаем событие прокрутки контейнера и обновляем активную пагинацию
  useEffect(() => {
    const sliderElement = sliderRef.current;

    if (sliderElement) {
      const handleScroll = () => syncPaginationWithScroll();

      sliderElement.addEventListener('scroll', handleScroll);
      return () => {
        sliderElement.removeEventListener('scroll', handleScroll); // Чистим слушатель при размонтаж
      };
    }
  }, [syncPaginationWithScroll]);

  return (
    <div className="slider-container">
      {/* Компонент пагинации */}
      <DotsPagination activePagination={activePagination} onClick={handlePaginationClick} />
      <div
        ref={sliderRef} // Привязка ссылки на контейнер слайдера
        className="carusel-block"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <div className="main-carusel">
          {/* Отрисовка элементов слайдера */}
          {items.map((item, index) => (
            <CaruselItem
              href={index + 1}
              src={item.src}
              alt={item.alt}
              text={item.text}
              key={item.alt}
              isActive={index === activePagination} // Передаем активный статус текущего элемента
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaruselItems;