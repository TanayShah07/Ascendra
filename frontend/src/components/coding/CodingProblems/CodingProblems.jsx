import "./CodingProblems.css";

import ProblemCard from "../ProblemCard/ProblemCard";

const problems = [

{

id:1,

title:"Two Sum",

difficulty:"Easy",

topic:"Arrays",

time:"15 min",

xp:25,

company:["Google","Amazon","Microsoft"]

},

{

id:2,

title:"Longest Substring Without Repeating Characters",

difficulty:"Medium",

topic:"Sliding Window",

time:"25 min",

xp:40,

company:["Amazon","Adobe"]

},

{

id:3,

title:"Merge K Sorted Lists",

difficulty:"Hard",

topic:"Heap",

time:"40 min",

xp:70,

company:["Google","Microsoft"]

}

];

const CodingProblems=()=>{

return(

<div className="coding-problems">

<h2>

Popular Coding Problems

</h2>

<div className="problem-list">

{

problems.map(problem=>(

<ProblemCard

key={problem.id}

problem={problem}

/>

))

}

</div>

</div>

);

};

export default CodingProblems;