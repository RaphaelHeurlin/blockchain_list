import './App.css'

export function Card(props) {

    return (
        <div className='card'>
            <strong>{props.name}</strong>
            <div className='date-info'>
                <small>Date : {props.date} {props.time}</small>
            </div>
        </div>
    )
}