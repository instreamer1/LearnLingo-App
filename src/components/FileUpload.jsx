
import { useState } from "react";
import { getDatabase, ref, push, set } from 'firebase/database';


const FileUpload = () => {
  const [file, setFile] = useState(null);

  // Обработчик выбора файла
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log('Файл выбран', selectedFile);
      setFile(selectedFile);
    }
  };



  const handleFileUpload = async () => {
    if (!file) {
      console.log('Пожалуйста, выберите файл.');
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = async () => {
      try {
        const fileContent = JSON.parse(reader.result);
  
        // Получение референции к Firebase
        const db = getDatabase();
        const teachersRef = ref(db, 'teachers'); 
  
        // Добавление данных в Firebase с использованием push и set
        fileContent.forEach((teacher) => {
          const newTeacherRef = push(teachersRef); 
          const teacherWithId = {
            ...teacher,
            id: newTeacherRef.key, 
          };
  
          // Записываем данные в Firebase
          set(newTeacherRef, teacherWithId);
        });
  
        console.log('Данные успешно загружены в Firebase.');
      } catch (error) {
        console.error('Ошибка при чтении или отправке данных:', error);
      }
    };
  
    reader.readAsText(file); 
  };
  
  

  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Загрузить файл</button>
    </div>
  );
};

export default FileUpload;

