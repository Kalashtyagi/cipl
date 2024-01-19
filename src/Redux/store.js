import { configureStore } from "@reduxjs/toolkit";
import jobCategorySlice from "./dashboard/erf/erfSlice";
import rolesPermissionSlice from "./dashboard/setting/rolesPermissionSlice";
import offerletterSlice from "./dashboard/offerletter/offerletterSlice";

export default configureStore({
  reducer: {
    app: jobCategorySlice,
    roles: rolesPermissionSlice,
    offerletter: offerletterSlice,
  },
});
