import { combineReducers } from "@reduxjs/toolkit";
import { auth } from "./auth.slice";
import { language } from "@app/app/(protected)/languages/language.slice";
import { course } from "@app/app/(protected)/courses/course.slice";
import { section } from "@app/app/(protected)/courses/[id]/section/section.slice";
import { sectionUnit } from "@app/app/(protected)/courses/[id]/section/[sectionID]/unit/section-unit.slice";

const rootReducer = combineReducers({
  auth,
  language,
  course,
  section,
  sectionUnit,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
