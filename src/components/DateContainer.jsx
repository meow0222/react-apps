import DateComponent from './DateComponent'


function DateContainer(props) {

    let dateArr = props.dateArr;
    let thisMonth = new Date(dateArr[0]);
    let thisMonthStart = thisMonth.getDay();

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
        </ul>
    )
}

export default DateContainer;