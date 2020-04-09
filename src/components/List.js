import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import {getTaskList, createTask, deleteTask, updateTask} from './../ListFunctions';

class List extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: '',
      task: '',
      data: []
    }
    this.auth = jwtDecode(localStorage.getItem('auth')) || {};
  }

  onChange = (e) => {
    this.setState({
      task: e.target.value
    })
  }

  onUpdate = e => {
    e.preventDefault();
    updateTask(this.auth.userId, this.state.task, this.state.id).then(() => {
      this.getAll();
    });
  };

  getAll = () => {
    getTaskList(this.auth.userId).then((res) => {
      this.setState({
        task: '',
        data: [...res]
      })
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    createTask(this.auth.userId, this.state.task).then(() => {
      this.getAll();
    })
  }

  onEdit = (task, id, e) => {
    e.preventDefault();
    this.setState({
      id: id,
      task: task
    });
  }

  onDelete = (id, e) => {
    e.preventDefault();
    deleteTask(this.auth.userId, id).then(() => {
      let data = [...this.state.data];
      data.filter(function(item, index) {
        if (item._id === id) {
          data.splice(index, 1);
        }
        return true;
      });
      this.setState({ data: [...data] });
    })
  }
  componentDidMount () {
    this.getAll();
  }

  render () {
    return (
      <div className="col-md-12">
        <form>
          <div className="form-group">
            <label>Task Name</label>
            <div className="row">
              <div className="col-md-9">
                <input
                  type='text'
                  className="form-control"
                  id="exampleInputEmail1"
                  value={this.state.task || ""}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary"
                  onClick={this.onUpdate.bind(this)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <button type='submit' onClick={this.onSubmit} className="btn btn-success btn-block" >
            Submit
          </button>
        </form>
        <table className='table'>
          <tbody>
          {
            this.state.data.map((item,index) => (
              <tr key={index}>
                <td className='text-left'>{item.task}</td>
                <td className='text-right'>
                  <button className="btn btn-info mr-1" onClick={(e) => this.onEdit(item.task, item._id, e)}>
                    Edit
                  </button>
                  <button className="btn btn-danger"  onClick={(e) => this.onDelete(item._id, e)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    )
  }
}

export default List
