const isInNode = (typeof process !== 'undefined') && (typeof process.versions.node !== 'undefined')
const isWabtDefined = (typeof WabtModule === 'undefined')
if(isInNode){
    console.log("You\'re running this file in NodeJS, This file is not compatible with NodeJS for now, please wait.")
    process.exit(1);
}
if(isWabtDefined) {
    var s = document.createElement("script")
    s.src = 'https://cdn.jsdelivr.net/npm/wabt@latest/index.js';
    document.head.appendChild(s);
}
setTimeout(function() { 
    return new Promise(resolver => { 
        resolver(
            const compileWebAssembly = (code, log = true, write_debug_names = true) => {
                let arr = [];
                for(let i = 0; i < code.length; i++) {
                    arr[i] = code.charCodeAt(i);
                }
                const bytes = new Uint8Array(arr);
                let features = []
                const modules = WabtModule().parseWat(code, bytes, features);
                modules.resolveNames();
                modules.validate(features);
                const bin = modules.toBinary({log:log, write_debug_names:write_debug_names});
                const lib = new WebAssembly.Instance(new WebAssembly.Module(bin.buffer),{}).exports;
                return lib;
            })
        })
},300)
