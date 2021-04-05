import React, {useEffect, useState} from 'react';
import './App.css';
import {WalkingTablePage} from "./components/pages/WalkingTablePage";
import {HashRouter, Route} from "react-router-dom";
import {removeWalking} from "./features/table-reducer/table-reducer";
import {NewWalkingPage} from "./components/pages/NewWalkingPage";
import {EditWalkingPage} from "./components/pages/EditWalkingPage";
import {useDispatch} from "react-redux";

export type WalkingType = {
    date:string,
    kilometers:string | number,
    meters:string | number
}

function App() {
    const dispatch = useDispatch()

    const [walking,setWalking]=useState<WalkingType>({
        date:'',
        kilometers:'',
        meters:''
    })

    let amountMetrs = (Number(walking.kilometers) * 1000) + Number(walking.meters)
    useEffect(() => {
        window.location.hash = "#/table"
    }, [])
    const clearInputs = () => {
        setWalking((e)=>({
            date:'',
            kilometers:'',
            meters:''
        }))
        window.location.hash = "#/newWalking"
    }

    const converterDistance = (fullKm: number) => {
        let pureKm = fullKm / 1000
        if (Number(pureKm) === pureKm && pureKm % 1 !== 0 && Number(pureKm)) {
            let mettter = (pureKm - parseInt(pureKm.toString())).toFixed(2).slice(2)
            let metrNumber = Number(mettter) * 10
            if (~~pureKm !== 0 && Number(mettter) !== 0) {
                // setKilometers(~~pureKm)
                // setMeters(metrNumber)
                setWalking((e)=>({
                    ...e,
                    kilometers:~~pureKm,
                    meters:metrNumber
                }))
            }
        } else if (Number(pureKm) === pureKm && pureKm % 1 === 0) {
            // setKilometers(pureKm)
            setWalking((e)=>({
                ...e,
                kilometers:pureKm,
            }))

        } else return 1

    }

    const onDelete = (id: number) => {
        dispatch(removeWalking(id))
    }

    return (
        <HashRouter>
            <div className='container'>
                <div className='header'>
                    <h1>Шагомер на тестовое задание</h1>
                </div>
                <div className='body'>
                    <div className='main'>
                        <Route path={'/table'} render={() => <WalkingTablePage clearInputs={clearInputs}/>}/>
                        <Route path={'/newWalking'} render={() => <NewWalkingPage walking={walking} setWalking={setWalking}
                            // date={date}
                                                                                  // setDate={setDate}
                                                                                  // metrs={meters}
                                                                                  // setMetrs={setMeters}
                                                                                  // kilometrs={kilometers}
                                                                                  // setKilomets={setKilometers}
                                                                                  amountMetrs={amountMetrs}
                        />}/>
                        <Route path={'/editWalking'} render={() => <EditWalkingPage walking={walking} setWalking={setWalking}

                            // date={date}
                            //                                                         setDate={setDate}
                            //                                                         metrs={meters}
                            //                                                         setMetrs={setMeters}
                            //                                                         kilometrs={kilometers}
                            //                                                         setKilomets={setKilometers}
                                                                                    amountMetrs={amountMetrs}
                                                                                    converterDistance={converterDistance}
                                                                                    onDelete={onDelete}
                        />}/>
                    </div>

                    <div className='graph'>

                    </div>
                </div>


            </div>
        </HashRouter>
    );
}

export default App;
