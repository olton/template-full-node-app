import pkg from "../../package.json"
import path from "path"
import { fileURLToPath } from 'url'
import fs from "fs";
import {info, error} from "./helpers/logging.js"
import {runWebServer} from "./components/webserver.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

globalThis.rootPath = path.dirname(path.dirname(__dirname))
globalThis.serverPath = __dirname
globalThis.clientPath = rootPath + "/src/public_html"
globalThis.srcPath = rootPath + "/src"
globalThis.version = pkg.version

const readConfig = (path) => JSON.parse(fs.readFileSync(path, 'utf-8'))

const runProcesses = () => {
    setImmediate( () => {} )
}

export const run = (configPath) => {
    info("Starting Server...")

    try {

        globalThis.config = readConfig(configPath)
        globalThis.ssl = config.server.ssl && (config.server.ssl.cert && config.server.ssl.key)
        globalThis.cache = new Proxy({
        }, {
            set(target, p, value, receiver) {
                target[p] = value
                return true
            }
        })

        runProcesses()
        runWebServer()

        info("Welcome to Server!")
    } catch (e) {
        error(e)
        process.exit(1)
    }
}