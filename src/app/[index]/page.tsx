import Link from "next/link";

interface Params {
    index: string;
}
const DynamicPage = async ({ params }: { params: Params }) => {
    const { index } = await params;

    return (
        <div>
            <h1>Секция # {index}</h1>
            <Link href='/'>Назад</Link>
        </div>
    )
}
export default DynamicPage