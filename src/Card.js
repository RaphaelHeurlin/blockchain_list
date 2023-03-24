import './App.css'

export function Card(props) {

    return (
        <div className='card'>
            <strong>{props.name}</strong>
            <div className='date-info'>
                <small>Date</small>
                <small> {props.date}</small>
                <small> {props.time} </small>
            </div>
        </div>
    )
}