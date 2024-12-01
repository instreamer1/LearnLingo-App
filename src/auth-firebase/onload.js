

const handleFileUpload = (event) => {
    console.log("File selected", event.target.files);  
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
  
      reader.onload = async () => {
        try {
        
          const teachers = JSON.parse(reader.result);
         
        
        } catch (error) {
          console.error('Error processing JSON data:', error);
        }
      };
  
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
  
      reader.readAsText(file);
    } else {
      console.error('Please upload the file in JSON format.');
    }
  };
  

document
  .getElementById("fileInput")
  .addEventListener("change", handleFileUpload);
