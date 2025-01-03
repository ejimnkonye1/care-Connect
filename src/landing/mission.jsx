
import mis from '../images/mission.svg'
import mis1 from '../images/mission.png'
export const Mission = () => {

    return(
<section id="Our mission" className="mb-4 py-10 px-4">
  <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4">
    {/* Background Image and Text Container */}
    <div className="relative col-span-1">
      <div className="relative h-full">
        <div
          className="absolute h-full w-full bg-cover bg-no-repeat lg:top-5 lg:left-[120px] top-0 left-0"
          style={{
            backgroundImage: `url(${mis})`,
          }}
        ></div>
        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center lg:items-start p-4 lg:top-[-100px] lg:left-[20px] text-center lg:text-left">
          <h2 className="text-[2.9rem] font-bold text-[#a5cc44] mb-4">
            Our Mission
          </h2>
          <p className="w-full lg:w-[60%] text-[#333] font-normal mb-0 text-[1.625rem] leading-[2.625rem]">
            is to make a positive difference in the lives of our children, their families, and the communities we serve.
          </p>
        </div>
      </div>
    </div>

    {/* Image Section */}
    <div className="col-span-1 flex justify-center items-center">
      <img src={mis1} alt="Mission Image" className="w-full h-auto" />
    </div>
  </div>
</section>

    )
}