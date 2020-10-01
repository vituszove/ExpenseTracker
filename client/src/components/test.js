import React,{Component} from 'react';
import MaterialTable from "material-table";
class AutoFinancing extends Component {
constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Name', field: 'name' },
        {title:'Surname', field:'surname'}
      ],
      data: [
        { name: 'Joanne', surname: 'Yap' },
        { name: 'Vitus', surname: 'Wee'},
      ]
    }
  }

  render() {
    return (
      <MaterialTable
        title="Editable Preview"
        columns={this.state.columns}
        data={Array.from(this.state.data)}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  data.push(newData);
                  console.log(data)
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let data = this.state.data;
                  const index = data.indexOf(oldData);
                  data.splice(index, 1);
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
        }}
      />
    )
  }
} 
export default AutoFinancing;