import React, { useState, useEffect } from 'react';
import ListOrder from "./ListOrder";


import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


const ROOT_URL = "http://localhost:3000/api/"

const Dashboard = () => {

    const [pendingList, setPendingList] = useState([]);
    const [completeList, setCompleteList] = useState([]);
    const refs = {};

    useEffect(() => {
        fetch(`${ROOT_URL}orders`)
        .then(res => res.json())
        .then(data => {
            //this check if there's an error server
            if(data.error) {
                console.error('Error:', data.error)
            } else {
                //this filters orders that are pending
                const pendingOrders = data.filter(order => order.pending);
                //this filters orders that are not pending
                const completeOrders = data.filter(order => !order.pending);
                //this seperate lists between complete and pending orders
                setPendingList(pendingOrders);
                setCompleteList(completeOrders);
            }
        });
    }, []);

    //toggle handler to toggle display order items 
    const handleToggle = ({id}) => {
        const element = refs[id];
        const { display } = element.style;

        //target parent of parent
        const topParent = element.parentNode.parentNode;

        //target second button in button group
        const button = topParent.querySelector('#second-btn');

        button.innerHTML = (display === 'none') ? `Orders <i class="fa fa-angle-up"></i>` : `Orders <i class="fa fa-angle-down"></i>`

        element.style.display = (display === 'none') ? 'block' : 'none';        
    }

    //callback fucnttion setting refs(object) as element ids with element
    const setRefs = (element) => {
        if(element) refs[element.id] = element;
    }

    //this toggles if orders is completed or pending
    const handleChange = (e, id) => {
        //update pending and complete orders
        fetch(`${ROOT_URL}orders/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({pending: e.target.value})
        })
        .then(res => res.json())
        .then(newData => {
            const { pending } = newData;
            
            if(!pending) {
                //remove non pending orders and add them to complete list
                const newPendingOrders = pendingList.filter(order => order.id !== newData.id);
                setPendingList(newPendingOrders)
                setCompleteList([newData, ...completeList])
            } else if(pending) {
                const newCompleteOrders = completeList.filter(order => order.id !== newData.id);
                setCompleteList(newCompleteOrders)
                setPendingList([newData, ...pendingList])
            }
        });
    }



    //this is a callback function that sorts objs
    const compare = (key) => {
        return (a, b) => {
            if(key === "created_at") {
                //only sort descending order for date key
                if (a[key] > b[key]) return -1
                return a[key] < b[key] ? 1 : 0
            } else {
                if (a[key] < b[key]) return -1
                return a[key] > b[key] ? 1 : 0
            }
        }
    }

    //this handles to set the lists that are sorted
    const handleSort = (e, listType) => {
        const { value } = e.target;
        let sortedList = (listType === "pending") ? [...pendingList] : [...completeList];
        sortedList.sort(compare(value))
        
        listType === "pending" ? setPendingList(sortedList) : setCompleteList(sortedList)
    }

    const selectInput = (listType) => {
        return(
            <FormControl className="list-actions">
                <InputLabel className="native-simple-label" htmlFor="sort-native-simple">Sort by</InputLabel>
                <NativeSelect
                    onChange={(e) => handleSort(e, listType)}
                    disableUnderline={true}
                    id="sort-native-simple"
                >
                    <option aria-label="None" value="" />
                    <option value={"customer"}>Name</option>
                    <option value={"email"}>Email</option>
                    <option value={"created_at"}>Date</option>
                </NativeSelect>
            </FormControl>
        )
    }

    
    return (
        <div>
            <h1>One for the Road Admin</h1>
            <div className="list-group">
                <ListOrder heading="Pending Orders" orders={pendingList} />
                <ListOrder heading="Complete Orders" orders={completeList} />
            </div>
        </div>
    );
}

export default Dashboard;