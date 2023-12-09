import {
  fetchAndActivate,
  getBoolean,
  getString,
} from "firebase/remote-config";
import { remoteConfig } from "./firebase";

const config = remoteConfig();

const initRemoteConfig = async () => {
  if (config) {
    config.settings.minimumFetchIntervalMillis = 0; // For dev only
    config.defaultConfig = {
      welcome_message: "Hi",
      feature_enable_stats: false,
      feature_enable_dark_mode: false,
    };
    await fetchAndActivate(config); //production interval is 12 hours
  }
};

initRemoteConfig();

export const isFeatureEnabled = (featureFlag) => {
  return getBoolean(config, featureFlag);
};

export const getFlagValue = (flag) => {
  return getString(config, flag);
};
