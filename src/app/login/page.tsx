'use client'
import {useAppDispatch, useAppSelector} from '@/lib/store'
import {increment, decrement} from '@/lib/features/counterSlice'
export default function Page () {

    // const count = useAppSelector((state) => state.counter.value);

    const dispatch = useAppDispatch()
    return (
        <div className="mt-[90px]">
            {/* <h1>Count: {count}</h1> */}
            {/* <button onClick={() => dispatch(increment())}>Increment</button> */}
            {/* <button onClick={() => dispatch(decrement())}>Decrement</button> */}
        </div>
    )
}