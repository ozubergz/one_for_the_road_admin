import React, { useState, useEffect } from 'react';
import ListOrder from "./ListOrder";

const ROOT_URL = "http://localhost:3000/api/"

const Dashboard = () => {
    const [pendingList, setPendingList] = useState([]);
    const [completeList, setCompleteList] = useState([]);

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

    //this toggles to update orders whether to set them as complete or pending
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

    const handleDelete = (values) => {
        fetch(`${ROOT_URL}orders/destroy_all`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ids: values}) // 
        })
        .then(res => res.json())
        .then(({ids}) => {
            console.log(ids)
        })
    }

    return (
        <div>
            <h1>One for the Road Admin</h1>
            <div className="list-group">
                <ListOrder 
                    heading="Pending Orders" 
                    listType="pending"
                    orders={pendingList} 
                    handleChange={handleChange}
                    handleSort={handleSort}
                    handleDelete={handleDelete}
                />
                <ListOrder 
                    heading="Complete Orders" 
                    listType="complete"
                    orders={completeList} 
                    handleChange={handleChange} 
                    handleSort={handleSort}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    );
}

export default Dashboard;