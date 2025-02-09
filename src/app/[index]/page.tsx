import Link from "next/link";

interface Params {
    index: string;
}
const DynamicPage = ({ params }: { params: Params }) => {
    const { index } = params;

    return (
        <div>
            <h1>Секция # {index}</h1>
            <Link href='/'>Назад</Link>
        </div>
    )
}
export default DynamicPage