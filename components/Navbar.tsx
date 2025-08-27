export default function Navbar({ locale }: { locale: string }) {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">C&C CookieComply</div>
          <div className="hidden md:flex space-x-8">
            <a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Services</a>
            <a href="#process" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Process</a>
            <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Pricing</a>
            <a href="#faq" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">FAQ</a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Contact</a>
          </div>
          <div className="text-sm text-gray-500">{locale.toUpperCase()}</div>
        </div>
      </div>
    </nav>
  )
}
