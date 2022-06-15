import { combineReducers } from "redux"
import counter from "./Counter/reducer"
import news from "./News/reducer"

const rootReducer = combineReducers({
	counter,
	news
})


export default rootReducer
