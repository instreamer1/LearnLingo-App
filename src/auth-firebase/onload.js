import { db, ref, push, set } from "./firebase";

const handleFileUpload = (event) => {
    console.log("Файл выбран", event.target.files);  // Проверим, что файл загружен
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
  
      reader.onload = async () => {
        try {
          console.log("Файл успешно прочитан");  // Проверим, что файл прочитан
          const teachers = JSON.parse(reader.result);
          console.log('Загруженные данные:', teachers);  // Выводим данные
          // Дальше идет код для записи в Firebase
        } catch (error) {
          console.error('Ошибка обработки данных JSON:', error);
        }
      };
  
      reader.onerror = (error) => {
        console.error('Ошибка чтения файла:', error);
      };
  
      reader.readAsText(file);
    } else {
      console.error('Пожалуйста, загрузите файл в формате JSON.');
    }
  };
  
// Привязываем обработчик к событию выбора файла
document
  .getElementById("fileInput")
  .addEventListener("change", handleFileUpload);
