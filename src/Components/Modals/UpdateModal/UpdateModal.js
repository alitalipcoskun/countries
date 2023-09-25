import React, { useContext, useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { TableContext } from '../../Context/TableContext';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

const UpdateModal = (props) => {
    const context = useContext(TableContext);
    const { updateElement, user, selectedRow, selectItem} = context;
    const [modalVisibility, setModalVisibility] = useState(false);
    const [submitted, setSubmission] = useState(false);
    const [row, setRow] = useState({...selectedRow});

    const onInputTextChange = (event, name) => {
        const val =  event.target.value || '';
        let _changedProduct = { ...selectedRow};
        console.log(val);
        _changedProduct[`${name}`] = val;
        setRow(_changedProduct);
        selectItem(_changedProduct);

    }

    const onInputNumberChange = (event, name) => {
        const val = event.target.value || '';
        let _changedProduct = { ...selectedRow};
        _changedProduct[`${name}`] = val;
        setRow(_changedProduct);
        selectItem(_changedProduct);
    }


    const saveProduct = () => {
        let flag = false;
        const columns = ['country', 'digit'];
        for(let i = 0; i < columns.length; ++i){
            if(row[columns[i]] === '' || row[columns[i]] === ''){
                flag = true;
            }
        }
        setSubmission(true);
        if(!flag){
            const tax = {
                ...row,
            }
            
            updateElement(tax, user)
            setSubmission(true)
        }
        
    }


    const onUpdateHandler = () => {
        setModalVisibility(true);
    }


    const Footer = (props) => {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" className='p-button-text' onClick={() => { setModalVisibility(false) }}></Button>
                <Button label="Update" icon="pi pi-check" onClick={saveProduct}></Button>
            </div>
        )
    }




    return (
        <div className='card flex justify-content-center'>
            {!selectedRow ?<Button label = "Update" disabled></Button>:<Button label="Update" onClick={onUpdateHandler}></Button>}
            <Dialog header="Updating" style={{ width: '50vw' }} className='p-fluid' footer={Footer} visible={modalVisibility} onHide={() => setModalVisibility(false)}>
                <div className='formgrid grid'>
                    <div className='field col'>
                        <label htmlFor='country' className='font-bold'>Country</label>
                        <InputText id='country' value={selectedRow ? selectedRow.country: []} onChange={(event) => { onInputTextChange(event, 'country') }}
                            required autoFocus className={classNames({ 'p-invalid block': submitted && !selectedRow['country'] })}></InputText>
                        {submitted && !selectedRow['country'] && <small className='p-error'>Country is required</small>}
                    </div>
                    <div className='field col'>
                        <label htmlFor='digit' className='font-bold'>Digit</label>
                        <InputText id='digit' value={selectedRow ? selectedRow.digit : []} onChange={(event) => { onInputTextChange(event, 'digit') }}
                            required autoFocus className={classNames({ 'p-invalid block': (submitted &&  selectedRow['digit']) === true })}></InputText>
                        {(submitted && !selectedRow['digit']) && <small className='p-error'>Digit is required</small>}
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default UpdateModal