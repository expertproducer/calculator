export default async function TestLocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Locale Page</h1>
      <p>Current locale: {locale}</p>
      <p>If you can see this, the [locale] structure works!</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/en/" style={{ marginRight: '10px' }}>English</a>
        <a href="/de/" style={{ marginRight: '10px' }}>Deutsch</a>
        <a href="/fr/" style={{ marginRight: '10px' }}>Français</a>
        <a href="/es/">Español</a>
      </div>
    </div>
  )
}
