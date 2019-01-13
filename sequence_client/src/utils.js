import React from 'react'
const moment = require('moment');

export const sequenceColor = (sequenceString) => {
  if(sequenceString.length) {
  const chars = sequenceString.split('')
  let count = 0
  return chars.map((c) => {
    let color = ''
    switch(c) {
      case 'A':
        color = "#0000ff"
        break;
      case 'T':
        color = "#9932CC"
        break;
      case 'C':
        color = "#FF0000"
        break;
      case 'G':
        color = "#008000"
        break;
      default:
        break;
    }
    count += 1
    return (
      <span style={{color: color, display: 'inline-block'}} key={count}>
        {c}
      </span>
    )
  })
  } else {
    return <span></span>
  }
}

export const renderDate = (date) => {
  return moment(date).format('L')
}