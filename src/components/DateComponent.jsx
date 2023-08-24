import { useState } from "react";

function DateComponent(props) {
    
    let date = new Date(props.today)
    let checkHoliday = ''
    let checkEvent = props.checkEvent
    let eventColor = {
        color: "inherit"
    }
    let eventDetail = props.detail
    let showingDetail = ""

    if(date.getDay() === 0) {
        eventColor.color = "red"
    } 

    for(let i=0; i<checkEvent.length; i++){
        if(checkEvent[i].getDate() === date.getDate()) {
            eventColor.color = "yellow"
            showingDetail = showingDetail + " \uD83D\uDC04 " + eventDetail[i]
        } 
    }

    return (
        <li className={ checkHoliday } style={eventColor} onClick={props.onClick} value={date.getDate()}>{ date.getDate() } <span>{showingDetail}</span></li>
    )
}

export default DateComponent;