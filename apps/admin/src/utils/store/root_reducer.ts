import { combineReducers } from "@reduxjs/toolkit";
import { auth } from "./auth.slice";
import { language } from "@app/app/(protected)/languages/language.slice";

const rootReducer = combineReducers({
  auth,
  language,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
