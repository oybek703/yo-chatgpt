import {Context} from "telegraf"

export interface SessionData {

}

export interface BotContext extends Context {
session: SessionData
}
