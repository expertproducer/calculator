// Простые тесты для Cloudflare Function
// Запускать в браузере или Node.js

// Мок данных для тестирования
const mockContext = {
  request: {
    method: 'POST',
    formData: async () => {
      return {
        get: (key) => {
          const data = {
            name: 'Test User',
            email: 'test@example.com',
            company: 'Test Company',
            message: 'Test message',
            stack: 'React, Next.js',
            regions: 'EU',
            languages: 'en,de,fr',
            preferredCmp: 'OneTrust',
            integrations: 'Google Analytics',
            locale: 'en',
            timestamp: new Date().toISOString(),
            userAgent: 'Mozilla/5.0 (Test)'
          };
          return data[key];
        }
      };
    }
  }
};

// Тест функции onRequestPost
async function testOnRequestPost() {
  try {
    const { onRequestPost } = await import('./contact.js');
    const response = await onRequestPost(mockContext);
    
    if (response.status === 200) {
      console.log('✅ onRequestPost test passed');
      const data = await response.json();
      console.log('Response data:', data);
    } else {
      console.log('❌ onRequestPost test failed');
    }
  } catch (error) {
    console.error('Test error:', error);
  }
}

// Тест функции onRequestOptions
async function testOnRequestOptions() {
  try {
    const { onRequestOptions } = await import('./contact.js');
    const response = await onRequestOptions(mockContext);
    
    if (response.status === 200) {
      console.log('✅ onRequestOptions test passed');
    } else {
      console.log('❌ onRequestOptions test failed');
    }
  } catch (error) {
    console.error('Test error:', error);
  }
}

// Запуск тестов
if (typeof window !== 'undefined') {
  // В браузере
  window.testContactAPI = async () => {
    await testOnRequestPost();
    await testOnRequestOptions();
  };
} else {
  // В Node.js
  testOnRequestPost();
  testOnRequestOptions();
}
