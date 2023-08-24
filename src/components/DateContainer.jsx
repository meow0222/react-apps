import DateComponent from './DateComponent'
import { useState, useEffect, useRef } from "react";

function DateContainer(props) {

    const [newEvent, setEvent] = useState("");
    const eventRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit(newEvent);
        // console.log(e.target[0].value)

        inputVal = { events: e.target[0].value}
    
        // const form = e.target;
        // const formData = new FormData(form);


        useEffect(() => {
            fetch("http://localhost:8080/addEvent", {
                method: "POST",
                headers: {
                    "casino": "addEvent",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(inputVal)
            })
            .then((res) => res.text(inputVal))
            .then((data) => setEvent(data));
        }, []);
        console.log(inputVal);
        
        // const formJson = Object.fromEntries(formData.entries());
        // console.log(formJson);
      }

    let dateArr = props.dateArr;
    let thisMonth = new Date(dateArr[0]);
    let thisMonthStart = thisMonth.getDay();
    let inputVal;

    function blankDate(num) {
        return [...Array(num)].map((_, index) => <tr key={index}/>) 
    }

    

    return (
        <ul className="day-container">
            {blankDate(thisMonthStart)}
            {
                dateArr.map((date) => {
                    return <DateComponent today={date} key={dateArr[date]} />
                })
            }
            <div className="modal">
                <form method="post" onSubmit={handleSubmit}>
                    <input type="text" name="eventText" id="eventText" value={newEvent} ref={eventRef}/>
                    <button type="submit">Add Event</button>
                </form>
            </div>            
        </ul>
    )
}

export default DateContainer;