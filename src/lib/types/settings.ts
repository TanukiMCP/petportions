export interface UserSettings {
  defaultWeightUnit: 'kg' | 'lb';
  defaultSpecies: 'dog' | 'cat';
  defaultFeedingFrequency: 'SID' | 'BID' | 'TID';
  measurementSystem: 'metric' | 'imperial';
  printIncludeDisclaimer: boolean;
  printIncludeLogo: boolean;
}

export interface NotificationSettings {
  emailReminders: boolean;
  weighInReminders: boolean;
  reminderFrequency: 'weekly' | 'biweekly' | 'monthly';
}


