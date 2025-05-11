import { combineReducers } from "@reduxjs/toolkit";
import { auth } from "./auth.slice";
import { language } from "@app/app/(protected)/languages/language.slice";
import { course } from "@app/app/(protected)/courses/course.slice";
import { nav } from "@app/components/layouts/nav/nav.slice";

const rootReducer = combineReducers({
  auth,
  language,
  course,
  nav,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
