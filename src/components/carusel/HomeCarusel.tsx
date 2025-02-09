import { ReactNode, FC } from 'react';

interface ICaruselProps {
    children: ReactNode;
}

const HomeCarusel:FC<ICaruselProps> = ({ children }) => {
    return (
        <section className="main-block">
            {children}
        </section>
    );
};
export default HomeCarusel;