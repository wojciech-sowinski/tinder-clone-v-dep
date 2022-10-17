import imageCompression from 'browser-image-compression';
import React, { useState } from 'react';
import axios from 'axios';
import { FileUploader } from "react-drag-drop-files";
import DataLoader from '../components/DataLoader'
import { useDispatch } from 'react-redux';
import { isLogged } from '../actions/userActions';
import '../styles/dragAndDrop.scss'
import config from '../config';


function UploadImg() {

    const [uploading, setUploading] = useState(false)
    const dispatch = useDispatch()

    const fileTypes = ["JPG", "JPEG", "PNG", "GIF", "WEBP"];

    const handleChange = async (file) => {

        const compresionOptions = {
            maxSizeMB: 0.2,
            maxWidthOrHeight: 1200,
            useWebWorker: true,
            fileType: file.type,
        }

        setUploading(true)

        const compressedFile = await imageCompression(file, compresionOptions);
        const formData = new FormData();
        formData.append('image', compressedFile);
        console.log('upl img: ', config.serverUrl + 'upload');
        axios.post(config.serverUrl + 'upload', {
            data: formData,
            headers: { 'Content-type': 'multipart/form-data' },
            withCredentials: true
        })
            .then(result => {
                if (result.status === 200) {
                    setUploading(false)
                    if (result.data.uploadResult) {
                        dispatch(isLogged())
                    } else {
                        alert('Upload file error')
                        setUploading(false)
                    }
                } else {
                    setUploading(false)
                }
            });
    };


    return (
        <>
            {uploading ? <DataLoader text={'Uploading image'} /> : null}
            <FileUploader classes={'drag-and-drop'} handleChange={handleChange} name="file" types={fileTypes} hoverTitle="drop file here" />
        </>
    );
}

export default UploadImg;