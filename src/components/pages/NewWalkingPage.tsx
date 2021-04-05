import * as React from "react";
import {TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";
import style from './newWalking.module.css';
import {addWalking} from "../../features/table-reducer/table-reducer";
import {WalkingType} from "../../App";

type PropsType = {
    walking:WalkingType
    setWalking:Function
    amountMetrs:number
}

export const NewWalkingPage: React.FC<PropsType> = ({walking,setWalking,amountMetrs}) => {
    const dispatch = useDispatch()

    return (
        <div className={style.container}>
            <div className={style.body}>
                <form className={style.form} noValidate>
                    <TextField
                        className={style.textField}
                        value={walking.date}
                        id="date"
                        label="Birthday"
                        type="date"
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => {
                            setWalking((el:WalkingType)=>({
                                ...el,
                                date:e.target.value,
                            }))
                        }}
                    />
                    <TextField
                        className={style.textField}
                        type='number'
                        value={walking.kilometers}
                        id="kilometers"
                        label="kilometers"
                        onChange={(e) => {
                            setWalking((el:WalkingType)=>({
                                ...el,
                                kilometers:e.target.value,
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
                dispatch(addWalking(walking.date, amountMetrs))
            }}>Добавить запись
            </button>
        </div>

    )
}