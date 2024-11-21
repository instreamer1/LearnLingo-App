
import { useState } from "react";
import { getDatabase, ref, push, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';  // Для генерации уникальных id

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

  // Обработчик отправки файла
  // const handleFileUpload = async () => {
  //   if (!file) {
  //     console.log('Пожалуйста, выберите файл.');
  //     return;
  //   }

  //   // Чтение и парсинг содержимого файла
  //   const reader = new FileReader();
  //   reader.onload = async () => {
  //     try {
  //       const fileContent = JSON.parse(reader.result);
        
  //       // Добавление уникального ID для каждого объекта
  //       const updatedTeachers = fileContent.map(teacher => ({
  //         ...teacher,
  //         id: uuidv4(),  // Добавление уникального id
  //       }));

  //       // Получение референции к Firebase
  //       const db = getDatabase();
  //       const teachersRef = ref(db, 'teachers'); // Путь к коллекции teachers

  //       // Запись данных в Firebase
  //       // updatedTeachers.forEach((teacher) => {
  //       //   set(ref(db, `teachers/${teacher.id}`), teacher);
  //       // });


  // // Записываем новый список учителей в Firebase

  //       set(ref(db, 'teachers'), updatedTeachers);

  //       console.log('Данные успешно загружены в Firebase.');
  //     } catch (error) {
  //       console.error('Ошибка при чтении или отправке данных:', error);
  //     }
  //   };
    
  //   reader.readAsText(file);  // Чтение файла как текст
  // };





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
        const teachersRef = ref(db, 'teachers'); // Путь к коллекции teachers
  
        // Добавление данных в Firebase с использованием push и set
        fileContent.forEach((teacher) => {
          const newTeacherRef = push(teachersRef); // Создаем новую запись
          const teacherWithId = {
            ...teacher,
            id: newTeacherRef.key, // Добавляем ключ в объект
          };
  
          // Записываем данные в Firebase
          set(newTeacherRef, teacherWithId); // Используем отдельный вызов `set`
        });
  
        console.log('Данные успешно загружены в Firebase.');
      } catch (error) {
        console.error('Ошибка при чтении или отправке данных:', error);
      }
    };
  
    reader.readAsText(file); // Чтение файла как текст
  };
  
  

  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Загрузить файл</button>
    </div>
  );
};

export default FileUpload;

