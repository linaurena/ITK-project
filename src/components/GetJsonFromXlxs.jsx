import React, { Component } from 'react'
import * as XLSX from 'xlsx';
import FormInitiative from './FormInitiative';


class GetDataFromExcelJusTInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sheet: "",
            sheets:[],
            file: false
        };
        
        this.handleInputChange = this.handleInputChange.bind(this)
    }
  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
     const this2 = this
    this2.setState({
      [name]: value
    })
    let hojas = []
    if (name === 'file') {
      let reader = new FileReader()
      reader.readAsArrayBuffer(target.files[0])
      reader.onloadend = (e) => {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type: 'array'});

        workbook.SheetNames.forEach(function(sheetName) {
          // Here is your object
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          hojas.push({
            data: XL_row_object,
            sheetName
          })
        })
        // console.log(hojas);
        // const newElements = [];
        // hojas[0].data.map((ele) => {
        //     newElements.push(ele);
        //     return newElements;
        // });
        this2.setState({
          selectedFileDocument: target.files[0],
          hojas
        })
      }
    }
  } 
  render() {
    const {
      handleInputChange,
    } = this
    const hojas = this.state.hojas;
    return (
        <div>
            <input 
                required 
                type="file" 
                name="file" 
                id="file" 
                onChange={handleInputChange} 
                placeholder="Archivo de excel" 
            />
            {hojas && <FormInitiative sheets={hojas} />}
        </div>
    );
  }
}

export default GetDataFromExcelJusTInput;
