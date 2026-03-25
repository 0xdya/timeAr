let DEFAULT_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

const isValidTimezone = (tz: string): boolean => {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
};

export const setTimezone = (timezone: string): void => {
    if(isValidTimezone(timezone)){
        DEFAULT_TZ = timezone;
    }else{
        throw new Error('Timezone not found \n check https://github.com/maxmind/geoip-api-c/blob/main/timezone/timezone.txt for timezones')
    }
}

export const getTimezone = (): string => DEFAULT_TZ;