import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
// import Button from '@material-ui/core/Button';
// import Select from '@material-ui/core/Select';

const Order = (props) => {
    const { id, customer, email, items, date, time } = props;

    return (
        <ListItem key={id} className="list-item">
            <div className="list-item-body">
                <ul>
                    <li>{customer}</li>
                    <li>email: {email}</li>
                    <li>date: {date}</li>
                    <li>time: {time}</li>
                </ul>
                {/* <div className="collapse" id={order.id} style={{display: 'none'}} ref={setRefs} > */}
                <div className="collapse" id={id} style={{display: 'none'}} >

                    <Divider className="divider" />
                    <ol>
                        {items.map(({id, name, select_options}, i) => { 
                            return <li key={i}>
                                {name}                                                    
                                {select_options ?
                                    select_options.map(option => {
                                        return <span 
                                            className="select-option-li"
                                            style={{display: 'block'}} 
                                            key={option.id}>- {option.name}</span>
                                    }) 
                                        : 
                                    null
                                }
                            </li> 
                        })}
                    </ol>
                </div>                            
            </div>

            {/* <div className="btn-group">
                <Select
                    native
                    value={order.pending}
                    onChange={(e) => handleChange(e, order.id)}
                    className="select-input"
                    disableUnderline={true}
                    style={{backgroundColor: order.pending ? "#d9455f" : "#a8df65"}}
                >
                    <option value={true}>Waiting...</option>
                    <option value={false}>Complete</option>
                </Select>
                <Button
                    id="second-btn"
                    size="small"
                    varaiant="contained"
                    onClick={() => handleToggle(order)}
                >
                    Orders <i className="fa fa-angle-down"></i>
                </Button>
            </div>                         */}
        </ListItem>
    );
    
}

export default Order;