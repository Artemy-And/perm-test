import * as React from "react";
import {useEffect} from "react";
import {TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import style from './newWalking.module.css';
import {DataType, updateWalking} from "../../features/table-reducer/table-reducer";
import {AppRootStateType} from "../../app/store";
import {WalkingType} from "../../App";

type PropsType = {
    walking: WalkingType
    setWalking: Function
    amountMetrs: number
    converterDistance: (distance: any) => void
    onDelete: (id: number) => void
}

export const EditWalkingPage: React.FC<PropsType> = ({ walking,setWalking,amountMetrs,converterDistance,onDelete}) => {
    const dispatch = useDispatch()
    const editState = useSelector<AppRootStateType, DataType>((state) => state.table.editWalking);

    useEffect(() => {
        setWalking((e: WalkingType) => ({
            ...e,
            date: editState.date
        }))
        converterDistance(editState.distance)
    }, [])


    return (
        <div className={style.container}>
            <div className={style.body}>
                <form className={style.form} noValidate>
                    <TextField
                        className={style.textField}
                        value={walking.date}
                        id="date"
                        label=""
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => {
                            setWalking((el: WalkingType) => ({
                                ...el,
                                date: e.target.value,
                            }))
                        }}
                    />
                    <TextField
                        className={style.textField}
                        type='number'
                        value={walking.kilometers}
                        id="kilometers"
                        label="Kilometrs"
                        onChange={(e) => {
                            setWalking((el: WalkingType) => ({
                                ...el,
                                kilometers: e.target.value,
                            }))
                        }}
                            />
                            <TextField
                            className={style.textField}
                            type='number'
                            value={walking.meters}
                            id="meters"
                            label="meters"
                            onChange={(e) => {
                            setWalking((el:WalkingType)=>({
                            ...el,
                            meters:e.target.value,
                        }))
                        }}
                            />
                            </form>
                            </div>
                            <button className={style.addWalking} onClick={() => {
                            dispatch(updateWalking(editState.id,walking.date, amountMetrs))
                        }}>Добавить запись
                            </button>
                            <button className={style.deleteWalking} onClick={() => {
                            onDelete(editState.id)
                        }}>Удалить
                            </button>
                            </div>
                            )
                            }