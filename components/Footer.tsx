export default function Footer({ content, locale }: { content: any; locale: string }) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4">{content.copyright}</p>
        <div className="flex justify-center space-x-6">
          {content.links.map((link: string, index: number) => (
            <a key={index} href="#" className="text-gray-300 hover:text-white">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
