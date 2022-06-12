import React from 'react'

export default function Home() {
  return (
    <div>
      <h1>HOME</h1>
      
      <p>In this repo you can see how to 
      <br/> - create one or more lists of elements, 
      <br/> - modify the position of each element trough one or more lists simply by clicking and moving it
      <br/>- store the changes in the API
      </p>

      <div className='mt-3'>
        <h4>Tools used</h4>
        <p>- React library  <a href='https://github.com/atlassian/react-beautiful-dnd'>react-beautiful-dnd</a></p>
        <p>- Mongoose, Express, React, NodeJs, Axios</p>
      </div>

      <div className='mt-3'>
        <p>Before start:</p>
        <p>- a post request with empty body &#123; &#125; to http://localhost:3002/api/dndlist</p>
        <p>- a post request with empty body &#123; &#125; to http://localhost:3002/api/dndmultiple</p>
      </div>
  </div>
  )
}
