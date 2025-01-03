
import ba from '../images/ba.png'
export const Hero = () => {

    return(
<section id="Home" className="mb-4 py-10 px-4">
 <div
       className="h-auto p-8 text-center bg-cover bg-center bg-no-repeat text-white mt-12 mb-[60px]"
       style={{
         backgroundImage:  ` url(${ba})`,
       }}
     >
 
   <div className="left side lg:w-[35%] w-full flex-col items-start   h-full py-5">
     <div className="w-full">
     
 <div className='title relative '>
 <h6 className='text-[4.9rem] font-[800] font-sans relative text-start'>
   <span className='text-[#943885]'>happy</span> 
   {/* <span className='text-[#a5cc44] inline-block -mt-[400px]'>happens</span> <br />
   <span className='text-[#f7b45d]'>here.</span> */}
 
 </h6>
 <h6 className='text-[4.9rem] font-[800] font-sans relative  top-[-30px] text-start'>
 <span className='text-[#a5cc44] inline-block -mt-10'>happens</span></h6>
 <h6 className='text-[4.9rem] font-[800] font-sans relative  text-start  top-[-50px]'> <span className='text-[#f7b45d]'>here.</span></h6>
 </div>
 <div className='relative text-start top-[-40px] '>
 <p className="text-black mt-2 text-[1.5rem] ">
       From <span className='text-[#00adef]'>infancy to preschool,</span> 
       </p>
       <p className="text-black mt-1 text-[1.5rem]">
         we make early education and daycare joyful, engaging, and fun so children are happy to <span className='text-[#00adef]'>learn</span>,<span className='text-[#a5cc55]'> play</span>, and <span className='text-[#943885] font-bold'>grow.</span>
       </p>
 </div>
    
       {/* <button className="btn btn-primary mt-4" onClick={HandleLogin}>
         Get Started
       </button> */}
     </div>
   </div>
 </div>
</section>

    )
}