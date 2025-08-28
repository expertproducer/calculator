// Скрипт для тестирования контактного API
// Запустите: node test-contact-api.js

// ⚠️ ВАЖНО: Замените 'your-domain.com' на ваш реальный домен
// Например: https://your-project.pages.dev или https://yourdomain.com

const testContactForm = async () => {
  const testData = {
    name: 'Тестовое Имя',
    email: 'test@example.com',
    message: 'Это тестовое сообщение для проверки работы API',
    url: 'https://example.com',
    stack: 'React, Next.js, TypeScript',
    regions: 'Европа, США',
    languages: 'Русский, Английский',
    preferredCmp: 'OneTrust',
    integrations: 'Google Analytics, Facebook Pixel',
    locale: 'ru',
    timestamp: new Date().toISOString(),
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  };

  try {
    console.log('Отправляем тестовые данные...');
    console.log('Данные:', JSON.stringify(testData, null, 2));
    
    // 🔧 ЗАМЕНИТЕ НА ВАШ РЕАЛЬНЫЙ URL
    const apiUrl = 'https://your-domain.com/api/contact';
    console.log('Отправляем на:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    console.log('Статус ответа:', response.status);
    console.log('Ответ сервера:', result);
    
    if (response.ok) {
      console.log('✅ API работает корректно!');
      console.log('Проверьте Slack канал #leads - должно прийти уведомление');
    } else {
      console.log('❌ Ошибка API:', result.message);
    }
  } catch (error) {
    console.error('❌ Ошибка при отправке запроса:', error.message);
    console.log('Возможные причины:');
    console.log('1. Неправильный URL API');
    console.log('2. API не развернут');
    console.log('3. Проблемы с CORS');
  }
};

// Запускаем тест
testContactForm();
