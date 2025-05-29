import { useState, useEffect } from 'react'
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import supabase from '../supabase-client.js'

function Courses() {

   const [nodes, setNodes] = useState([])
   const [edges, setEdges] = useState([])

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

        console.log(data)

        if (error) {
            console.error("Error getting user courses:", error)
        }

        //for each course
        data.forEach((course, index) => {
            console.log(course.course_code)
            
            //create graph node for the course
            nodesArray.push({
                id: course.course_code,
                data: {
                    label: course.course_code,
                    name: course.course_name,
                    level: course.course_level,
                    prereqs: course.prerequisites,
                    completed: course.completed },
                position: {x: course.course_level * 300, y: index * 50},
                sourcePosition: "right",
                targetPosition: "left"
            })

            //create an edge from each prerequisite of the course to the course itself
            course.prerequisites.forEach(prereq => { 
                //checking if prerequisite is completed
                const prereqCompleted = data.find(c => c.course_code == prereq)?.completed //prereq is the code of the prerequisite

                edgesArray.push({
                    id: `e-${prereq}->${course.course_code}`,
                    source: prereq,
                    target: course.course_code,
                    type: "straight",
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

        setNodes(nodesArray)
        setEdges(edgesArray)

    }

    return(
        <div style={{ width: '100%', height: '80vh' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
    )
}

export default Courses