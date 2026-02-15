import React from 'react'
import "../../css/common/Modal.css";

const Modal = ({children, onClose}) => {
  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
        <div className="modal-content" 
        onClick={(e) => e.stopPropagation()} //stopPropagation whatever we will click it should open the other component should not open
        style={{ position: "relative" }}
        >
            <button className="modal-close" aria-label="Close"
            onClick={onClose}
            >
            ❌
            </button>
            {children}
        </div>
    </div>
  )
}

export default Modal;