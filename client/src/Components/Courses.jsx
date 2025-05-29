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

   //initial data fetch
   useEffect(() => {
    initializeGraphFromDb()
   }, [])


   const initializeGraphFromDb = async () => {

        const nodesArray = []
        const edgesArray = []
        
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

                //create an edge from each prerequisite of the course to the course itself
                course.prerequisites.forEach(prereq => { 
                //checking if prerequisite is completed
                console.log(data)
                    const prereqCompleted = data.find(c => c.course_code == prereq)?.completed //prereq is the code of the prerequisite
                    const prereqLevel = data.find(c => c.course_code === prereq)?.level
                    edgesArray.push({
                        id: `e-${prereq}->${course.course_code}`,
                        source: prereq,
                        target: course.course_code,
                        type: (prereqLevel == course.course_level) ? "step" : "straight",
                        style: {
                            stroke: prereqCompleted ? "green" : "black",
                            strokeWidth: '2' }, //edge is green if prereq satisfied, black otherwise
                        animated: prereqCompleted,
                        markerEnd: {
                            type: 'arrowclosed', // filled arrow
                            color: prereqCompleted ? 'green' : 'black'
                        }
                    })

                })
            })
        })
            
        setNodes(nodesArray)
        setEdges(edgesArray)
        setAllNodes(nodesArray)
        setAllEdges(edgesArray)

    }

    return(
        
        <div className="flex justify-center w-full h-[200vh]">
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
            <button className="fixed bottom-4 right-4 z-50 h-12 w-12 bg-slate-200 hover:bg-slate-300 rounded-xl shadow-2xl cursor-pointer">Edit</button>
        </div>

            
        
        
        
    )
}

export default Courses