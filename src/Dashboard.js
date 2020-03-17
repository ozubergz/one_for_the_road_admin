import React, { Component } from 'react';

//React Notification Components
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
// import actionCable from 'actioncable';


class Dashboard extends Component {
    render() {
        return (
            <div>
                <ReactNotification />
                <h1>Welcome to the administration page</h1>
                <button
                    onClick={() => {
                        store.addNotification({
                            title: 'Dropbox',
                            message: 'Files were synced',
                            type: 'default',                         // 'default', 'success', 'info', 'warning'
                            container: 'top-right',                // where to position the notifications
                            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                            dismiss: {
                                duration: 3000 
                            }
                        })
                    }}
                >
                    Add notification
                </button>
            </div>
        );
    }
}

export default Dashboard;