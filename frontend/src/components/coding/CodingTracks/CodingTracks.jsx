import "./CodingTracks.css";

const tracks=[

{

name:"Google SDE",

progress:12,

questions:150

},

{

name:"Amazon SDE",

progress:0,

questions:120

},

{

name:"Microsoft SDE",

progress:0,

questions:110

},

{

name:"Adobe",

progress:0,

questions:80

}

];

const CodingTracks=()=>{

return(

<div className="tracks-section">

<h2>

Company Coding Tracks

</h2>

<div className="tracks-grid">

{

tracks.map((track,index)=>(

<div

className="track-card"

key={index}

>

<h3>

{track.name}

</h3>

<p>

{track.questions} Questions

</p>

<div className="progress-bar">

<div

className="progress-fill"

style={{

width:`${track.progress}%`

}}

>

</div>

</div>

<span>

{track.progress}% Completed

</span>

</div>

))

}

</div>

</div>

);

};

export default CodingTracks;