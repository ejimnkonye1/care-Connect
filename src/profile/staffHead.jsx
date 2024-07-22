import img from '../images/staff.svg'
export const Staff1 = () => {
    return(
        

        <div className="d-flex justify-content-center flex-column ">
        <h4 className="text-center welcome">Welcome to Staff Web Portal 👋</h4>

        <div className="first-title py-2">
            <p className="title-sub text-center ">
            The smart platform for childcare management.<br/>
Login to your staff account to manage enrolments, bookings, billing, and parent communication.
            </p>
        </div>
        <div className='first-holder'>
        <div className='d-flex justify-content-center mt-4'>
            <img src={img} className='background-img' />
        </div>
     
        </div>

        <div className='end-text text-center mt-4'>
            <p>Powered by ℭ𝔯𝔢𝔠𝔥𝔢ℭ𝔬𝔫𝔫𝔢𝔠𝔱. © Ejimnkonye - All rights reserved</p>

        </div>
    </div>

    )
}