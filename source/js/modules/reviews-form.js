// Форма загрузки фотографий

document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('reviews-form-btn');
  const uploadForm = document.getElementById('reviewsForm');
//   const previewContainer = document.getElementById('previewContainer');
  const topSection = document.getElementById('topSection');
  const bottomSection = document.getElementById('bottomSection');
  const previewPlaceholder = document.getElementById('previewPlaceholder');
//   const displayInfo = document.getElementById('displayInfo');
  const loader = document.getElementById('loader');
  
  // Массив для хранения выбранных файлов
  let selectedFiles = [];
  
  // Обработчик изменения выбора файлов
  fileInput.addEventListener('change', function(e) {
      selectedFiles = Array.from(e.target.files);
      updatePreviewLayout();
  });
  
  // Функция для обновления layout превью
  function updatePreviewLayout() {
      // Очищаем секции
      topSection.innerHTML = '';
      bottomSection.innerHTML = '';
      
      // Показываем/скрываем плейсхолдер
      if (selectedFiles.length === 0) {
          previewPlaceholder.style.display = 'flex';
        //   displayInfo.textContent = '';
          return;
      } else {
          previewPlaceholder.style.display = 'none';
      }
      
    //   // Определяем режим отображения в зависимости от количества файлов
      let mode;
      if (selectedFiles.length === 1) {
          mode = 'single';
        //   displayInfo.textContent = 'Режим отображения: 1 большое изображение (450×300px)';
      } else if (selectedFiles.length === 2) {
          mode = 'double';
        //   displayInfo.textContent = 'Режим отображения: 2 маленьких изображения (166×144px)';
      } else if (selectedFiles.length === 3) {
          mode = 'triple';
        //   displayInfo.textContent = 'Режим отображения: 1 вверху (450×300px) и 2 внизу (166×144px)';
      } else if (selectedFiles.length >= 4) {
          mode = 'quad';
        //   displayInfo.textContent = 'Режим отображения: 2 вверху и 2 внизу (166×144px)';
      }
      
      // Обрабатываем каждый файл и добавляем в соответствующую секцию
      selectedFiles.forEach((file, index) => {
          const reader = new FileReader();
          
          reader.onload = function(e) {
              const previewItem = document.createElement('div');
              previewItem.className = 'preview-item';
              
              // Добавляем класс в зависимости от позиции
              if (mode === 'single') {
                  previewItem.classList.add('single');
              } else if (mode === 'double') {
                  previewItem.classList.add('double');
              } else if (mode === 'triple') {
                  if (index === 0) {
                      previewItem.classList.add('single');
                  } else {
                      previewItem.classList.add('double');
                  }
              } else if (mode === 'quad') {
                  previewItem.classList.add('double');
              }
              
              const img = document.createElement('img');
              img.src = e.target.result;
              img.alt = file.name;
              
              // Устанавливаем размеры изображения через CSS классы
              
              // Кнопка удаления
              const removeBtn = document.createElement('button');
              removeBtn.className = 'remove-btn';
              removeBtn.addEventListener('click', function() {
                  selectedFiles.splice(index, 1);
                  updatePreviewLayout();
              });
              
              previewItem.appendChild(img);
              previewItem.appendChild(removeBtn);
              
              // Добавляем в соответствующую секцию
              if (mode === 'single') {
                  topSection.appendChild(previewItem);
              } 
              else if (mode === 'double') {
                  bottomSection.appendChild(previewItem);
              } 
              else if (mode === 'triple') {
                  if (index === 0) {
                      topSection.appendChild(previewItem);
                  } else {
                      bottomSection.appendChild(previewItem);
                  }
              } 
              else if (mode === 'quad') {
                  if (index < 2) {
                      topSection.appendChild(previewItem);
                  } else {
                      bottomSection.appendChild(previewItem);
                  }
              }
          };
          
          reader.readAsDataURL(file);
      });
  }
  
  // Обработка отправки формы
  uploadForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
    //   if (selectedFiles.length === 0) {
    //       alert('Пожалуйста, выберите хотя бы одно изображение');
    //       return;
    //   }
      
      // Показываем прелоадер
      loader.style.display = 'flex';
      
      // Собираем данные формы
      const formData = new FormData();
      
      // Добавляем файлы
      selectedFiles.forEach(file => {
          formData.append('images', file);
      });
      
      // Здесь должна быть реальная отправка на сервер
      // Для демонстрации используем setTimeout
      setTimeout(() => {
          // Скрываем прелоадер
          loader.style.display = 'none';
          
          // Показываем сообщение об успехе
          alert('Изображения успешно загружены!');
          
          // Очищаем форму
          uploadForm.reset();
          selectedFiles = [];
          updatePreviewLayout();
      }, 2000);
  });
  
  // Инициализация превью
  updatePreviewLayout();
});