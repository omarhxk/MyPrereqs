import PropTypes, { bool, func } from 'prop-types'

function ModalButtons(props) {
    
    return(
        <div className="flex justify-end space-x-4 m-4">
            {props.backButton ? <button class="text-center rounded-2xl shadow-xl w-20 ring-2 ring-red-300 text-white mt-5 bg-red-500 cursor-pointer">Back</button> : null}
            <button className="text-center rounded-2xl shadow-xl w-20 ring-2 ring-blue-300 text-white mt-5 bg-blue-500 cursor-pointer">Continue</button>
        </div>
    )

}

ModalButtons.propTypes = {
    backButton: bool,
    function: func
}

export default ModalButtons

