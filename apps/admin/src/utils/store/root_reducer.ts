import { combineReducers } from "@reduxjs/toolkit";
import { auth } from "./auth.slice";
import { language } from "@app/app/(protected)/languages/language.slice";
import { course } from "@app/app/(protected)/courses/course.slice";
import { nav } from "@app/components/layouts/nav/nav.slice";
import { section } from "@app/app/(protected)/courses/[id]/section/section.slice";

const rootReducer = combineReducers({
  auth,
  language,
  course,
  section,
  nav,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
