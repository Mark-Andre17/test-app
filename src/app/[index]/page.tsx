import Link from "next/link";

interface DynamicPageProps {
  params: Promise<{ index: string }>;
}

const DynamicPage = async ({ params }: DynamicPageProps) => {
  const { index } = await params
  return (
    <div>
      <h1>Секция # {index}</h1>
      <Link href='/'>Back</Link>
    </div>
  );
};

export default DynamicPage;