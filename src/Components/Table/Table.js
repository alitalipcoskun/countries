import React, { useState, useContext, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import RemoveModal from '../Modals/RemoveModal/RemoveModal';
import { Toolbar } from 'primereact/toolbar';
import { TableContext } from '../Context/TableContext';
import AddModal from '../Modals/AddModal/AddModal';
import { Button } from 'primereact/button';
import classes from './Table.module.css';
import UpdateModal from '../Modals/UpdateModal/UpdateModal';
import 'primeicons/primeicons.css';
import {FilterMatchMode} from 'primereact/api';
import Search from '../Search/Search';

export default function Table(props) {
    const {data, keys} = props;
    const {selectItem, selectedRow} = useContext(TableContext);
    const [selectedItems, setSelectedItems] = useState({...selectedRow});
    const datatable = useRef("")
    const [filterValue, setFilterValue] = useState('');
    const renderKeys = keys ? keys.filter(element => element !== 'isActive'): [];



    const [filters, setFilters] = useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        country: {value: null, matchMode: FilterMatchMode.CONTAINS},
        
    })

    const exportCSV = () => {
        datatable.current.exportCSV();
    }


  

    const LeftToolbarTemplate = () => {
        return <div className= {classes.left}>
            <AddModal></AddModal>
            <UpdateModal item = {selectedItems}></UpdateModal>
            <RemoveModal item={selectedItems}></RemoveModal>
        </div>
        
    }

    const changeHandler = (event) => {
        let _filters = {...filters}
        _filters['global'].value = event.target.value
        setFilterValue(event.target.value);
        setFilters(_filters);
    }





    const RightToolBarTemplate = () => {
        
        return <div className={classes.right}>
            <Search changeHandler = {changeHandler} value = {filterValue} placeHolder = {'Search'}></Search>
            <Button label = "Excel" className = 'p-button-help' onClick = {exportCSV}></Button>
        </div> 
        
    }
    

    
    return (<div className={classes.table} key = "1">
        <Toolbar className=' mb-4' start={LeftToolbarTemplate} end= {RightToolBarTemplate}></Toolbar>
        {<DataTable ref = {datatable} value={data} size={'small'} selection= {selectedItems} selectionMode={null} showGridlines tableStyle={{ width: '100vw' }} paginator rows = {10} rowsPerPageOptions = {[5, 10, 25]} onSelectionChange={(event) => {
            setSelectedItems(event.value)
            selectItem(event.value);
        }} dataKey="id"
        filters = {filters}
        filterDisplay="row"
        globalFilterFields={['country']}

        >
            <Column selectionMode="single" headerStyle={{ width: `1/${renderKeys.length + 1}%` }}></Column>
            {data.length !== 0 ? renderKeys.map((key, idx) => {
                return <Column key={key} field={key} filterField= {key}  showFilterMenu= {false} header={`${key.charAt(0).toUpperCase()}${key.slice(1)}`} sortable style={{ width: `1/${keys.length + 1}%` }}></Column>
            }): []}
        </DataTable>}
    </div>

    );

}
