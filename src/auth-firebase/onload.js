import { db, ref, push, set } from "./firebase";

const handleFileUpload = (event) => {
    console.log("Файл выбран", event.target.files);  
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
  
      reader.onload = async () => {
        try {
        
          const teachers = JSON.parse(reader.result);
         
        
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
  

document
  .getElementById("fileInput")
  .addEventListener("change", handleFileUpload);
