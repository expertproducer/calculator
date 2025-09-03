import { getContent } from '@/lib/i18n'
import { Navbar, Footer } from '@/components/AllComponents'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import Link from 'next/link'
import BlogImage from '@/components/BlogImage'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  publishedAt: string
  readTime: string
  category: string
  tags: string[]
  author: {
    name: string
    role: string
  }
  featured: boolean
  image: string
}

// Generate static params for all locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'fr' },
    { locale: 'es' }
  ]
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = await getContent(locale as 'en' | 'de' | 'fr' | 'es')
  
  // Временные данные для демонстрации структуры
  const blogPosts: BlogPost[] = [
    {
      id: 'gdpr-consent-mode-v2-2025',
      title: content.blog?.posts?.post1?.title || 'GDPR Consent Mode v2: What Changed in 2025',
      excerpt: content.blog?.posts?.post1?.excerpt || 'Complete guide to Google Consent Mode v2 implementation and its impact on analytics tracking.',
      content: '',
      publishedAt: '2025-01-15',
      readTime: '8 min',
      category: 'GDPR',
      tags: ['Google Analytics', 'Consent Mode', 'Implementation'],
      author: {
        name: 'C&C Team',
        role: 'GDPR Experts'
      },
      featured: true,
             image: '/images/blog/gdpr-consent-mode-v2.webp'
    },
    {
      id: 'cookie-banner-best-practices',
      title: content.blog?.posts?.post2?.title || 'Cookie Banner Best Practices: UX vs Compliance',
      excerpt: content.blog?.posts?.post2?.excerpt || 'How to design cookie banners that respect user choice while maintaining good conversion rates.',
      content: '',
      publishedAt: '2025-01-10',
      readTime: '6 min',
      category: 'UX Design',
      tags: ['Cookie Banners', 'User Experience', 'Conversion'],
      author: {
        name: 'C&C Team',
        role: 'UX Specialists'
      },
      featured: true,
             image: '/images/blog/cookie-banner-best-practices.webp'
    },
         {
       id: 'cmp-comparison-2025',
       title: content.blog?.posts?.post3?.title || 'CMP Comparison 2025: Cookiebot vs OneTrust vs Usercentrics',
       excerpt: content.blog?.posts?.post3?.excerpt || 'Detailed comparison of leading Consent Management Platforms with pricing and features.',
       content: '',
       publishedAt: '2025-01-05',
       readTime: '12 min',
       category: 'CMP Reviews',
       tags: ['Cookiebot', 'OneTrust', 'Usercentrics', 'Comparison'],
       author: {
         name: 'C&C Team',
         role: 'Technical Analysts'
       },
       featured: false,
       image: '/images/blog/cmp-comparison-2025.webp'
     },
     {
       id: 'gdpr-compliance-checklist-2025',
       title: content.blog?.posts?.post4?.title || 'GDPR Compliance Checklist 2025: Complete Guide',
       excerpt: content.blog?.posts?.post4?.excerpt || 'Essential checklist for GDPR compliance in 2025. Ensure your website meets all requirements.',
       content: '',
       publishedAt: '2025-01-01',
       readTime: '10 min',
       category: 'Compliance',
       tags: ['GDPR', 'Checklist', 'Compliance', 'Requirements'],
       author: {
         name: 'C&C Team',
         role: 'Compliance Experts'
       },
       featured: false,
       image: '/images/blog/gdpr-compliance-checklist-2025.webp'
     }
  ]

  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar locale={locale} />
        
        <main className="pt-24">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                  {content.blog?.title || 'GDPR & Cookie Compliance Blog'}
                </h1>
                <p className="text-2xl text-gray-600 max-w-4xl mx-auto font-medium">
                  {content.blog?.subtitle || 'Expert insights, implementation guides, and industry updates for cookie compliance and privacy law.'}
                </p>
              </div>
            </div>
          </section>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-12">
                  {content.blog?.featured || 'Featured Articles'}
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredPosts.map((post) => (
                    <article key={post.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                      {/* Article Image - 16:9 aspect ratio */}
                      <div className="relative w-full aspect-video overflow-hidden">
                        <BlogImage 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      
                      <div className="p-8">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                            {post.category}
                          </span>
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Calendar className="w-4 h-4" />
                            <time>{new Date(post.publishedAt).toLocaleDateString(locale)}</time>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{post.author.name}</div>
                              <div className="text-xs text-gray-500">{post.author.role}</div>
                            </div>
                          </div>
                          
                          <Link
                            href={`/${locale}/blog/${post.id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                          >
                            {content.blog?.readMore || 'Read More'}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* All Posts */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-12">
                {content.blog?.allArticles || 'All Articles'}
              </h2>
              
                             <div className="grid md:grid-cols-2 gap-8">
                 {regularPosts.map((post) => (
                   <article key={post.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                     {/* Article Image - 16:9 aspect ratio */}
                     <div className="relative w-full aspect-video overflow-hidden">
                       <BlogImage 
                         src={post.image} 
                         alt={post.title}
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                     </div>
                     
                     <div className="p-8">
                       <div className="flex items-center gap-4 mb-4">
                         <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
                           {post.category}
                         </span>
                         <div className="flex items-center gap-2 text-gray-500 text-sm">
                           <Calendar className="w-4 h-4" />
                           <time>{new Date(post.publishedAt).toLocaleDateString(locale)}</time>
                         </div>
                         <div className="flex items-center gap-2 text-gray-500 text-sm">
                           <Clock className="w-4 h-4" />
                           <span>{post.readTime}</span>
                         </div>
                       </div>
                       
                       <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                         {post.title}
                       </h3>
                       
                       <p className="text-gray-600 mb-6 leading-relaxed">
                         {post.excerpt}
                       </p>
                       
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                           <div>
                             <div className="text-sm font-semibold text-gray-900">{post.author.name}</div>
                             <div className="text-xs text-gray-500">{post.author.role}</div>
                           </div>
                         </div>
                         
                         <Link
                           href={`/${locale}/blog/${post.id}`}
                           className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                         >
                           {content.blog?.readMore || 'Read More'}
                           <ArrowRight className="w-4 h-4" />
                         </Link>
                       </div>
                     </div>
                   </article>
                 ))}
               </div>
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="py-16 bg-blue-600">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                {content.blog?.newsletter?.title || 'Stay Updated on GDPR Changes'}
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                {content.blog?.newsletter?.description || 'Get the latest insights on cookie compliance and privacy regulations delivered to your inbox.'}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-colors font-bold text-lg"
              >
                {content.blog?.newsletter?.cta || 'Subscribe to Updates'}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>
        </main>
        
        <Footer content={content} locale={locale} />
      </div>
    </>
  )
}
