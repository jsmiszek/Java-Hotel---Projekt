import React, { Component } from "react";
import ItemService from "../../service/ItemService";
import "./Storage.css"

export default class AddItem extends Component{
    constructor(props) {
        super(props);

        this.state = {
            item_name: "",
            min_quantity: 0,
            current_quantity: 0,
            id_category: 1,
            all_categories: []
        }
    }

    componentDidMount() {
        ItemService.getAllCategories().then(
            response => {
                this.setState({
                    all_categories: response.data
                });
            },
            error => {
                this.setState({
                    all_categories:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    handleSubmit = () => {
        const newItem = {
            item_name: this.state.item_name,
            min_quantity: this.state.min_quantity,
            current_quantity: this.state.current_quantity,
            category: [{id: this.state.id_category}]
        };
        ItemService.createNewItem(newItem);//TODO: Jeśli chcemy obsługiwać komunikat błędu update'a na bazie to tutaj można to zrobić.
    };

    render() {
        return(
            <div style={{margin: '10px'}}>
                <form onSubmit={this.handleSubmit} className="storage-form">
                    <h3 className="storage-text storage-itemName-text">Dodajesz nowy przedmiot:</h3>
                    <div className="storage-form-group">
                        <label htmlFor={'itemName'} className="storage-form-label">NAZWA:</label>
                        <input type={'text'} value={this.state.item_name} onChange={event => this.setState({item_name: event.target.value})} name={'itemName'} required/><br/>
                    </div>

                    <div className="storage-form-group">
                        <label htmlFor={'minQuantity'} className="storage-form-label">MINIMALNA ILOŚĆ:</label>
                        <input type={'number'} min={'0'} value={this.state.min_quantity} onChange={event => this.setState({min_quantity: event.target.value})} name={'minQuantity'} required/><br/>
                    </div>

                    <div className="storage-form-group">
                        <label htmlFor={'currentQuantity'} className="storage-form-label">OBECNA ILOŚĆ:</label>
                        <input type={'number'} min={'0'} value={this.state.current_quantity} onChange={event => this.setState({current_quantity: event.target.value})} name={'currentQuantity'} required/><br/>
                    </div>

                    <div className="storage-form-group">
                        <label htmlFor={'itemCategory'} className="storage-form-label">KATEGORIA:</label>
                        <select className="form-control-sm" value={this.state.id_category}
                                onChange={event => this.setState({id_category: event.target.value})}
                                name={'itemCategory'}>
                            {this.state.all_categories.map(category => {
                                let nameOfCategory = '';
                                switch (category.category) { //TODO: W razie dodania nowej kateogrii należy jedynie dopisać odpowiedni case
                                    case 'CAT_FOOD':
                                        nameOfCategory = 'Jedzenie';
                                        break;
                                    case 'CAT_OFFICE':
                                        nameOfCategory = 'Biuro';
                                        break;
                                    case 'CAT_WORKSHOP':
                                        nameOfCategory = 'Warsztat'
                                        break;
                                    case 'CAT_OTHER':
                                        nameOfCategory = 'Inne';
                                        break;
                                    case 'CAT_HYGIENE':
                                        nameOfCategory = 'Sekcja Higieniczna';
                                        break;
                                    default:
                                        nameOfCategory = 'Nieznana kategoria';
                                }
                                return <option key={category.id} value={category.id}>{nameOfCategory}</option>;
                            })}
                        </select><br/>
                    </div>
                    <div className="storage-item-buttons">
                        <input type={'submit'} value={'Dodaj'} className="additem-button storage-confirmation-button" />
                        <button onClick={this.props.onCancel} className="additem-button storage-confirmation-button" >Anuluj</button>
                    </div>
                </form>
            </div>
        );
    }
}