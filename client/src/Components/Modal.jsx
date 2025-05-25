import ModalHeader from './ModalHeader.jsx'
import ModalButtons from './ModalButtons.jsx'
import InputCourses from './InputCourses.jsx'

function Modal() {

    return(
        <div className="flex flex-col justify-center space-y-9 mx-auto w-3/4 mx-y h-180 bg-neutral-50 shadow-xl ring-2 ring-slate-50 rounded-2xl">
               <ModalHeader text="Enter Courses"/>
               <InputCourses/>
               <ModalButtons backButton={true}/>
        </div>
    )
}

export default Modal