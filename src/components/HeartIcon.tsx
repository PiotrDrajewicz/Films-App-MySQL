import { motion } from 'framer-motion';

const heartVariants = {
    hidden: {
        pathLength: 1,
        opacity: 1,
        // pathSpacing: .5,
        // pathOffset: .5
    },
    visible: {
        pathLength: 1,
        opacity: 1,
        // pathSpacing: .5,
        // pathOffset: .5,
        transition: {
            duration: 5
        }
    }
}

const HeartIcon = () => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart popup-icon add-fav-icon">
            <motion.path whileHover={{scale: 1.4}} d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" variants={heartVariants} initial="hidden" animate="visible" stroke='white'/>
        </svg>

    )
}

export default HeartIcon;