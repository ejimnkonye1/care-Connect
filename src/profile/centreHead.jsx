import img from '../images/centre.svg'

export const Centre1 = () => {
    return(
        <div className="d-flex justify-content-center flex-column">
                    <h4 className="text-center welcome">Welcome to CrecheConnect Web Portal 👋</h4>

                    <div className="first-title py-2">
                        <p className="title-sub text-center ">
                        Streamline your childcare experience with our smart platform.<br/> Manage enrollments, daily updates, parent communications, 
                        and more – all in one convenient place.
                        </p>
                    </div>
                    <div className='first-holder'>
                    <div className='d-flex justify-content-center mt-4'>
                        <img src={img} className='background-img' />
                    </div>
                    <div className="dotted-circle">
       
    </div>
                    </div>
         
                    <div className='end-text text-center mt-1'>
                        <p>Powered by ℭ𝔯𝔢𝔠𝔥𝔢ℭ𝔬𝔫𝔫𝔢𝔠𝔱. © Ejimnkonye - All rights reserved</p>

                    </div>
                </div>
    )
}