import React, { Fragment, useState } from 'react';
import uploadFiles from '../../../api/uploadFiles';
import WindowPanel from '../../../components/WindowPanel/';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Pending from '../../../components/Pending/';

import { wrapper, bold, uploadBtn, errorCSS, filesList, pending, filesSizeCSS } from './FileUpload.module.scss';

function FileUpload () {
    const [error, setError] = useState(null);
    const [filesData, setFiles] = useState({
        files: [],
        totalSize: 0,
        uploadedSize: 0,
    });
    const [isPending, setPending] = useState(false);

    const onInputChange = (event) => {
        const input = event.target;
        const files = input.files;

        const filesList = [];
        let total = 0;

        for (let i = 0; i < files.length; i++) {
            filesList.push(files[i]);
            total += files[i].size;
        }

        setFiles({
            files: filesList,
            /* THIS IS IN MB if you want to MiB just use /1024 /1024 */
            totalSize: Math.ceil(total * 100 / 1000 / 1000) / 100,
            uploadedSize: 0,
        });
    }

    const onSelect = (event) => {
        event.preventDefault();
        setPending(true);
        const element = event.target;
        
        const projectName = element.querySelector('#project-name').value;
        const files = element.querySelector('#project-files').files;

        uploadFiles(projectName, files)
        .then(() => {
            console.log('UPLOAD FILES');
        })
        .catch(() => {
            console.log('STUUFFFF');
        });

        setTimeout(() => {
            setPending(false);
        }, 100000);
    }

    const { uploadedSize, totalSize } = filesData;
    return (
        <WindowPanel isVisible={true}>
            <div className={wrapper}>
                <h2>Create new project / Upload files</h2>
                {
                    isPending ?
                        <Pending className={pending}>Uploading files: {uploadedSize} / {totalSize} MB [{Math.ceil(uploadedSize * 100 / totalSize) || 0} %]</Pending>:
                        <Form onSubmit={onSelect}>
                            <Form.Group controlId="project-name">
                                <Form.Label className={bold}>Project name</Form.Label>
                                <Form.Control type="text" placeholder="Enter project name" className={!!error ? "is-invalid" : ''} />
                            </Form.Group>
                            <Form.Group controlId="project-files">
                                <Form.Label className={''}>Insert files (ex. 1.k, 2.k, 3.k ...)</Form.Label>
                                <Form.Control type="file" multiple="multiple/form-data" placeholder="Insert files" className={!!error ? "is-invalid" : ''} onChange={onInputChange}/>
                            </Form.Group>
                            {
                                filesData.files.length > 0 ?
                                    <Fragment>
                                        <ul className={filesList}>
                                            {
                                                filesData.files.map((file, id) => <li key={`${id}-file-list`}>{file.name}</li>)
                                            }
                                        </ul>
                                        <div className={filesSizeCSS}>{filesData.totalSize} MB</div>
                                    </Fragment> : null
                            }
                            {error ? <div className={errorCSS}>{error}</div> : null}
                            <div className={uploadBtn}>
                                <Button variant="primary" type="submit" size="sm">
                                    Upload
                                </Button>
                            </div>
                        </Form>
                }
            </div>
        </WindowPanel>
    );
};

export default FileUpload;
