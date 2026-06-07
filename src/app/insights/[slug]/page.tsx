export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <div style={{padding: '40px'}}><h1>Article: {slug}</h1></div>
}
