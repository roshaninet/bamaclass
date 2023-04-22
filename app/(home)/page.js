import Logo from "@/public/img/logo-dark.webp"
import ImageElement from "@/lib/Common/ImageElement";
import Slider from "@/app/(home)/Slider";
import Countdown from "@/lib/Common/Countdown";

export const metadata = {
    title: "کلاس آنلاین آموزش درسی | باماکلاس",
    description: " کلاس آنلاین آموزش درسی پیش دبستانی، دبستان، متوسطه اول، متوسطه دوم و کنکور با باماکلاس | آموزش آنلاین درسی",
    alternates: {
        canonical: "/"
    }
};

export default async function Home() {
    const targetDate = new Date("2023-07-22T00:00:00Z").getTime();

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
                        title="گروه مشاورین املاک دلاوران"/>
                </div>

                <div className='w-100 text-center my-3'>
                    <h1 className='font-18 fw-bold my-3'>باماکلاس | بزرگترین پلتفرم آموزش آنلاین درسی</h1>
                </div>

                <div className='col-12 col-md-9 mx-auto'>
                    <Slider />
                </div>

                <div className='col-12 col-md-9 mx-auto my-3 text-center'>
                    <Countdown targetDate={targetDate} />
                </div>

                <div className='w-100 text-center'>
                    <h1 className='font-18 fw-bold my-3'>به زودی ...</h1>
                </div>


            </div>
        </div>
    )
}