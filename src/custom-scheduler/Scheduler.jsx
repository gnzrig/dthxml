import React from 'react'
import './style.css'

const datas = [
    {
        title: 'Meeting 1',
        start: '2015-02-12T10:30:00',
        end: '2015-02-12T12:30:00',
        column: 0
    },
    {
        title: 'Meeting 2',
        start: '2015-02-12T10:30:00',
        end: '2015-02-12T12:30:00',
        column: 1
    },
    {
        title: 'Meeting 3',
        start: '2015-02-12T10:30:00',
        end: '2015-02-12T12:30:00',
        column: 2
    }
]

const hours = Array.from({ length: 24 }, (_, index) => `${index}:00`);

const printEvent = (e) => {
    var rect = document.getElementById(e.target.id).getBoundingClientRect();
    document.createElement("div")
    if(document.getElementById(e.target.id).style.backgroundColor === 'blue'){
        document.getElementById(e.target.id).style.backgroundColor = 'transparent'
    } else {
        document.getElementById(e.target.id).style.backgroundColor = 'blue'
    }
}

const Scheduler = () => {
  return (
    <div>
        <table style={{position: "relative"}}>
            <thead>
                <tr>
                    <th>Hours</th>
                    {datas?.map((data , index) => {
                    return (<th key={index}>{data?.title}</th>)
                })}</tr>
            </thead>
            <tbody>
                {hours.map((hour, idx) => {
                    return (<tr key={idx}>
                        <td>{hour}</td>
                        {
                            datas.map((data, index) => {
                                return <td key={index} id={`col-${idx + 1}-row-${index + 1}`} onClick={printEvent}></td>
                            })
                        }
                    </tr>)
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Scheduler