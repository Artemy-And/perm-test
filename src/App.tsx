import React, {useState} from 'react';
import '../App.css';
import {WalkingTablePage} from "../components/pages/WalkingTablePage";
import {HashRouter, Route} from "react-router-dom";
import {DataType, removeWalking} from "../features/table-reducer/table-reducer";
import {NewWalkingPage} from "../components/pages/NewWalkingPage";
import {EditWalkingPage} from "../components/pages/EditWalkingPage";
import {useDispatch} from "react-redux";


function App() {
    const dispatch = useDispatch()

    const [date, setDate] = useState('')
    const [metrs, setMetrs] = useState<string | number>('')
    const [kilometrs, setKilomets] = useState<string | number>('')

    let amountMetrs = (Number(kilometrs) * 1000) + Number(metrs)

     const clearInputs=()=>{
         setDate('')
         setMetrs('')
         setKilomets('')
         window.location.hash = "#/newWalking"
     }
    function converterDistance(fullKm: any) {
        let pureKm = fullKm / 1000
        ///эта возвращает местры и километры
        if (Number(pureKm) === pureKm && pureKm % 1 !== 0 && Number(pureKm)) {
            let mettter = (pureKm - parseInt(pureKm.toString())).toFixed(2).slice(2)
            let metrNumber = Number(mettter) * 10
            if (~~pureKm !== 0 && Number(mettter) !== 0) {
                console.log("это километр новый " + ~~pureKm)
                console.log("это метр новый " + metrNumber);
                setKilomets(~~pureKm)
                setMetrs(metrNumber)
            }
        } else if (Number(pureKm) === pureKm && pureKm % 1 === 0) {
            console.log("это километр " + pureKm)
            setKilomets(pureKm)
        } else return 1

    }

    const onDelete = (id: number) => {
        dispatch(removeWalking(id))
    }

    return (
        <HashRouter>
            <div>
                <Route path={'/table'} render={() => <WalkingTablePage clearInputs={clearInputs}/>}/>
                <Route path={'/newWalking'} render={() => <NewWalkingPage date={date}
                                                                          setDate={setDate}
                                                                          metrs={metrs}
                                                                          setMetrs={setMetrs}
                                                                          kilometrs={kilometrs}
                                                                          setKilomets={setKilomets}
                                                                          amountMetrs={amountMetrs}

                />}/>
                <Route path={'/editWalking'} render={() => <EditWalkingPage date={date}
                                                                            setDate={setDate}
                                                                            metrs={metrs}
                                                                            setMetrs={setMetrs}
                                                                            kilometrs={kilometrs}
                                                                            setKilomets={setKilomets}
                                                                            amountMetrs={amountMetrs}
                                                                            converterDistance={converterDistance}
                                                                            onDelete={onDelete}
                />}/>
            </div>
        </HashRouter>
    );
}

export default App;
