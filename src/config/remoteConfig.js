import {
  fetchAndActivate,
  getBoolean,
  getString,
} from "firebase/remote-config";
import { remoteConfig } from "./firebase";

const config = remoteConfig();

const initRemoteConfig = async () => {
  if (config) {
    config.settings.minimumFetchIntervalMillis = 0;
    config.defaultConfig = {
      feature_enable_stats: false,
      feature_enable_dark_mode: false,
      welcome_message: "Hi",
    };
    await fetchAndActivate(config);
  }
};

initRemoteConfig();

export const isFeatureEnabled = (featureFlag) => {
  return getBoolean(config, featureFlag);
};

export const getFlagValue = (flag) => {
  return getString(config, flag);
};
