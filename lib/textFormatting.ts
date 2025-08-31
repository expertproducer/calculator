// Function to handle markdown-like formatting for text highlighting
export const formatText = (text: string) => {
  if (!text) return ''
  
  // For single items (not paragraphs), just format the text directly
  if (!text.includes('\n\n') && text.length < 200) {
    // Replace **text** with <strong>text</strong>
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Replace `code` with <code>code</code>
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-blue-100 px-2 py-1 rounded text-sm font-mono text-blue-800">$1</code>')
    return formatted
  }
  
  // Split text into paragraphs and wrap each in <p> tags
  let paragraphs = text.split('\n\n').filter(p => p.trim())
  
  // If no paragraphs found, split by sentence length
  if (paragraphs.length <= 1) {
    const sentences = text.split('. ').filter(s => s.trim())
    paragraphs = []
    let currentParagraph = ''
    
    sentences.forEach((sentence, index) => {
      currentParagraph += sentence + (sentence.endsWith('.') ? '' : '. ')
      
      // Create new paragraph every 2-3 sentences or if paragraph is getting too long
      if ((index + 1) % 3 === 0 || currentParagraph.length > 300) {
        paragraphs.push(currentParagraph.trim())
        currentParagraph = ''
      }
    })
    
    // Add remaining text as last paragraph
    if (currentParagraph.trim()) {
      paragraphs.push(currentParagraph.trim())
    }
  }
  
  const formattedParagraphs = paragraphs.map(p => {
    // Replace **text** with <strong>text</strong>
    let formatted = p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Replace `code` with <code>code</code>
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-blue-100 px-2 py-1 rounded text-sm font-mono text-blue-800">$1</code>')
    return `<p style="margin-bottom: 2rem; font-size: 1.25rem; font-weight: bold; color: #374151; line-height: 1.75;">${formatted}</p>`
  })
  return formattedParagraphs.join('')
}

// Function for simple text formatting (without paragraph wrapping)
export const formatSimpleText = (text: string) => {
  if (!text) return ''
  
  // Replace **text** with <strong>text</strong>
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  // Replace `code` with <code>code</code>
  formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-blue-100 px-2 py-1 rounded text-sm font-mono text-blue-800">$1</code>')
  return formatted
}
