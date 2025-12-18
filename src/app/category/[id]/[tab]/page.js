import NewsWebsite from "@/app/components/NewsWebsite/NewsWebsite";

export default async function Page({ params }) {
  const { id, tab } = await params;

  console.log("Resolved params:", id, tab);

  return <NewsWebsite id={id} tab={tab} />;
}
