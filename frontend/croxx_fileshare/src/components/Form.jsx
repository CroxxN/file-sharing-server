import React from 'react';
import './form.css';

export default function Form(){
    async function uploadHandel(){
        
        let [fileHandle] = await window.showOpenFilePicker();
        const file = await fileHandle.getFile();
        const fileVlaue = await file.stream();
        console.log(fileVlaue);

    };
        return(
            <div className='parentContainerForm'>
                    <div className='uploadButton'>
                        <button id='fileUpload' className='input-button' type="file" name='file' onClick={uploadHandel}>
                            Select Files
                            </button>
                    </div>
                    <div className='accessUrl'>
                    <p>Acess Url:</p>
                    <input className='titleEnter' type='text'/>
                    </div>
                    
                    <button className='submit-button' type="submit">Upload</button>
            </div>
        );

}