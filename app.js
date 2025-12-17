// app.js
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

let selectedFile = null;

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');
    const processBtn = document.getElementById('processBtn');
    const resultDiv = document.getElementById('result');

    // Загрузка файла
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#2481cc';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#ccc';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ccc';
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });

    function handleFile(file) {
        if (!file.type.match('image.*')) {
            alert('Пожалуйста, выберите изображение');
            return;
        }

        selectedFile = file;
        
        // Показ превью
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.style.display = 'block';
            processBtn.disabled = false;
        };
        reader.readAsDataURL(file);
    }

    // Обработка фото
    processBtn.addEventListener('click', async () => {
        if (!selectedFile) return;

        processBtn.disabled = true;
        processBtn.textContent = 'Обработка...';
        resultDiv.style.display = 'none';

        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('userId', tg.initDataUnsafe.user?.id || 'anonymous');

            // Отправка на ваш API
            const response = await fetch('https://ваш-api-сервер.com/process', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Ошибка API');

            const result = await response.json();
            
            // Отображение результата
            resultDiv.innerHTML = 
                <h3>Результат обработки:</h3>
                ${result.text ? <p>${result.text}</p> : ''}
                ${result.imageUrl ? <img src="${result.imageUrl}" style="max-width:100%;"> : ''}
                ${result.tags ? <p>Теги: ${result.tags.join(', ')}</p> : ''}
            ;
            resultDiv.style.display = 'block';

        } catch (error) {
            alert('Ошибка: ' + error.message);
        } finally {
            processBtn.disabled = false;
            processBtn.textContent = 'Обработать';
        }
    });

    // Отправка данных в Telegram
    function sendToTelegram(data) {
        tg.sendData(JSON.stringify(data));
    }
});
