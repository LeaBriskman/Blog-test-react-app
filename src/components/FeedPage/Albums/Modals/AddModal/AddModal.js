import React, { Component } from 'react';
import './AddModal.css';

class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            titleValid: false,
            descriptionValid: false,
            formValid: false
        }
    }

    handleUserInput = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, 
            () => { this.validateInput(name, value) });
    }

    validateInput(fieldName, value) {
        let titleValid = this.state.titleValid;
        let descriptionValid = this.state.descriptionValid;
        switch(fieldName) {
          case 'title':
            titleValid = value.length >= 1;
            break;
          case 'description':
            descriptionValid = value.length >= 1;
            break;
          default:
            break;
        }
        this.setState({ titleValid: titleValid, descriptionValid: descriptionValid }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.titleValid && this.state.descriptionValid });
    }

    render() {
        return (
            <>
                <div className="AddModalTitle">Add album</div>
                <form>
                    <div className="ModalInputWrapper">
                        <label className="AddModalLabel" htmlFor="title">Title</label>
                        <input 
                            className="AddModalInput" 
                            name="title" 
                            value={this.state.title}
                            onChange={this.handleUserInput} 
                        />
                    </div>
                    <div className="ModalInputWrapper">
                        <label className="AddModalLabel" htmlFor="description">Description</label>
                        <input 
                            className="AddModalInput" 
                            name="description" 
                            value={this.state.description} 
                            onChange={this.handleUserInput}
                        />
                    </div>
                    <button className="AddModalBtn" onClick={() => this.props.addAlbum()} disabled={!this.state.formValid}>Send</button>
                </form>
            </>
        );
    };
};

export default AddModal;