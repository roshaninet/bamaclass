import ContainerContent from "../Layout/ContainerContent";
import {useEffect, useState} from "react";
import Link from "next/link";
import {Spinner} from "react-bootstrap";

const Dashboard = () => {
    const [counts, setCounts] = useState({
        curses: 0,
        users: 0,
        teachers: 0
    });
    const [loader, setLoader] = useState(false);

    useEffect(() => {
    }, [])


    return (
        <ContainerContent title='داشبورد'>
            <div className='row'>
                <div className='col-12 col-md-4'>
                    <Link href={'/admin448/departments'}>

                        <div className='w-100 bg-white rounded my-2 p-3'>
                            <span className='d-block text-center font-18'>کاربران فعال</span>
                            <span className='d-block text-center mt-3 font-36 tahoma'>
                                {
                                    loader ? <Spinner animation="border" size={"md"}/> :
                                        <span>{counts.users}</span>
                                }
                            </span>
                        </div>

                    </Link>
                </div>
                <div className='col-12 col-md-4'>
                    <Link href={'/admin448/rooms'}>

                        <div className='w-100 bg-warning rounded my-2 p-3'>
                            <span className='d-block text-center font-18'>دوره های فعال</span>
                            <span className='d-block text-center mt-3 font-36 tahoma'>
                                {
                                    loader ? <Spinner animation="border" size={"md"}/> :
                                        <span>{counts.curses}</span>
                                }
                            </span>
                        </div>

                    </Link>
                </div>
                <div className='col-12 col-md-4'>
                    <Link href={'/admin448/orders'}>

                        <div className='w-100 bg-dark text-light rounded my-2 p-3'>
                            <span className='d-block text-center font-18'>اساتید فعال</span>
                            <span className='d-block text-center mt-3 font-36 tahoma'>
                                  {
                                      loader ? <Spinner animation="border" size={"md"}/> :
                                          <span>{counts.teachers}</span>
                                  }
                            </span>
                        </div>

                    </Link>
                </div>
            </div>
        </ContainerContent>
    );
}


export default Dashboard;