import DateComponent from './DateComponent'
import { useState, useEffect, useRef } from "react";

function DateContainer(props) {
    let [eventDay, newEventDay] = useState("")
    let [showDate, setModalDate] = useState("")
    const [isModal, setModal] = useState(false);
    const [eventData, getEvent] = useState("");
    const [holiday, getHoliday] = useState("");
    let eventDate = new Date()


    useEffect(() => {
        fetch("http://localhost:8080/api/events", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((data) => getEvent(Object.values(data[0])));
    }, []);

    useEffect(() => {
        fetch("https://canada-holidays.ca/api/v1/holidays")
        .then((res) => res.json())
        .then((data) => getHoliday(Object.values(data["holidays"])));
    }, []);

    

    const tempHoliday = []
    for(let i=0; i<holiday.length; i++) {
        tempHoliday.push(holiday[i].date)
    }
    const tempHolidayDetail = []
    for(let i=0; i<holiday.length; i++) {
        tempHolidayDetail.push(holiday[i].nameEn)
    }
    // console.log(holiday)

    const tempArr = []
    for(let i=0; i<eventData.length; i++) {
        tempArr.push(eventData[i].eventday)
    }
    const tempDetail = []
    for(let i=0; i<eventData.length; i++) {
        tempDetail.push(eventData[i].detail)
    }
    


    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function getDate(e) {
        eventDate = new Date(dateArr[0].getYear(), dateArr[0].getMonth(), e.target.value)
        newEventDay(eventDate)
        setModal(true)
        let newEvent = months[eventDate.getMonth()] + " " + eventDate.getDate()
        setModalDate(newEvent)
    }

    const addNewEvent = (e) => {
        e.preventDefault();

        const newEvent = {
            id: Date.now(),
            eventday: showDate,
            detail: e.target[0].value
        }
        fetch('http://localhost:8080/api/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
        })
        .then(response => {
        console.log("response", response);
        if (!response.ok) {
            throw new Error('EVENT response was not ok');
        }
        return response.json();
        })
        .then(data => {
        console.log("Check Data",data);
        })
        .catch(error => {
        console.error('Error adding todo:', error);
        });
    }

    let dateArr = props.dateArr;
    let thisMonth = new Date(dateArr[0]);
    let thisMonthStart = thisMonth.getDay();
    

    function blankDate(num) {
        return [...Array(num)].map((_, index) => <li key={index}/>) 
    }

    const needCheck = tempArr.map((date)=>{
        return new Date(date + ", 2023")
    })    
    const needCheckHoliday = tempHoliday.map((date)=>{
        return new Date(date)
    })    

    return (
        <div>
            <ul className="day-container">
                {blankDate(thisMonthStart)}
                {
                    dateArr.map((date) => {
                        return <DateComponent today={date} checkEvent={needCheck} checkHoliday={needCheckHoliday} detail={tempDetail} holidayDetail={tempHolidayDetail} key={date} onClick={getDate} />
                    })
                }
            </ul>
            {
            isModal 
            ? <div className="modal block">
                <form method="post" onSubmit={addNewEvent}>
                    <p>{showDate}</p>
                    <input type="text" name="eventText" id="eventText" />
                    <button type="submit">Add Event</button>
                </form>
                </div>
            : <div className="modal">
                <form method="post" onSubmit={addNewEvent}>
                    <input type="text" name="eventText" id="eventText" />
                    <button type="submit">Add Event</button>
                </form>
            </div>}          
        </div>
    )
}

export default DateContainer;