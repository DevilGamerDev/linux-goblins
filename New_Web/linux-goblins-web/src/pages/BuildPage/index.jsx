import React from "react";
import { NavBar } from '../../components';
import "./index.css"
import "./asset1.css"
import ReactRotatingText from 'react-rotating-text';

const styles = {
    padding: {
        padding: "1px"
    },
}


export function BuildPage(props) {

    const TEXTS = [" Budget.", " Build.", " Beauty."];

    return(
        <html>
            <NavBar />
            <body>
                <div className="main">
                    <div className="flex justify-start items-center flex-col text-center px-10">
                        <h2 className="text-2xl text-neutral-500 font-bold tracking-normal mt-32 bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-400">Build with confidence.</h2>
                        <h1 className="text-8xl font-bold mt-8 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400" style={styles.padding}>Create A 
                            <ReactRotatingText className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-purple-500" items={TEXTS} cursor={false} />
                        </h1>
                        
                        
                        <h2 className="w-4/12 text-xl leading-8 text-neutral-500 tracking-wide mt-10">Linux Goblin is the #1 leading tool to build a beauty on a budget.</h2>
                        <div className="mt-14 flex">
                            <a className="text-white relative mx-3 rounded-lg z-1 bg-gradient-to-r from-neutral-200 to-neutral-300" href="https://discord.gg/TMzFhz4cyB" target="_blank"  rel="noopener noreferrer">
                                <div className="flex tracking-wide text-sm justify-center z-1 rounded-lg items-center bg-gradient-to-r from-neutral-950 to-neutral-750 text-black w-full h-full px-8 py-2.5 relative hover:bg-transparent hover:text-neutral-950">
                                Join our Discord
                                </div>
                            </a>
                            <a className="text-white relative mx-3 rounded-lg z-1 bg-gradient-to-r from-green-500 to-purple-500" href="/build" style={styles.padding}>
                                <div className="flex tracking-wide text-sm justify-center z-1 rounded-lg items-center bg-neutral-950 w-full h-full px-8 py-2.5 relative hover:bg-transparent hover:text-neutral-950">Build a PC
                                </div>
                            </a>
                        </div>
                    </div>                
                </div>
            </body>
        </html>
    )
}