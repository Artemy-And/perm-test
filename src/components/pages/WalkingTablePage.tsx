import React, {useCallback, useEffect, useState} from 'react';
import style from './table.module.css';
import {useDispatch, useSelector} from "react-redux";
import {
    DataType,
    getListOfWalkings, getWalking,
    sortWalkingsByDate,
    sortWalkingsByDistance
} from "../../features/table-reducer/table-reducer";
import {AppRootStateType} from "../../app/store";
import sortBtnDisable from '../../common/img/sortBtn--disabled.svg';
import sortBtnActive from '../../common/img/vector.svg';

type PropsType = {
    clearInputs: () => void
}
export const WalkingTablePage: React.FC<PropsType> = ({clearInputs}) => {
    const [disableButtonDate, setDisableButtonDate] = useState(false)
    const [disableButtonDist, setDisableButtonDist] = useState(false)
    const dispatch = useDispatch()
    const state = useSelector<AppRootStateType, Array<DataType>>((state) => state.table.arrayWalkings);

    useEffect(() => {
        dispatch(getListOfWalkings())
    }, [])

    ////сортировка таблицы
    const OnHandleSort = useCallback((boolDate: boolean, boolDist: boolean, sortAC: Function) => {
        setDisableButtonDate(boolDate)
        setDisableButtonDist(boolDist)
        return dispatch(sortAC())
    },[dispatch])

    var days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ];

    function generateDayOfWeek(date: string) {
        var d = new Date(date);
        var n = d.getDay();
        return days[n]
    }

    return (
        <div className={style.scrollTable}>
            <table>
                <thead>
                <tr>
                    <th
                        onClick={()=>OnHandleSort(true, false, sortWalkingsByDate)}
                    >Дата <span className={style.vector}> <img
                        src={disableButtonDate ? sortBtnDisable : sortBtnActive}/></span></th>
                    <th className={style.rightHeader}
                        onClick={()=>OnHandleSort(false,true,sortWalkingsByDistance)}
                    >Дистанция
                        <span className={style.vector}> <img
                            src={disableButtonDist ? sortBtnDisable : sortBtnActive}/></span>
                    </th>
                </tr>
                </thead>
            </table>
            <div className={style.scrollTableBody}>
                <table>
                    <tbody>
                    {state.map((e, index) => {
                        let pureKm = e.distance / 1000
                        let metrNumber
                        if (Number(pureKm) === pureKm && pureKm % 1 !== 0 && Number(pureKm)) {
                            let mettter = (pureKm - parseInt(pureKm.toString())).toFixed(2).slice(2)
                            metrNumber = Number(mettter) * 10
                        }
                        return (
                            <tr key={e.id} onClick={() => {
                                dispatch(getWalking(e.id))

                            }}>
                                <td className={style.leftInfo}>
                                    <span className={style.weekDay}>{generateDayOfWeek(e.date)}</span>
                                    {e.date}
                                </td>
                                {Number(pureKm) === pureKm && pureKm % 1 !== 0 && Number(pureKm) && metrNumber !== 0
                                    ?
                                    <td className={style.rightInfo}>{~~pureKm + ' километр ' + metrNumber + " метров"}</td>
                                    :
                                    <td className={style.rightInfo}>{~~pureKm + ' километр '}</td>
                                }

                            </tr>
                        )
                    })}

                    </tbody>
                </table>

            </div>
            <button className={style.addWalking} onClick={clearInputs}>Добавить запись
            </button>
        </div>

    )
}