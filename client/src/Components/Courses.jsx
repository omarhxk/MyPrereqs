import { useState, useEffect, useRef } from 'react'
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import supabase from '../supabase-client.js'

function Courses() {

   const [nodes, setNodes] = useState([])
   const [edges, setEdges] = useState([])
   const [allNodes, setAllNodes] = useState([])
   const [allEdges, setAllEdges] = useState([])
   const [nodeClicked, setNodeClicked] = useState(false)
   const [coursesCompletion, setCoursesCompletion] = useState([])

   //initial data fetch
   useEffect(() => {
    initializeGraphFromDb()
   }, [])


   const initializeGraphFromDb = async () => {

        const nodesArray = []
        const edgesArray = []
        const completionArray = []
        
        const { data: { user },
                error: authError 
            } = await supabase.auth.getUser() //getting user id
        
        if (authError || !user) {
            console.error("Error fetching user:", authError)
        }

        const { data, error } = await supabase
            .from("CourseData")
            .select("*")
            .eq("user_id", user.id) //getting all of user's courses

        if (error) {
            console.error("Error getting user courses:", error)
        }

        //organizing by level
        const levelBuckets = {}
        data.forEach((course, index) => {
            const lev = course.course_level
            if (!levelBuckets[lev]) { //if key doesn't exist, create
                levelBuckets[lev] = []
            } 
            levelBuckets[lev].push(course) 
        })
        
        Object.entries(levelBuckets).forEach(([level, levelCourses]) => {
            levelCourses.forEach((course, i) => {
                //create graph node for the course
                nodesArray.push({
                    id: course.course_code,
                    data: {
                        label: `${course.course_code} - ${course.course_name}`,
                        name: course.course_name,
                        level: course.course_level,
                        prereqs: course.prerequisites,
                        completed: course.completed },
                    position: {x: 200 + level * 300, y: 200 + i * 150},
                    sourcePosition: "right",
                    targetPosition: "left"
                })
                completionArray.push(course.completed)

                //create an edge from each prerequisite of the course to the course itself
                course.prerequisites.forEach(prereq => { 
                    //checking if prerequisite is completed
                    const prereqData = data.find(c => c.course_code == prereq) //prereq is the code of the prerequisite
                    let prereqCompleted = false
                    let prereqLevel = 0
                    if (prereqData != null) {
                        prereqCompleted = prereqData.completed
                        prereqLevel = prereqData.course_level
                    }
                   
                    edgesArray.push({
                        id: `e-${prereq}->${course.course_code}`,
                        source: prereq,
                        target: course.course_code,
                        type: (prereqLevel == course.course_level) ? "step" : "straight",
                        style: {
                            stroke: prereqCompleted ? "green" : "red",
                            strokeWidth: '2' }, //edge is green if prereq satisfied, black otherwise
                        animated: true,
                        markerEnd: {
                            type: 'arrowclosed', // filled arrow
                            color: prereqCompleted ? 'green' : 'red'
                        }
                    })

                })
            })

        })
           
        setCoursesCompletion(completionArray)
        setNodes(nodesArray)
        setEdges(edgesArray)
        setAllNodes(nodesArray)
        setAllEdges(edgesArray)

    }

    return(
        
        <div className="relative w-full h-[200vh]">
            <div className="w-full h-full overflow-auto pr-[300px]">
                <ReactFlow nodes={nodes} edges={edges} fitView onNodeClick={(event, clickedNode) => {
                    if (nodeClicked) {
                        setNodes(allNodes)
                        setEdges(allEdges)
                        setNodeClicked(false)
                    }
                    else {
                        const connectedEdges = allEdges.filter(edge => (edge.target == clickedNode.id)) //edges from prereqs to selected node
                        const connectedEdgesSources = []
                        for (const edge of connectedEdges) {
                            connectedEdgesSources.push(edge.source)
                        }
                        const connectedNodes = allNodes.filter(node => connectedEdgesSources.includes(node.id))
                        connectedNodes.push(clickedNode)
                        setNodes(connectedNodes)
                        setEdges(connectedEdges)
                        setNodeClicked(true)
                    }
                }} />
            </div>
            <div className="fixed top-0 right-0 h-full w-[300px] bg-white border-l border-gray-300 overflow-y-auto shadow-lg z-50 p-4">
                { nodes.map((node, index) => ( 
                    <div className="flex space-x-3">
                    <div key={index} className="flex-1 p-4 border rounded-lg shadow space-y-2">
                        <div className="flex space-x-2">
                            <p><strong>Code: </strong>{node.id}</p>
                        </div>
                        <div className="flex space-x-2">
                            <p><strong>Name: </strong>{node.data.name}</p>
                        </div>
                        
                        <div className="flex space-x-1">
                            <p><strong>Completed:</strong></p>
                            <input checked={coursesCompletion[index]} className="bg-slate-100 rounded-2xl w-full block" type="checkbox"
                                onChange={(e) => {
                                    setCompletionInDb(node, e.target.checked)
                                    const copy = [...coursesCompletion]
                                    copy[index] = e.target.checked
                                    setCoursesCompletion(copy)
                                    }  }/>
                        </div> 
                    </div> 
                    </div>
                ) ) }
            </div>
                
                
        </div>

    )
}


const  setCompletionInDb = async (node, completionStatus) => {

    const { data: { user },
                error: authError 
            } = await supabase.auth.getUser() //getting user id
        
        if (authError || !user) {
            console.error("Error fetching user:", authError)
        }

    const { data, error } = await supabase
        .from("CourseData")
        .update({completed: completionStatus})
        .match({user_id: user.id, course_code: node.id})

    if (error) {
        console.error("Error updating course completion status:", error)
    }
}

export default Courses