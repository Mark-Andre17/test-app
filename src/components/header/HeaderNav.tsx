import Link from "next/link";

const HeaderNav = () => {
    return (
        <nav>
            <ul className="menu">
                <li><Link href="/">О школе</Link></li>
                <li><Link href="/courses">Курсы</Link></li>
                <li><Link href="/library">Библиотека</Link></li>
            </ul>
        </nav>
    );
};

export default HeaderNav;