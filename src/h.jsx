import React, { useEffect, useRef, useState } from 'react'
import { Button } from "./components/ui/button"
import { evaluate } from "mathjs"
import { History } from 'lucide-react';

function H() {
    const [equation, setEquation] = useState([])
    const [history, setHistory] = useState([])
    const [result, setResult] = useState({})
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    function handleClick(e) {
        const { value } = e.target
        if (value == "CA") {
            setEquation([])
            setHistory([])
        } else if (value == "-/+") {
            setEquation(prev => {
                return prev[0] === '-' ? prev.slice(1) : ['-', ...prev]
            })
        } else if (value == "C" || value == "c") {
            setEquation([])
        } else if (value == "<" || value == "Backspace") {
            setEquation(e => e.slice(0, -1))
        } else if (value == "=" || value == "Enter") {
            const symbol = ['+', '-', '/', '*']
            if (equation.some((e) => symbol.includes(e))) {
                calc()
            }
        }
        else if (!equation.includes('Error')) {
            setEquation((e) => ([...e, value]))
        }
    }

    function calc() {
        const eq = equation.join('')
        try {
            setEquation([evaluate(eq).toString()])
            setResult((e) => ({ ...e, "old": equation, "result": evaluate(eq).toString() }))
            // setHistory([...history, { "old": equation, "result": evaluate(eq).toString() }])
        }
        catch (errors) {
            setEquation(null)
            setEquation(["Error"])
        }
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = { target: { value: e.key } }
            if (!equation.includes("Error")) {
                if (e.key >= 0 && e.key <= 9) {
                    handleClick(key)
                } else if (["+", "/", "-", "=", "*", "Enter", "<", "Backspace", "."].includes(e.key)) {
                    handleClick(key)
                }
            }
            if (e.key == "c" || e.key == "C") {
                handleClick(key)
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        ref.current.scrollTo(ref.current.scrollWidth, 0)
        return () => window.removeEventListener("keydown", handleKeyDown)

    }, [equation])

    return (
        <div className="min-h-screen flex justify-center">
            <div className="flex flex-col gap-5 h-auto w-full items-center p-5 bg-black relative">
                <div data-historyTab={open ? "open" : "close"} className="data-[historyTab=close]:hidden bg-black/50 absolute top-20 w-full h-130 text-start text-amber-50" >
                    <div className="flex flex-col overflow-auto h-full">
                        {history.map((h, index) => (
                            <div key={index}>
                                {h.old} = {h.result}
                            </div>
                        ))}
                    </div>
                </div>
                <div ref={ref} className="bg-gray-500 w-full text-7xl text-end overflow-auto max-w-[100%] text-popover h-[20vh]">
                    <div data-state={equation.length > 0 ? "hasData" : "none"} className='absolute data-[state=hasData]:opacity-50' onClick={() => setOpen(!open)}>
                        <History className='size-15' />
                    </div>
                    <div>
                        {equation}
                    </div>
                </div>
                <div className="flex-1 bg-white p-1 w-full h-auto flex gap-1">
                    <div className="flex flex-col gap-1 justify-center h-auto w-[80%]">
                        <div className="w-full h-1/2 flex gap-1">
                            <Button onClick={handleClick} value="CA" className="w-1/2 flex-1 h-full text-popover text-4xl">CA</Button>
                            <Button onClick={handleClick} value="C" className="w-1/2 flex-1 h-full text-popover text-4xl">C</Button>
                            <Button onClick={handleClick} value="/" className="w-1/2 flex-1 h-full text-popover text-4xl">/</Button>
                        </div>
                        <div className="w-full h-1/2 flex gap-1">
                            <Button onClick={handleClick} value="7" className="w-1/2 flex-1 h-full text-popover text-4xl">7</Button>
                            <Button onClick={handleClick} value="8" className="w-1/2 flex-1 h-full text-popover text-4xl">8</Button>
                            <Button onClick={handleClick} value="9" className="w-1/2 flex-1 h-full text-popover text-4xl">9</Button>
                        </div>
                        <div className="w-full h-1/2 flex gap-1">
                            <Button onClick={handleClick} value="4" className="w-1/2 flex-1 h-full text-popover text-4xl">4</Button>
                            <Button onClick={handleClick} value="5" className="w-1/2 flex-1 h-full text-popover text-4xl">5</Button>
                            <Button onClick={handleClick} value="6" className="w-1/2 flex-1 h-full text-popover text-4xl">6</Button>
                        </div>
                        <div className="w-full h-1/2 flex gap-1">
                            <Button onClick={handleClick} value="1" className="w-1/2 flex-1 h-full text-popover text-4xl">1</Button>
                            <Button onClick={handleClick} value="2" className="w-1/2 flex-1 h-full text-popover text-4xl">2</Button>
                            <Button onClick={handleClick} value="3" className="w-1/2 flex-1 h-full text-popover text-4xl">3</Button>
                        </div>
                        <div className="w-full h-1/2 flex gap-1">
                            <Button onClick={handleClick} value="-/+" className="w-1/2 flex-1 h-full text-popover text-4xl">-/+</Button>
                            <Button onClick={handleClick} value="0" className="w-1/2 flex-1 h-full text-popover text-4xl">0</Button>
                            <Button onClick={handleClick} value="." className="w-1/2 flex-1 h-full text-popover text-4xl">.</Button>
                        </div>
                    </div>
                    <div className="h-auto gap-1 flex flex-col flex-1 w-[20%]">
                        <Button onClick={handleClick} value="<" className="w-full flex-1 h-full text-popover text-4xl">{"<"}</Button>
                        <Button onClick={handleClick} value="*" className="w-full flex-1 h-full text-popover text-4xl">*</Button>
                        <Button onClick={handleClick} value="-" className="w-full flex-1 h-full text-popover text-4xl">-</Button>
                        <Button onClick={handleClick} value="+" className="w-full flex-1 h-full text-popover text-4xl">+</Button>
                        <Button onClick={handleClick} value="=" className="w-full flex-1 h-full bg-cyan-500 text-white hover:bg-cyan-500/70 text-4xl">=</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default H
