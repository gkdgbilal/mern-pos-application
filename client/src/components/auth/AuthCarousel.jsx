import React from 'react'

const AuthCarousel = ({ imgSrc, title, description }) => {
    return (
        <div className='!flex flex-col items-center justify-center h-full mb-10'>
            <img className='w-[600px] h-[500px]' src={imgSrc} alt="" />
            <h3 className='prevent-select text-4xl text-white font-bold text-center'>
                {title}
            </h3>
            <p className='prevent-select mt-5 text-2xl text-white text-center'>
                {description}
            </p>
        </div>
    )
}

export default AuthCarousel