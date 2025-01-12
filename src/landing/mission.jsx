
import mis from '../images/mission.svg'
import mis1 from '../images/mission.png'
export const Mission = () => {

    return(
<section id="Our mission" className="mb-4 py-10 px-4">
  <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4">
    {/* Background Image and Text Container for Large Screens */}
    <div className="relative col-span-1 lg:flex lg:flex-col lg:justify-center lg:items-start">
      {/* Background Image */}
      <div
        className="relative h-full w-full bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${mis})`,
        }}
      >
        {/* Overlay Text for Large Screens */}
        <div className="absolute inset-0 flex flex-col justify-center items-center lg:items-start p-4 lg:top-5 lg:left-5 text-center lg:text-left lg:flex hidden">
          <h2 className="text-[2.5rem] md:text-[2.9rem] font-bold text-[#a5cc44] mb-4">
            Our Mission
          </h2>
          <p className="w-full lg:w-[60%] text-[#333] font-normal mb-0 text-[1.5rem] md:text-[1.625rem] leading-[2.5rem] md:leading-[2.625rem]">
            is to make a positive difference in the lives of our children, their families, and the communities we serve.
          </p>
        </div>
      </div>
    </div>
    <div className="col-span-1 flex flex-col justify-center items-center p-4 lg:hidden">
      <h2 className="text-[2.5rem] md:text-[2.9rem] font-bold text-[#a5cc44] mb-4">
        Our Mission
      </h2>
      <p className="w-full lg:w-[60%] text-center text-[#333] font-normal mb-0 text-[1.5rem] md:text-[1.625rem] leading-[2.5rem] md:leading-[2.625rem]">
        is to make a positive difference in the lives of our children, their families, and the communities we serve.
      </p>
    </div>
    {/* Image Section for Small Screens */}
    <div className="col-span-1 flex justify-center items-center lg:hidden">
      <img src={mis1} alt="Mission Image" className="w-full h-auto max-w-full" />
    </div>

    {/* Text Section for Small Screens */}
  

    {/* Image Section for Large Screens */}
    <div className="col-span-1 hidden lg:flex justify-center items-center">
      <img src={mis1} alt="Mission Image" className="w-full h-auto max-w-full" />
    </div>
  </div>
</section>
    )
}