import React from 'react';
import ItemContainer from "./ItemContainer";
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

const Order = (props) => {
    const { id, customer, email, items, date, time, pending } = props;
    const refs = {};

     //callback function setting refs(object) as element ids with element
     const setRefs = (element) => {
        if(element) refs[element.id] = element;
    }

    return (
        <ListItem className="list-item">
            <div className="list-item-body">
                <ul>
                    <li>{customer}</li>
                    <li>email: {email}</li>
                    <li>date: {date}</li>
                    <li>time: {time}</li>
                </ul>

                <div className="collapse" id={id} style={{display: 'none'}} ref={setRefs} >
                    <Divider className="divider" />
                    <ItemContainer key={id} items={items} />
                </div>                       
            </div>

            <div className="btn-group">
                <Select
                    native
                    value={pending}
                    // onChange={(e) => handleChange(e, id)}
                    className="select-input"
                    disableUnderline={true}
                    style={{backgroundColor: pending ? "#d9455f" : "#a8df65"}}
                >
                    <option value={true}>Waiting...</option>
                    <option value={false}>Complete</option>
                </Select>
                <Button
                    id="second-btn"
                    size="small"
                    varaiant="contained"
                    // onClick={() => handleToggle(order)}
                >
                    Orders <i className="fa fa-angle-down"></i>
                </Button>
            </div>

        </ListItem>
    );
    
}

export default Order;