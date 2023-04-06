import React from "react";
import {Link} from "react-router-dom"

export default function() {
  return(
    <div className="container">
      <h1>Welcome</h1>
      <h4>This is a very little raw example of a future crypto investments application</h4>
      <div className="links">
        <Link className='link' to={'transactions'}>Transactions Book &rarr;</Link>
        <Link className='link' to={'liquidity'}>Liquidity analyzer &rarr;</Link>
      </div>
    </div>
  )
}