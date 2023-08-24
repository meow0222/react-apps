import { useState } from "react";

function MonthComponent(props) {
    let currentMonth = props.currentMonth + 1
    
    let [month, setMonth] = useState(0)
    let monthNow = month + currentMonth
    let isPrevBtnDisplay = true;
    let isNextBtnDisplay = true;
    if(monthNow === 1) {
        isPrevBtnDisplay = false;
    }
    if(monthNow === 12) {
        isNextBtnDisplay = false;
    }

    return (
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
    )
}

export default MonthComponent;