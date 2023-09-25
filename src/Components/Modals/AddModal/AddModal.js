import React, { useContext, useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { TableContext } from '../../Context/TableContext';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

const AddModal = (props) => {
    const context = useContext(TableContext);
    const { addElement, user, biggest } = context;
    const [modalVisibility, setModalVisibility] = useState(false);
    const [product, setProduct] = useState({
        country: '',
        digit: ''
    });
    const [submitted, setSubmission] = useState(false);




    const onInputTextChange = (event, name) => {
        const val = event.target.value || '';
        let _changedProduct = { ...product };

        _changedProduct[`${name}`] = val;

        setProduct(_changedProduct);
    }

    const onInputNumberChange = (event, name) => {
        const val = event.target.value || '';
        let _changedProduct = { ...product };
        _changedProduct[`${name}`] = val;

        setProduct(_changedProduct);
    }


    const saveProduct = () => {
        const id = biggest ? biggest : 0;
        const cols = ['country', 'digit'];
        let flag = true;
        for (let i = 0; i < cols.length; ++i) {
            if (product[cols[i]] === undefined || product[[cols[i]]] === "") {
                flag = false;
                setSubmission(true)
            }
        }
        if (flag) {
            const _productWithId = {
                ...product,
                id: id + 1
            }
            console.log(_productWithId)
            addElement(_productWithId, user)
            setSubmission(true)
        }

    }


    const onAddHandler = () => {
        setModalVisibility(true);
    }


    const Footer = () => {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" className='p-button-text' onClick={() => { setModalVisibility(false) }}></Button>
                <Button label="Add" icon="pi pi-check" onClick={saveProduct}></Button>
            </div>
        )
    }




    return (
        <div className='card flex justify-content-center'>
            <Button label="Add" icon="pi pi-plus" severity='success' onClick={onAddHandler}></Button>
            <Dialog header="New Country" style={{ width: '50vw' }} modal className='p-fluid' footer={Footer} visible={modalVisibility} onHide={() => setModalVisibility(false)}>
                <div className='formgrid grid'>
                    <div className='field col'>
                        <label htmlFor='country' className='font-bold'>Country</label>
                        <InputText id='country' value={product.country} onChange={(event) => { onInputTextChange(event, 'country') }}
                            required autoFocus className={classNames({ 'p-invalid block': submitted && !product['country'] })}></InputText>
                        {submitted && !product['short_description'] && <small className='p-error block'>Country is required</small>}
                    </div>
                    <div className='field col'>
                        <label htmlFor='digit' className='font-bold'>Digit</label>
                        <InputText id='digit' value={product.digit} onChange={(event) => { onInputTextChange(event, 'digit') }}
                            required className={classNames({ 'p-invalid block': submitted && !product.digit })}></InputText>
                        {submitted && !product['description'] && <small className='p-error block'>Digit is required</small>}
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default AddModal
