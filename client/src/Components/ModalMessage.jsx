import PropTypes from "prop-types"

function ModalMessage(props) {

    return(
        <div className="flex justify-center">
            <p>{props.text}</p>
        </div>
    )
}

ModalMessage.PropTypes = {
    text: String
}

export default ModalMessage