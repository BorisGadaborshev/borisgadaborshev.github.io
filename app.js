document.addEventListener('DOMContentLoaded', () => {
    const selectButton = document.getElementById('selectButton');
    const fileInput = document.getElementById('fileInput');

    selectButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Выбранный файл:', file.name);
            // Здесь можно добавить обработку загруженного изображения
            // Например, отображение превью или отправка на сервер
        }
    });
});
