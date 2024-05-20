import React, { ReactNode } from "react"
import "../style/popup.css"
interface PopupProps {
  onClose: () => void
  children: ReactNode
}

const Popup: React.FC<PopupProps> = ({ onClose, children }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {children}
        <button onClick={onClose} className="popup-close">Close</button>
      </div>
    </div>
  )
}

export default Popup
