import PropTypes from 'prop-types'

function ModalHeader(props) {

    return(
        <>
            <div className="text-center mt-2">
                <h1 className="font-semibold text-3xl tracking-tight">{props.text}</h1>
            </div>
        </>

    )
}

ModalHeader.propTypes = {
    text: PropTypes.string
}

export default ModalHeader