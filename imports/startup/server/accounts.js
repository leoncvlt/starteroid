import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Accounts.emailTemplates.from = "Asterteroid <noreply@starteroid.com>";

Accounts.emailTemplates.resetPassword.text = (user, url) => {
  const token = url.substring(url.lastIndexOf("/") + 1, url.length);
  const newUrl = Meteor.absoluteUrl(`reset-password/${token}`);

  return `Hello,\nTo reset your password, please click the following link:\n${newUrl}`;
};
