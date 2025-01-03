/* eslint-disable react/no-unescaped-entities */
import c1 from '../assets/c1.jpg'
import c2 from '../assets/c2.jpg'
import c3 from '../assets/c3.jpg'

export const Testimonial = () => {
    return(
<section id="testimonials" className="mb-4 py-3 p-10">
  <h2 className="text-center mb-10 mt-10 text-[2.5rem] font-[700] text-[#00adef]">Testimonials</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Testimonial 1 */}
    <div className="bg-white rounded-lg shadow-lg p-6">
      <img src={c1} alt="stories1" className="w-full h-48 object-cover rounded-t-lg" />
      <div className="testimonial-body mt-4">
        <blockquote>
          <p className="text-[#333] font-normal text-[1.125rem] leading-[1.925rem]">
            CareConnect has been a game-changer for our family. We can finally stay connected with our child's caregivers and receive updates in real-time.
          </p>
          <cite className="block mt-2 text-[#f7b45d] text-center">— Sarah P., Happy Parent</cite>
        </blockquote>
      </div>
    </div>

    {/* Testimonial 2 */}
    <div className="bg-white rounded-lg shadow-lg p-6">
      <img src={c2} alt="stories2" className="w-full h-48 object-cover rounded-t-lg" />
      <div className="testimonial-body mt-4">
        <blockquote>
          <p className="text-[#333] font-normal text-[1.125rem] leading-[1.925rem]">
            CareConnect has streamlined our communication with parents and made it easier to provide high-quality care for our children.
          </p>
          <cite className="block mt-2 text-[#f7b45d] text-center">— John D., Caregiver</cite>
        </blockquote>
      </div>
    </div>

    {/* Testimonial 3 */}
    <div className="bg-white rounded-lg shadow-lg p-6">
      <img src={c3} alt="stories3" className="w-full h-48 object-cover rounded-t-lg" />
      <div className="testimonial-body mt-4">
        <blockquote>
          <p className="text-[#333] font-normal text-[1.125rem] leading-[1.925rem]">
            CareConnect has streamlined our communication with parents and made it easier to provide high-quality care for our children.
          </p>
          <cite className="block mt-2 text-[#f7b45d] text-center">— John D., Caregiver</cite>
        </blockquote>
      </div>
    </div>
  </div>
</section>
    )
}