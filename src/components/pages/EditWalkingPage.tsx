import * as React from "react";
import {useEffect} from "react";
import {TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import style from './newWalking.module.css';
import {DataType, updateWalking} from "../features/table-reducer/table-reducer";
import {AppRootStateType} from "../app/store";

type PropsType = {
    date: string
    setDate: Function
    metrs: string|number
    setMetrs: Function
    kilometrs: string|number
    setKilomets: Function
    amountMetrs:number
    converterDistance:(distance:any)=>void
    onDelete:Function
}

export const EditWalkingPage: React.FC<PropsType> = ({date,setDate,metrs,setMetrs,kilometrs,setKilomets,amountMetrs,converterDistance,onDelete}) => {
    const dispatch = useDispatch()
    const editState = useSelector<AppRootStateType, DataType>((state) => state.table.editWalking);

    useEffect(()=>{
        setDate(editState.date)
        converterDistance(editState.distance);
    },[])


    return (
        <div className={style.container}>
            <div className={style.body}>
                <form className={style.form} noValidate>
                    <TextField
                        className={style.textField}
                        value={date}
                        id="date"
                        label=""
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => {
                            setDate(e.currentTarget.value)
                        }}
                    />
                    <TextField
                        className={style.textField}
                        type='number'
                        value={kilometrs}
                        id="kilometers"
                        label="Kilometrs"
                        onChange={(e) => {
                            setKilomets(e.currentTarget.value)
                        }}
                    />
                    <TextField
                        className={style.textField}
                        type='number'
                        value={metrs}
                        id="meters"
                        label="meters"
                        onChange={(e) => {
                            setMetrs(e.currentTarget.value)
                        }}
                    />
                </form>
            </div>
            <button className={style.addWalking} onClick={() => {
                dispatch(updateWalking(editState.id,date, amountMetrs))
            }}>Добавить запись
            </button>
            <button className={style.deleteWalking} onClick={() => {
                onDelete(editState.id)
            }}>Удалить
            </button>
        </div>

    )
}