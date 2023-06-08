import ImageElement from "@/components/Tools/ImageElement";
import Logo from "@/public/img/logo/logo-dark.png"
import SoonSlider from "@/components/Pages/Soon/SoonSlider";
import Countdown from "@/components/Pages/Soon/Countdown";
import AboutData from "@/lib/Data/AboutData";

const SoonPage = () => {
    const targetDate = new Date("2023-07-21T00:00:00Z").getTime();

    return (
        <div className='container-xl py-4'>
            <div className="row">
                <div className='col-12 text-center'>
                    <ImageElement
                        lazy={false}
                        quality={60}
                        width={300}
                        objectFit={'contain'}
                        className="img-responsive h-100 px-md-0"
                        image={Logo}
                        title={AboutData.title}/>
                </div>

                <div className='w-100 text-center my-3'>
                    <h1 className='font-18 fw-bold my-3'>پرلایک |  پلتفرم آموزش الکترونیکی ترکیبی (EBL)</h1>
                </div>

                <div className='col-12 col-md-9 mx-auto'>
                    <SoonSlider/>
                </div>

                <div className='col-12 col-md-9 mx-auto my-3 text-center'>
                    <Countdown targetDate={targetDate}/>
                </div>

                <div className='w-100 text-center'>
                    <h1 className='font-18 fw-bold my-3'>به زودی ...</h1>
                </div>


            </div>
        </div>
    )
}

export default SoonPage;