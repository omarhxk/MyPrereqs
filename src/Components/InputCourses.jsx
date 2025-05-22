import PropTypes from "prop-types"

function InputCourses(props) {

    return(
        
        <textarea type="text" className="flex-grow bg-white mx-2 p-2" value={props.inputText}/>
        
    )
}

export default InputCourses

InputCourses.propTypes = {
    inputText: PropTypes.string
}