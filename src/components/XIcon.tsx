import { motion } from "framer-motion"

interface xxx {
    setIsActive: any
    isOpen: any
    // onClick: any
}

const XIcon: React.FC<xxx> = ({setIsActive, isOpen}) => {

    return (
        <motion.svg onClick={() => setIsActive(isOpen)} whileHover={{rotate: 90}} xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x close-icon">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
        </motion.svg>
    )
}

export default XIcon;