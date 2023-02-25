import React, {useState} from "react";
import {FaRegCopy} from "react-icons/fa";
import CheckBox from "@/components/CheckBox";
import CheckableValues from "@/types/CheckableValues";

const passwordStrengthString = ["Unavailable", "Pathetic", "Weak", "Medium", "Strong", "Superior", "Incredible", "Godlike"]

const uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const symbols = ["!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"]

export default function Home() {
    const [password, setPassword] = useState("P4$SW0rD!")
    const [passwordLength, setPasswordLength] = useState(16)
    const [checkedValues, setCheckedValues] = useState<CheckableValues>({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: false,
    })

    const toggleUppercase = () => setCheckedValues({...checkedValues, uppercase: !checkedValues.uppercase})
    const toggleLowercase = () => setCheckedValues({...checkedValues, lowercase: !checkedValues.lowercase})
    const toggleNumbers = () => setCheckedValues({...checkedValues, numbers: !checkedValues.numbers})
    const toggleSymbols = () => setCheckedValues({...checkedValues, symbols: !checkedValues.symbols})


    let complexity = 0
    Object.values(checkedValues).forEach(value => complexity += (value ? 1 : 0))
    const passwordStrength = Math.ceil((passwordLength * 10) * (complexity) / 144 * 7 / 10 - 0.01)

    const copyPassword = () => {
        navigator.clipboard.writeText(password)
        alert("The password was copied to your clipboard - don't forget to save it somewhere safe.")
    }
    const generatePassword = () => {
        let characters: (string | number)[] = []
        let newPassword = ""

        if (checkedValues.uppercase) characters = [...characters, ...uppercase]
        if (checkedValues.lowercase) characters = [...characters, ...lowercase]
        if (checkedValues.numbers) characters = [...characters, ...numbers]
        if (checkedValues.symbols) characters = [...characters, ...symbols]

        if (characters.length === 0) {
            alert("You have to check at least one of the boxes.")
            return
        }

        for (let i = 0; i < passwordLength; i++) {
            const index = Math.floor((Math.random() * characters.length))
            newPassword += characters[index]
        }

        setPassword(newPassword)
    }

    return (
        <main
            className={"font-mono min-h-screen w-screen bg-stone-900 flex items-center justify-center p-6 text-gray-50"}>
            <div className={"w-full max-w-lg text-center flex flex-col gap-6"}>
                <h1 className={"text-xl font-semibold"}>Password Generator</h1>

                <div className={"flex items-center justify-between gap-6 bg-stone-800 shadow px-8 py-6 overflow-hidden"}>
                    <p className={"text-xl font-semibold opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis"}>{password}</p>
                    <FaRegCopy onClick={copyPassword} className={"text-xl cursor-pointer hover:text-green-400 z-20 relative shrink-0"}/>
                </div>

                <div className={"bg-stone-800 shadow px-8 py-6 flex flex-col gap-8"}>
                    <div>
                        <div className={"flex items-center justify-between"}>
                            <p className={"font-semibold"}>Characters</p>
                            <p className={"text-2xl font-bold text-green-400"}>{passwordLength}</p>
                        </div>

                        <input onChange={(event) => setPasswordLength(parseInt(event.target.value))} type="range"
                               min={1} max={36} value={passwordLength}
                               className="mt-8 w-full h-2 rounded-lg appearance-none cursor-pointer bg-stone-900"/>
                    </div>


                    <CheckBox label={"Include uppercase letters"} checked={checkedValues.uppercase}
                              handleClick={toggleUppercase}/>
                    <CheckBox label={"Include lowercase letters"} checked={checkedValues.lowercase}
                              handleClick={toggleLowercase}/>
                    <CheckBox label={"Include numbers"} checked={checkedValues.numbers}
                              handleClick={toggleNumbers}/>
                    <CheckBox label={"Include symbols"} checked={checkedValues.symbols}
                              handleClick={toggleSymbols}/>

                    <div className={"bg-stone-900 p-6 flex justify-between uppercase text-lg font-semibold"}>
                        <p className={"opacity-75"}>Strength</p>

                        <div className={"flex items-center gap-2"}>
                            <p className={"mr-1"}>{passwordStrengthString[passwordStrength]}</p>

                            {/*<div className={"w-2 bg-yellow-600 h-full"}></div>*/}
                            {/*<div className={"w-2 bg-yellow-600 h-full"}></div>*/}
                            {/*<div className={"w-2 bg-yellow-600 h-full"}></div>*/}
                            {/*<div className={"w-2 border-2 opacity-75 h-full"}></div>*/}
                        </div>
                    </div>

                    <div onClick={generatePassword}
                         className={"bg-green-400 cursor-pointer px-4 py-4 text-stone-800 font-bold text-lg border-2 border-green-400 hover:bg-stone-800 hover:text-green-400"}>
                        <p>Generate Password</p>
                    </div>
                </div>
            </div>
        </main>
);
}