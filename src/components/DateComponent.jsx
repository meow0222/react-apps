function DateComponent(props) {
    let date = new Date(props.today)
    let checkHoliday = ''

    if(date.getDay() === 0) {
        checkHoliday = "holiday"
    } else {
        checkHoliday = "day"
    }

    return (
        <li className={ checkHoliday }>{ date.getDate() }</li>
    )
}

export default DateComponent;