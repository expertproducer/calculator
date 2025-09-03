import { getContent } from '@/lib/i18n'
import { Navbar, Footer } from '@/components/AllComponents'
import { Calendar, Clock, ArrowLeft, Share2, Tag } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
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
  seoTitle?: string
  seoDescription?: string
  featured: boolean
  image: string
}

// Временные данные для демонстрации
const blogPosts: Record<string, BlogPost> = {
  'gdpr-consent-mode-v2-2025': {
    id: 'gdpr-consent-mode-v2-2025',
    title: 'GDPR Consent Mode v2: What Changed in 2025',
    seoTitle: 'GDPR Consent Mode v2 Guide 2025 | Implementation & Changes',
    seoDescription: 'Complete guide to Google Consent Mode v2 implementation, new requirements, and impact on analytics tracking in 2025.',
    excerpt: 'Complete guide to Google Consent Mode v2 implementation and its impact on analytics tracking.',
    content: `
# GDPR Consent Mode v2: What Changed in 2025

Google Consent Mode v2 introduced significant changes to how websites handle user consent and analytics tracking. This comprehensive guide covers everything you need to know about implementing these changes.

## What is Consent Mode v2?

Consent Mode v2 is Google's enhanced framework for managing user consent across Google services while maintaining data utility for advertisers and website owners.

## Key Changes in 2025

### 1. Enhanced Consent Signals
- **ad_user_data**: Controls if user data can be used for advertising purposes
- **ad_personalization**: Manages personalized advertising consent

### 2. Improved Analytics Integration
- Better integration with Google Analytics 4
- Enhanced conversion modeling
- Improved audience insights without compromising privacy

### 3. Regional Compliance
- Automatic compliance with local regulations
- Dynamic consent requirements based on user location
- Enhanced support for GDPR, CCPA, and other privacy laws

## Implementation Steps

### Step 1: Update Your CMP
Ensure your Consent Management Platform supports Consent Mode v2:

\`\`\`javascript
// Example Cookiebot implementation
window.addEventListener('CookiebotOnConsentReady', function () {
  if (Cookiebot.consent.marketing) {
    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted'
    });
  }
});
\`\`\`

### Step 2: Configure GTM
Set up proper consent triggers in Google Tag Manager:

1. Create consent initialization trigger
2. Configure consent update events
3. Set up conditional firing for marketing tags

### Step 3: Test Implementation
- Use Google Tag Assistant to verify consent signals
- Test different consent scenarios
- Validate data flow to Google Analytics

## Impact on Analytics

### Before Consent Mode v2
- Limited data when users decline cookies
- Significant gaps in conversion tracking
- Reduced audience insights

### After Consent Mode v2
- Enhanced conversion modeling
- Better audience insights through machine learning
- Improved attribution while respecting privacy

## Best Practices

1. **Clear Consent UI**: Make consent options clear and accessible
2. **Granular Controls**: Provide specific consent categories
3. **Regular Testing**: Continuously test consent implementation
4. **Documentation**: Maintain clear implementation documentation

## Common Implementation Issues

### Issue 1: Incorrect Consent Signals
**Problem**: Consent signals not firing correctly
**Solution**: Verify CMP integration and GTM configuration

### Issue 2: Analytics Data Loss
**Problem**: Significant drop in analytics data
**Solution**: Implement proper consent defaults and modeling

### Issue 3: Compliance Gaps
**Problem**: Not meeting regional requirements
**Solution**: Configure region-specific consent rules

## Migration Timeline

For existing websites, follow this migration timeline:

- **Week 1-2**: Audit current implementation
- **Week 3-4**: Update CMP and GTM configuration
- **Week 5-6**: Testing and validation
- **Week 7**: Go live with monitoring

## Conclusion

Consent Mode v2 represents a significant step forward in balancing user privacy with data utility. Proper implementation ensures compliance while maintaining valuable insights for business growth.

Need help implementing Consent Mode v2? Contact our GDPR experts for a comprehensive audit and implementation plan.
    `,
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
  'cookie-banner-best-practices': {
    id: 'cookie-banner-best-practices',
    title: 'Cookie Banner Best Practices: UX vs Compliance',
    seoTitle: 'Cookie Banner Best Practices 2025 | UX & GDPR Compliance',
    seoDescription: 'Learn how to design cookie banners that respect user choice while maintaining good conversion rates. UX best practices for GDPR compliance.',
    excerpt: 'How to design cookie banners that respect user choice while maintaining good conversion rates.',
    content: `
# Cookie Banner Best Practices: UX vs Compliance

Creating cookie banners that balance user experience with legal compliance is one of the biggest challenges in modern web design. This guide shows you how to get it right.

## The Challenge: UX vs Compliance

Many websites struggle with cookie banners that either:
- Prioritize compliance but harm user experience
- Focus on UX but fail to meet legal requirements

The goal is to find the sweet spot where both work together.

## Legal Requirements First

Before designing your banner, understand what's legally required:

### GDPR Requirements
- **Clear consent**: Users must understand what they're consenting to
- **Specific consent**: Separate consent for different purposes
- **Informed consent**: Provide clear information about data processing
- **Freely given**: No pre-ticked boxes or forced consent

### Design Implications
These requirements directly impact your banner design:
- Clear, readable text
- Prominent decline option
- Easy access to detailed preferences
- No dark patterns

## UX Best Practices

### 1. Clear Visual Hierarchy
Make important elements stand out:
- Use contrast for primary actions
- Size buttons appropriately
- Create clear information hierarchy

### 2. Concise Copy
Keep text short but informative:
- Explain the value of consent
- Use simple, non-technical language
- Highlight user benefits

### 3. Accessible Design
Ensure everyone can use your banner:
- Proper color contrast ratios
- Keyboard navigation support
- Screen reader compatibility
- Mobile-friendly design

## Common Mistakes to Avoid

### 1. Dark Patterns
Avoid manipulative design:
- ❌ Hiding the decline button
- ❌ Using confusing language
- ❌ Making rejection difficult
- ❌ Pre-selecting options

### 2. Information Overload
Don't overwhelm users:
- ❌ Too much legal text
- ❌ Complex preference options
- ❌ Unclear categories
- ❌ Technical jargon

### 3. Poor Mobile Experience
Mobile users need special consideration:
- ❌ Buttons too small to tap
- ❌ Text too small to read
- ❌ Blocking entire screen
- ❌ Difficult scrolling

## Effective Banner Designs

### 1. The Minimalist Approach
- Simple accept/decline options
- Brief, clear explanation
- Link to detailed preferences
- Clean, unobtrusive design

### 2. The Category-First Design
- Show main cookie categories upfront
- Toggle switches for each category
- Clear explanations for each type
- Save preferences button

### 3. The Progressive Disclosure
- Start with simple accept/decline
- "More options" reveals detailed controls
- Layered information architecture
- Respects user choice to engage deeper

## Testing Your Banner

### A/B Testing Considerations
Test different approaches:
- Button colors and positioning
- Copy variations
- Layout options
- Timing and triggers

### Metrics to Track
Monitor both compliance and UX:
- Consent rates by category
- Time to decision
- User engagement post-consent
- Bounce rates

### Legal Validation
Ensure compliance:
- Legal review of copy
- Technical validation of consent recording
- Regional compliance checks
- Regular audits

## Implementation Examples

### Example 1: E-commerce Site
For conversion-focused sites:
- Emphasize personalization benefits
- Quick, clear consent flow
- Minimal disruption to shopping
- Trust signals (security badges)

### Example 2: Content Site
For content-heavy sites:
- Focus on content access
- Explain advertising necessity
- Offer ad-free alternatives
- Respect reading experience

### Example 3: B2B Platform
For business platforms:
- Professional, trustworthy design
- Detailed compliance information
- Enterprise-grade privacy controls
- Clear data handling policies

## Conclusion

The best cookie banners don't choose between UX and compliance—they achieve both. By understanding legal requirements, following UX best practices, and testing thoroughly, you can create banners that users appreciate and regulators approve.

Ready to optimize your cookie banner? Our team can help you design and implement a solution that balances compliance with conversion.
    `,
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
   'cmp-comparison-2025': {
     id: 'cmp-comparison-2025',
     title: 'CMP Comparison 2025: Cookiebot vs OneTrust vs Usercentrics',
     seoTitle: 'CMP Comparison 2025 | Cookiebot vs OneTrust vs Usercentrics',
     seoDescription: 'Detailed comparison of leading Consent Management Platforms with pricing, features, and implementation guides for 2025.',
     excerpt: 'Detailed comparison of leading Consent Management Platforms with pricing and features.',
     content: `
# CMP Comparison 2025: Cookiebot vs OneTrust vs Usercentrics

Choosing the right Consent Management Platform (CMP) is crucial for GDPR compliance and user experience. This comprehensive comparison helps you make an informed decision.

## Why CMP Selection Matters

A good CMP can make the difference between:
- Smooth user experience vs. frustrating consent flows
- Full compliance vs. regulatory fines
- Efficient implementation vs. technical headaches

## Comparison Overview

### Cookiebot
**Best for**: Small to medium businesses
**Pricing**: €8-€99/month
**Strengths**:
- Easy implementation
- AI-powered cookie detection
- Good documentation
- Competitive pricing

**Weaknesses**:
- Limited customization
- Basic analytics
- Limited enterprise features

### OneTrust
**Best for**: Enterprise companies
**Pricing**: $2,000-$10,000+/year
**Strengths**:
- Comprehensive compliance suite
- Advanced analytics
- Enterprise-grade security
- Global compliance support

**Weaknesses**:
- High cost
- Complex implementation
- Overkill for small businesses

### Usercentrics
**Best for**: Medium to large businesses
**Pricing**: €50-€500/month
**Strengths**:
- Excellent UX
- Good customization
- Strong analytics
- Competitive pricing

**Weaknesses**:
- Limited enterprise features
- Smaller market share

## Detailed Feature Comparison

### Cookie Detection
- **Cookiebot**: AI-powered, automatic detection
- **OneTrust**: Manual + automated detection
- **Usercentrics**: Manual + automated detection

### Consent Management
- **Cookiebot**: Basic consent categories
- **OneTrust**: Advanced consent management
- **Usercentrics**: Good consent management

### Analytics
- **Cookiebot**: Basic analytics
- **OneTrust**: Advanced analytics and reporting
- **Usercentrics**: Good analytics

### Customization
- **Cookiebot**: Limited customization
- **OneTrust**: High customization
- **Usercentrics**: Good customization

## Implementation Complexity

### Cookiebot
**Setup Time**: 1-2 hours
**Technical Requirements**: Basic JavaScript knowledge
**Documentation**: Excellent

### OneTrust
**Setup Time**: 1-2 weeks
**Technical Requirements**: Advanced technical knowledge
**Documentation**: Comprehensive but complex

### Usercentrics
**Setup Time**: 1-3 days
**Technical Requirements**: Intermediate JavaScript knowledge
**Documentation**: Good

## Pricing Analysis

### Small Business (< 10,000 visitors/month)
- **Cookiebot**: €8/month
- **OneTrust**: $2,000/year (overkill)
- **Usercentrics**: €50/month

### Medium Business (10,000-100,000 visitors/month)
- **Cookiebot**: €29/month
- **OneTrust**: $5,000/year
- **Usercentrics**: €150/month

### Large Business (100,000+ visitors/month)
- **Cookiebot**: €99/month
- **OneTrust**: $10,000+/year
- **Usercentrics**: €500/month

## Recommendations by Use Case

### E-commerce Sites
**Recommendation**: Usercentrics
**Reason**: Good balance of features and price, excellent UX

### Content Sites
**Recommendation**: Cookiebot
**Reason**: Simple implementation, good for content-heavy sites

### Enterprise Platforms
**Recommendation**: OneTrust
**Reason**: Comprehensive compliance suite, enterprise features

### Startups
**Recommendation**: Cookiebot
**Reason**: Low cost, easy implementation

## Migration Considerations

### From Google Tag Manager
All platforms support GTM integration, but:
- **Cookiebot**: Easiest integration
- **OneTrust**: Most complex but powerful
- **Usercentrics**: Good balance

### From Existing CMP
- **Cookiebot**: Easy migration from most platforms
- **OneTrust**: Complex migration but comprehensive
- **Usercentrics**: Moderate migration complexity

## Conclusion

Choose based on your needs:
- **Budget-conscious**: Cookiebot
- **Enterprise needs**: OneTrust
- **Balance of features**: Usercentrics

Need help choosing the right CMP? Our experts can analyze your specific requirements and recommend the best solution.
     `,
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
   'gdpr-compliance-checklist-2025': {
     id: 'gdpr-compliance-checklist-2025',
     title: 'GDPR Compliance Checklist 2025: Complete Guide',
     seoTitle: 'GDPR Compliance Checklist 2025 | Complete Guide & Requirements',
     seoDescription: 'Essential checklist for GDPR compliance in 2025. Ensure your website meets all requirements and avoid fines.',
     excerpt: 'Essential checklist for GDPR compliance in 2025. Ensure your website meets all requirements.',
     content: `
# GDPR Compliance Checklist 2025: Complete Guide

Ensuring GDPR compliance is crucial for any website operating in the EU. This comprehensive checklist covers everything you need to know for 2025.

## Why GDPR Compliance Matters

Non-compliance can result in:
- Fines up to €20 million or 4% of global revenue
- Legal action from data protection authorities
- Loss of customer trust
- Business disruption

## Essential Compliance Requirements

### 1. Legal Basis for Processing
- **Consent**: Freely given, specific, informed, and unambiguous
- **Contract**: Processing necessary for contract performance
- **Legitimate Interest**: Balancing business needs with individual rights
- **Legal Obligation**: Required by law
- **Vital Interests**: Protecting life and health
- **Public Task**: Official authority or public interest

### 2. Data Subject Rights
- **Right to Access**: Users can request their data
- **Right to Rectification**: Users can correct inaccurate data
- **Right to Erasure**: Users can request data deletion
- **Right to Portability**: Users can transfer their data
- **Right to Object**: Users can object to processing
- **Right to Restriction**: Users can limit processing

### 3. Data Protection Principles
- **Lawfulness**: Processing must have legal basis
- **Fairness**: Transparent and fair processing
- **Purpose Limitation**: Only for specified purposes
- **Data Minimization**: Only necessary data
- **Accuracy**: Keep data accurate and up-to-date
- **Storage Limitation**: Delete when no longer needed
- **Integrity and Confidentiality**: Secure processing

## Technical Implementation Checklist

### Cookie Management
- [ ] Cookie consent banner implemented
- [ ] Granular consent options (necessary, functional, analytics, marketing)
- [ ] Easy withdrawal of consent
- [ ] Cookie policy page
- [ ] Regular cookie audits

### Data Collection Forms
- [ ] Clear purpose statements
- [ ] Legal basis specified
- [ ] Data retention periods
- [ ] Contact information for DPO
- [ ] Easy opt-out options

### Privacy Policy
- [ ] Comprehensive privacy policy
- [ ] Clear language (no legal jargon)
- [ ] Contact information
- [ ] Data subject rights explained
- [ ] Regular updates

### Security Measures
- [ ] HTTPS encryption
- [ ] Data encryption at rest
- [ ] Access controls
- [ ] Regular security audits
- [ ] Incident response plan

## Website-Specific Requirements

### Cookie Banners
- [ ] Clear accept/decline options
- [ ] Link to detailed preferences
- [ ] No pre-ticked boxes
- [ ] Mobile-friendly design
- [ ] Accessible to screen readers

### Contact Forms
- [ ] Purpose of data collection
- [ ] Legal basis for processing
- [ ] Data retention period
- [ ] Contact information
- [ ] Opt-out mechanism

### Analytics Implementation
- [ ] Consent-based tracking
- [ ] Anonymization where possible
- [ ] Data retention policies
- [ ] Opt-out mechanisms
- [ ] Regular data deletion

## Documentation Requirements

### Records of Processing Activities
- [ ] Data processing inventory
- [ ] Purpose of processing
- [ ] Categories of data subjects
- [ ] Categories of personal data
- [ ] Recipients of data
- [ ] Data transfers outside EU
- [ ] Retention periods
- [ ] Security measures

### Data Protection Impact Assessment (DPIA)
- [ ] High-risk processing identified
- [ ] DPIA conducted for high-risk activities
- [ ] Mitigation measures implemented
- [ ] Regular DPIA reviews

## Staff Training and Awareness

### Training Programs
- [ ] Regular GDPR training
- [ ] Role-specific training
- [ ] Incident response training
- [ ] Updated training materials

### Awareness Campaigns
- [ ] Regular reminders
- [ ] Best practices sharing
- [ ] Incident reporting procedures
- [ ] Contact information for questions

## Monitoring and Review

### Regular Audits
- [ ] Quarterly compliance reviews
- [ ] Annual comprehensive audit
- [ ] Third-party assessments
- [ ] Remediation tracking

### Updates and Maintenance
- [ ] Policy updates
- [ ] Technical updates
- [ ] Staff training updates
- [ ] Incident response updates

## Common Compliance Mistakes

### 1. Inadequate Consent
- **Problem**: Vague or forced consent
- **Solution**: Clear, specific, freely given consent

### 2. Poor Documentation
- **Problem**: Missing or incomplete records
- **Solution**: Comprehensive documentation

### 3. Inadequate Security
- **Problem**: Weak security measures
- **Solution**: Robust security implementation

### 4. Poor User Experience
- **Problem**: Difficult to exercise rights
- **Solution**: User-friendly interfaces

## Action Plan

### Week 1-2: Assessment
- Audit current compliance status
- Identify gaps and risks
- Prioritize remediation actions

### Week 3-4: Implementation
- Implement technical solutions
- Update policies and procedures
- Train staff

### Week 5-6: Testing
- Test all compliance measures
- Conduct user acceptance testing
- Validate with legal experts

### Week 7: Go Live
- Launch compliance measures
- Monitor for issues
- Establish ongoing maintenance

## Conclusion

GDPR compliance is an ongoing process, not a one-time task. Regular monitoring, updates, and training are essential for maintaining compliance.

Need help with GDPR compliance? Our experts can conduct a comprehensive audit and help you implement all necessary measures.
     `,
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
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).flatMap(slug => [
    { locale: 'en', slug },
    { locale: 'de', slug },
    { locale: 'fr', slug },
    { locale: 'es', slug }
  ])
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const post = blogPosts[slug]
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const content = await getContent(locale as 'en' | 'de' | 'fr' | 'es')
  
  const post = blogPosts[slug]
  
  if (!post) {
    notFound()
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar locale={locale} />
        
        <main className="pt-24">
          {/* Article Header */}
          <article className="max-w-4xl mx-auto px-6 py-16">
            {/* Back to Blog */}
            <div className="mb-8">
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                {content.blog?.backToBlog || 'Back to Blog'}
              </Link>
            </div>

            {/* Article Image - 16:9 aspect ratio */}
            <div className="mb-8 -mx-6">
              <div className="relative w-full aspect-video overflow-hidden rounded-2xl">
                <BlogImage 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>

            {/* Article Meta */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  {post.category}
                </span>
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time>{new Date(post.publishedAt).toLocaleDateString(locale)}</time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{post.author.name}</div>
                    <div className="text-xs text-gray-500">{post.author.role}</div>
                  </div>
                </div>
                
                <button className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-700 transition-colors">
                  <Share2 className="w-4 h-4" />
                  {content.blog?.share || 'Share'}
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg prose-blue max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>').replace(/# /g, '<h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">').replace(/<br><br>/g, '</p><p class="mb-6">').replace(/### /g, '<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">').replace(/## /g, '<h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">') }} />
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">
                  {content.blog?.tags || 'Tags'}:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 p-8 bg-blue-50 rounded-2xl text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {content.blog?.needHelp || 'Need Help with GDPR Compliance?'}
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                {content.blog?.helpDescription || 'Our experts can help you implement these best practices on your website.'}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg"
              >
                {content.blog?.getHelp || 'Get Expert Help'}
              </Link>
            </div>
          </article>
        </main>
        
        <Footer content={content} locale={locale} />
      </div>
    </>
  )
}
