import React, { useContext, useState } from 'react'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { TableContext } from '../../Context/TableContext';
const RemoveModal = (props) => {
    const {selectedRow, deleteElement} = useContext(TableContext);
    const [modalVisibility, setModalVisibility] = useState(false)


    const Footer = (props) => {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times"  className="p-button-text"  onClick={() => { 
                    setModalVisibility(false)
                    }}/>
                {!selectedRow ? <Button label="Sil" severity = 'danger' icon="pi pi-check" text raised disabled autoFocus onClick= {() => { console.log(selectedRow)}}/> : 
                <Button label="Continue" icon="pi pi-check"  autoFocus onClick= {() => { deleteElement(selectedRow)}}/>}
                
            </div>
        )
    }


  return (
    <div className="card flex justify-content-center">
        {!selectedRow  ?<Button label = "X Delete" severity = 'danger' disabled></Button> : <Button label = "X Delete" severity = 'danger' onClick={() => {
            
            setModalVisibility(true)}}></Button>}
            <Dialog header="Confirm" style={{ width: '50vw' }}  footer={Footer} visible = {modalVisibility} onHide={() => {setModalVisibility(false)}}>
                <p className="m-0">
                   Record will be deleted. Do you want to continue?
                </p>
            </Dialog>
        </div>
  )
}

export default RemoveModal;

