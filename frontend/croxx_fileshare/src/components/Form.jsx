import React from 'react';
import './form.css';
export default class Form extends React.Component{
    constructor(props){
        super(props)
        this.state={
            fileName: ""
        };
    }
    fileSelectHandel= async ()=>{
            let [fileHandle] = await window.showOpenFilePicker();
            const file = await fileHandle.getFile();
            const fileName = await file.name;
            const fileVlaue = await file.stream();
            this.setState({fileName: fileName});
            console.log(fileVlaue);

    };


    render(){    
        return(
            <div className='parentContainerForm'>
                    <div className='uploadButton'>
                        <button id='fileUpload' className='input-button' type="file" name='file' onClick={this.fileSelectHandel}>
                            Select Files
                            </button>
                    </div>

                    <div className='accessUrl'>
                    <p>Acess Url:</p>
                    <input className='titleEnter' type='text'/>
                    </div>
                    <div id='fileName'>
                        <p><u>{this.state.fileName}</u></p>
                    </div>
                    <button className='submit-button' type="submit">Upload</button>
            </div>
        );

}
}