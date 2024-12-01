
import { useState } from "react";
import { getDatabase, ref, push, set } from 'firebase/database';


const FileUpload = () => {
  const [file, setFile] = useState(null);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
  
      setFile(selectedFile);
    }
  };



  const handleFileUpload = async () => {
    if (!file) {
   
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = async () => {
      try {
        const fileContent = JSON.parse(reader.result);
  
       
        const db = getDatabase();
        const teachersRef = ref(db, 'teachers'); 
  
       
        fileContent.forEach((teacher) => {
          const newTeacherRef = push(teachersRef); 
          const teacherWithId = {
            ...teacher,
            id: newTeacherRef.key, 
          };
  
       
          set(newTeacherRef, teacherWithId);
        });
  
    
      } catch (error) {
        console.error( error);
      }
    };
  
    reader.readAsText(file); 
  };
  
  

  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Down load file</button>
    </div>
  );
};

export default FileUpload;

