import { logEvent } from "firebase/analytics";
import { analytics } from "./firebase";

export const logBannerAccept = (position) => {
  logEvent(analytics, "banner_accept", {
    position,
    action: "add_expense",
    timestamp: Date.now(),
  });
};

export const logBannerDismiss = (position) => {
  logEvent(analytics, "banner_dismiss", {
    position,
    action: "dismiss",
    timestamp: Date.now(),
  });
};
