import { getContent } from '../../lib/i18n'

export default function SimplePage() {
  const content = getContent('en')
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>{content.hero.title}</h1>
      <p>{content.hero.subtitle}</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/en/" style={{ marginRight: '10px' }}>English</a>
        <a href="/de/" style={{ marginRight: '10px' }}>Deutsch</a>
        <a href="/fr/">Français</a>
      </div>
    </div>
  )
}
