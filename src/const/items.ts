import newLogo from '../../public/logo.svg'
import logo1 from '../../public/Exclude (1).svg'
import logo2 from '../../public/Exclude (2).svg'
import logo3 from '../../public/Exclude (3).svg'
import logo4 from '../../public/Exclude (4).svg'
import logo5 from '../../public/Exclude (5).svg'

interface IItem {
    src: string;
    alt: string;
    text: string;
}

const items: IItem[] = [
    {src: newLogo , alt: 'logoNew', text: 'Анализ текущего состояния карьеры' },
    {src: logo1, alt: 'logo1', text: 'Поиск работы'},
    {src: logo2, alt: 'logo2', text: 'Сопроводительные письма и резюме'},
    {src: logo3, alt: 'logo3', text: 'Тренинг по презентации личного бренда'},
    {src: logo4, alt: 'logo4', text: 'Подготовка к собеседованию'},
    {src: logo5, alt: 'logo5', text: 'Рекомендация по базе STEMPS Career'},
]

export default items;
export type { IItem };