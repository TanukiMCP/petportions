"use client";
import React, { useState, useEffect } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Printer, Bell, User } from "lucide-react";
import type { UserSettings, NotificationSettings } from "@/lib/types/settings";

const SETTINGS_STORAGE_KEY = 'petportions-user-settings';
const NOTIFICATION_STORAGE_KEY = 'petportions-notification-settings';

const defaultUserSettings: UserSettings = {
  defaultWeightUnit: 'kg',
  defaultSpecies: 'dog',
  defaultFeedingFrequency: 'BID',
  measurementSystem: 'metric',
  printIncludeDisclaimer: true,
  printIncludeLogo: true,
};

const defaultNotificationSettings: NotificationSettings = {
  emailReminders: false,
  weighInReminders: false,
  reminderFrequency: 'weekly',
};

export default function SettingsPage() {
  const [userSettings, setUserSettings] = useState<UserSettings>(defaultUserSettings);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(defaultNotificationSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedUserSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    const savedNotificationSettings = localStorage.getItem(NOTIFICATION_STORAGE_KEY);

    if (savedUserSettings) {
      try {
        setUserSettings(JSON.parse(savedUserSettings));
      } catch (e) {
        console.error('Failed to parse user settings:', e);
      }
    }

    if (savedNotificationSettings) {
      try {
        setNotificationSettings(JSON.parse(savedNotificationSettings));
      } catch (e) {
        console.error('Failed to parse notification settings:', e);
      }
    }
  }, []);

  const handleUserSettingChange = <K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K]
  ) => {
    setUserSettings((prev) => {
      const updated = { ...prev, [key]: value };
      setHasChanges(true);
      return updated;
    });
  };

  const handleNotificationSettingChange = <K extends keyof NotificationSettings>(
    key: K,
    value: NotificationSettings[K]
  ) => {
    setNotificationSettings((prev) => {
      const updated = { ...prev, [key]: value };
      setHasChanges(true);
      return updated;
    });
  };

  const handleSave = () => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(userSettings));
    localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(notificationSettings));
    setHasChanges(false);
    // Show success feedback (could use toast in future)
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    setUserSettings(defaultUserSettings);
    setNotificationSettings(defaultNotificationSettings);
    setHasChanges(true);
  };

  return (
    <div className="page-spacing">
      <PageBreadcrumb pageTitle="Settings" />

      <div className="max-w-4xl">
        <div className="mb-section-sm">
          <h1 className="text-3xl font-bold text-primary dark:text-primary mb-2">
            Settings
          </h1>
          <p className="text-primary/80 dark:text-secondary">
            Manage your preferences and account settings.
          </p>
        </div>

        <Tabs defaultValue="general" className="content-spacing">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="print" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Print
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general">
            <Card className="border-2 border-primary/20 dark:border-primary/20/50 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-primary dark:text-primary">General Preferences</CardTitle>
                <CardDescription className="text-primary/80 dark:text-secondary">
                  Set your default preferences for calculators and tools.
                </CardDescription>
              </CardHeader>
              <CardContent className="form-spacing">
                <div className="space-y-2">
                  <Label htmlFor="default-weight-unit" className="text-primary/80 dark:text-secondary">Default Weight Unit</Label>
                  <Select
                    value={userSettings.defaultWeightUnit}
                    onValueChange={(value) =>
                      handleUserSettingChange('defaultWeightUnit', value as 'kg' | 'lb')
                    }
                  >
                    <SelectTrigger id="default-weight-unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="lb">Pounds (lb)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-primary/80 dark:text-secondary">Default Species</Label>
                  <RadioGroup
                    value={userSettings.defaultSpecies}
                    onValueChange={(value) =>
                      handleUserSettingChange('defaultSpecies', value as 'dog' | 'cat')
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dog" id="default-species-dog" />
                      <Label htmlFor="default-species-dog" className="cursor-pointer text-primary/80 dark:text-secondary">
                        Dog
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cat" id="default-species-cat" />
                      <Label htmlFor="default-species-cat" className="cursor-pointer text-primary/80 dark:text-secondary">
                        Cat
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-feeding-frequency" className="text-primary/80 dark:text-secondary">Default Feeding Frequency</Label>
                  <Select
                    value={userSettings.defaultFeedingFrequency}
                    onValueChange={(value) =>
                      handleUserSettingChange('defaultFeedingFrequency', value as 'SID' | 'BID' | 'TID')
                    }
                  >
                    <SelectTrigger id="default-feeding-frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SID">Once daily (SID)</SelectItem>
                      <SelectItem value="BID">Twice daily (BID)</SelectItem>
                      <SelectItem value="TID">Three times daily (TID)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-primary/80 dark:text-secondary">Measurement System</Label>
                  <RadioGroup
                    value={userSettings.measurementSystem}
                    onValueChange={(value) =>
                      handleUserSettingChange('measurementSystem', value as 'metric' | 'imperial')
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="metric" id="measurement-metric" />
                      <Label htmlFor="measurement-metric" className="cursor-pointer text-primary/80 dark:text-secondary">
                        Metric (kg, grams)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="imperial" id="measurement-imperial" />
                      <Label htmlFor="measurement-imperial" className="cursor-pointer text-primary/80 dark:text-secondary">
                        Imperial (lb, oz)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Print Preferences Tab */}
          <TabsContent value="print">
            <Card className="border-2 border-primary/20 dark:border-primary/20/50 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-primary dark:text-primary">Print Preferences</CardTitle>
                <CardDescription className="text-primary/80 dark:text-secondary">
                  Customize what appears on your printable summaries and reports.
                </CardDescription>
              </CardHeader>
              <CardContent className="form-spacing">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="print-logo" className="text-primary/80 dark:text-secondary">Include PetPortions Logo</Label>
                    <p className="text-sm text-primary dark:text-primary/60">
                      Show the PetPortions branding on printed documents.
                    </p>
                  </div>
                  <Switch
                    id="print-logo"
                    checked={userSettings.printIncludeLogo}
                    onCheckedChange={(checked) =>
                      handleUserSettingChange('printIncludeLogo', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="print-disclaimer" className="text-primary/80 dark:text-secondary">Include Disclaimer</Label>
                    <p className="text-sm text-primary dark:text-primary/60">
                      Include veterinary consultation disclaimer on printed documents.
                    </p>
                  </div>
                  <Switch
                    id="print-disclaimer"
                    checked={userSettings.printIncludeDisclaimer}
                    onCheckedChange={(checked) =>
                      handleUserSettingChange('printIncludeDisclaimer', checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="border-2 border-primary/20 dark:border-primary/20/50 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-primary dark:text-primary">Notification Preferences</CardTitle>
                <CardDescription className="text-primary/80 dark:text-secondary">
                  Manage how and when you receive reminders and updates.
                </CardDescription>
              </CardHeader>
              <CardContent className="form-spacing">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-reminders" className="text-primary/80 dark:text-secondary">Email Reminders</Label>
                    <p className="text-sm text-primary dark:text-primary/60">
                      Receive email notifications for important updates.
                    </p>
                  </div>
                  <Switch
                    id="email-reminders"
                    checked={notificationSettings.emailReminders}
                    onCheckedChange={(checked) =>
                      handleNotificationSettingChange('emailReminders', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weigh-in-reminders" className="text-primary/80 dark:text-secondary">Weigh-In Reminders</Label>
                    <p className="text-sm text-primary dark:text-primary/60">
                      Get reminded to record your pet's weight.
                    </p>
                  </div>
                  <Switch
                    id="weigh-in-reminders"
                    checked={notificationSettings.weighInReminders}
                    onCheckedChange={(checked) =>
                      handleNotificationSettingChange('weighInReminders', checked)
                    }
                  />
                </div>

                {notificationSettings.weighInReminders && (
                  <div className="space-y-2">
                    <Label htmlFor="reminder-frequency" className="text-primary/80 dark:text-secondary">Reminder Frequency</Label>
                    <Select
                      value={notificationSettings.reminderFrequency}
                      onValueChange={(value) =>
                        handleNotificationSettingChange('reminderFrequency', value as 'weekly' | 'biweekly' | 'monthly')
                      }
                    >
                      <SelectTrigger id="reminder-frequency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account">
            <Card className="border-2 border-primary/20 dark:border-primary/20/50 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-primary dark:text-primary">Account Settings</CardTitle>
                <CardDescription className="text-primary/80 dark:text-secondary">
                  Manage your account information and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="form-spacing">
                <div className="p-4 bg-tertiary dark:bg-primary/10 rounded-lg border-2 border-primary/30 dark:border-primary/30">
                  <p className="text-sm text-primary/80 dark:text-secondary">
                    Account management features will be available in a future update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save/Reset Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={handleReset} disabled={!hasChanges} className="border-primary/30 dark:border-primary/30 text-primary/80 dark:text-secondary hover:bg-tertiary dark:hover:bg-primary/10 disabled:opacity-50">
            Reset to Defaults
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges} className="bg-primary hover:bg-primary/90 text-white disabled:opacity-50">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

