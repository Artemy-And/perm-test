import * as React from "react";
import {TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";
import style from './newWalking.module.css';
import {addWalking} from "../features/table-reducer/table-reducer";

type PropsType = {
    date: string
    setDate: Function
    metrs: string|number
    setMetrs: Function
    kilometrs: string|number
    setKilomets: Function
    amountMetrs:number
}

export const NewWalking: React.FC<PropsType> = ({date,setDate,metrs,setMetrs,kilometrs,setKilomets,amountMetrs}) => {
    const dispatch = useDispatch()

    return (
        <div className={style.container}>
            <div className={style.body}>
                <form className={style.form} noValidate>
                    <TextField
                        className={style.textField}
                        value={date}
                        id="date"
                        label="Birthday"
                        type="date"
                        defaultValue="2017-05-24"
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
                        label="kilometers"
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
                dispatch(addWalking(date, amountMetrs))

            }}>Добавить запись
            </button>
        </div>

    )
}