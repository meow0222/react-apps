import DateContainer from './DateContainer';
import DayComponent from './DayComponent'
import './Calendar.css';
import { useState, useEffect } from "react";

function Calendar() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/message", {
            method: "GET",
            headers: {
                "casino": "message"
            }
        })
        .then((res) => res.json())
        .then((data) => setMessage(data.message));
    }, []);
    console.log(message);


    let currentYear = 2023;
    let currentMonth = 7;

    let [month, setMonth] = useState(0);
    let monthNow = month + currentMonth + 1
    let isPrevBtnDisplay = true;
    let isNextBtnDisplay = true;
    if(monthNow === 1) {
        isPrevBtnDisplay = false;
    }
    if(monthNow === 12) {
        isNextBtnDisplay = false;
    }

    const settedDate = new Date(currentYear, (monthNow - 1), 1);

    let allDate = [];
    let numberOfDate;

    switch(monthNow) {
        case 1:
            numberOfDate = 31;
            break;
        case 2:
            numberOfDate = 28;
            break;
        case 3:
            numberOfDate = 31;
            break;
        case 4:
            numberOfDate = 30;
            break;
        case 5:
            numberOfDate = 31;
            break;
        case 6:
            numberOfDate = 30;
            break;
        case 7:
            numberOfDate = 31;
            break;
        case 8:
            numberOfDate = 31;
            break;
        case 9:
            numberOfDate = 30;
            break;
        case 10:
            numberOfDate = 31;
            break;
        case 11:
            numberOfDate = 30;
            break;
        case 12:
            numberOfDate = 31;
            break;
    }


    allDate.push(Array.from({length: numberOfDate}, (_, i) => {
        return new Date(currentYear, (monthNow - 1), i+1);
    }));

    let newDate = allDate[0];
    
    return (
        <div className="calendar">
            <div className="month">
            {
                isPrevBtnDisplay 
                ? <button onClick={() => setMonth(month - 1)}>prev</button> 
                : <button>-</button>
            }
            <h4>{ monthNow }</h4>
            {
                isNextBtnDisplay 
                ? <button onClick={() => setMonth(month + 1)}>next</button> 
                : <button>-</button>
            }
        </div>
            <DayComponent/>
            <DateContainer dateArr={ newDate } />
        </div>
    )
}

export default Calendar;