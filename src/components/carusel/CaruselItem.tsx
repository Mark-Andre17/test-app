import { FC, RefObject } from 'react';
import Link from 'next/link';
import Image from 'next/image';


interface ICaruselItemProps {
    src: string;
    alt: string;
    text: string;
    href: number;
    isActive: boolean;
}

const CaruselItem:FC<ICaruselItemProps> = ({ src, alt, text, href}) => {
    return (
            <div className="carusel-item">
                <Image src={src} alt={alt}></Image>
                <Link href={`/${href}`}>
                    {text}
                </Link>
            </div>
    );
};

export default CaruselItem;