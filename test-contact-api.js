// Script for testing contact API
// Run: node test-contact-api.js

// ⚠️ IMPORTANT: Replace 'your-domain.com' with your actual domain
// For example: https://your-project.pages.dev or https://yourdomain.com

const testContactForm = async () => {
  const testData = {
    name: 'Test Name',
    email: 'test@example.com',
    message: 'This is a test message to verify API functionality',
    url: 'https://example.com',
    stack: 'React, Next.js, TypeScript',
    regions: 'Europe, USA',
    languages: 'English, German',
    preferredCmp: 'OneTrust',
    integrations: 'Google Analytics, Facebook Pixel',
    locale: 'en',
    timestamp: new Date().toISOString(),
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  };

  try {
    console.log('Sending test data...');
    console.log('Data:', JSON.stringify(testData, null, 2));
    
    // 🔧 REPLACE WITH YOUR ACTUAL URL
    const apiUrl = 'https://your-domain.com/api/contact';
    console.log('Sending to:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Server response:', result);
    
    if (response.ok) {
      console.log('✅ API working correctly!');
      console.log('Check Slack channel #leads - notification should arrive');
    } else {
      console.log('❌ API error:', result.message);
    }
  } catch (error) {
    console.error('❌ Error sending request:', error.message);
    console.log('Possible causes:');
    console.log('1. Incorrect API URL');
    console.log('2. API not deployed');
    console.log('3. CORS issues');
  }
};

// Run test
testContactForm();
