import React from 'react';
import "../app.css"

export default function SideBar() {
  return (
    
    <div className="sidebar">
        <h2>EVENTS BAR</h2>
        <p className="section-title">Whats New?</p>
            Recent Event 1<br/>
            Recent Event 2<br/>
            Recent Event 3<br/>
        
        <p className="section-title">Starred</p>
        Starred club 1<br/>
        Starred club 2<br/>
        Starred club 3<br/>
        <p className="section-title">Acads</p>
        <p className="section-title">Technical events</p>
        <p className="section-title">Cultural events</p>
        <p className="section-title">Sports</p>
        
    </div>
  )
}