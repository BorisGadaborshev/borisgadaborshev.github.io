// Инициализация Telegram Web App
let tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
    
    // Настройка цветовой схемы
    tg.setHeaderColor('#0E1116');
    tg.setBackgroundColor('#0E1116');
}

document.addEventListener('DOMContentLoaded', () => {
    const selectButton = document.getElementById('selectButton');
    const fileInput = document.getElementById('fileInput');

    selectButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Для Telegram Mini Apps используем обычный input
        // Telegram автоматически обработает выбор файла
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Выбранный файл:', file.name);
            
            // Чтение файла для превью или обработки
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = e.target.result;
                console.log('Изображение загружено');
                
                // Здесь можно добавить обработку загруженного изображения
                // Например, отображение превью или отправка на сервер
                // tg?.sendData(JSON.stringify({type: 'image', data: imageData}));
            };
            reader.readAsDataURL(file);
        }
    });

    // Альтернативный способ для Telegram - открыть галерею через WebApp
    // Можно использовать tg.openLink() если нужно
});
