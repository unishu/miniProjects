import React from 'react'

const UploadFiles = () => {
    const [file, setfile] = useState()
  
    const onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("myfile", file[0]);
    
        axios.post("http://localhost:5000/fileupload",formData)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }
  
    const onChange = (e) => {
        setfile(e.target.files);
    }
  
        return (
            <form onSubmit={(e)=>onFormSubmit(e)}>
                <h1>File Upload</h1>
                <input type="file" className="file-input" name="myImage" onChange= {(e)=>onChange(e)} />
                <button className="upload-button" type="submit">Upload</button>
            </form>
        )
    
  }

export default UploadFiles