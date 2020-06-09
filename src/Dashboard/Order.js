import React from 'react';
import ItemContainer from "./ItemContainer";
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';


const Order = (props) => {
    
    const { 
        id, 
        customer, 
        email, 
        items, 
        date, 
        time, 
        pending,
        handleChange,
        handleCheckBox
    } = props;

    const refs = {};

    //toggle handler to toggle display order items 
    const handleToggle = (id) => {
        const element = refs[id];
        const { display } = element.style;

        //target parent of parent
        const topParent = element.parentNode.parentNode;

        //target second button in button group
        const button = topParent.querySelector('#second-btn');
        button.innerHTML = (display === 'none') ? `Orders <i class="fa fa-angle-up"></i>` : `Orders <i class="fa fa-angle-down"></i>`
        element.style.display = (display === 'none') ? 'block' : 'none';        
    }

     //callback function setting refs(object) as element ids with element
     const setRefs = (element) => {
        if(element) refs[element.id] = element;
    }


    return (
        <ListItem className="list-item">
            <ListItemIcon className="list-checkbox-group">
              <Checkbox
                edge="start"
                onClick={() => handleCheckBox(id)}
                // checked={checked.indexOf(id) !== -1}
                // tabIndex={-1}
                // inputProps={{ 'aria-labelledby': labelId }}
              />
              {/* {console.log(checked)} */}
            </ListItemIcon>

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

            <div className="list-btn-group">
                <Select
                    native
                    value={pending}
                    onChange={(e) => handleChange(e, id)}
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
                    onClick={() => handleToggle(id)}
                >
                    Orders <i className="fa fa-angle-down"></i>
                </Button>
            </div>

        </ListItem>
    );
    
}

export default Order;