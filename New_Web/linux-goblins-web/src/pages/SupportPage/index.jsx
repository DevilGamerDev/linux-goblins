import React from "react";
import { NavBar } from '../../components';
import "./index.css"
//import "./asset1.css"
import TextTransition, { presets } from 'react-text-transition';


const styles = {
    font: {
        fontfamily: "Inter, monospace"
    },
    animation: {
        animation: "blink1 3s linear infinite"
    },
    padding: {
        padding: "1px"
    }
}



export function SupportPage(props) {

    const TEXTS = ["Budget.", "Build.", "Beauty."];

    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
      const intervalId = setInterval(
        () => setIndex((index) => index + 1),
        3000, // every 3 seconds
      );
      return () => clearTimeout(intervalId);
    }, []);

    return(
        <html>
            <NavBar />
            <body>
                <div class="main">
                    <div class="pt-24 flex justify-start items-center flex-col text-center px-10">
                        <h2 class="text-2xl text-neutral-500 font-bold tracking-normal mt-32 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400">Build with confidence.</h2>
                        <h1 class="text-8xl w-11/12 tracking-tighter font-extrabold mt-8 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400" style={styles.font}>Create A
                            <span class="divider"></span> 
                            <TextTransition className="bg-clip-text pr-0.5 tracking-tighter text-transparent bg-gradient-to-r from-green-500 to-purple-500"
                                springConfig={presets.gentle}>{TEXTS[index % TEXTS.length]}</TextTransition>
            
                        </h1>
                        <h2 class="w-4/12 text-xl leading-8 text-neutral-500 tracking-wide mt-10" style={styles.animation}>Linux Goblin is the #1 leading tool to build a beauty on a budget.</h2>
                        <div class="mt-14 flex">
                            <a class="text-white relative mx-3 rounded-lg z-1 bg-gradient-to-r from-neutral-200 to-neutral-300" href="https://discord.gg/TMzFhz4cyB" target="_blank"  rel="noopener noreferrer">
                                <div class="flex tracking-wide text-sm justify-center z-1 rounded-lg items-center bg-gradient-to-r from-neutral-950 to-neutral-750 text-black w-full h-full px-8 py-2.5 relative hover:bg-transparent hover:text-neutral-950">
                                Join our Discord
                                </div>
                            </a>
                            <a class="text-white relative mx-3 rounded-lg z-1 bg-gradient-to-r from-green-500 to-purple-500" href="/build" style={styles.padding}>
                                <div class="flex tracking-wide text-sm justify-center z-1 rounded-lg items-center bg-neutral-950 w-full h-full px-8 py-2.5 relative hover:bg-transparent hover:text-neutral-950">Build a PC
                                </div>
                            </a>
                        </div>
                    </div>                
                </div>
            </body>
        </html>
    )
}