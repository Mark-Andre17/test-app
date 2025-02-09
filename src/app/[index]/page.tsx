import Link from "next/link";
import items from "@/const/items";

const DynamicPage = ({ params }: { params: { index: string } }) => {
  const index = params.index

  return (
    <div>
      <h1>Секция # {index}</h1>
      <Link href='/'>Back</Link>
    </div>
  );
};
export async function getStaticPaths() {
    return items.map((index) => ({
      index: index.toString()
    }));
}
  


export default DynamicPage;