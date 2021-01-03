import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

export const useAccount = (fields = {}) =>
  useTracker(() => {
    const handle = Meteor.subscribe("user", fields);
    const user = Meteor.user({ fields });
    const userId = Meteor.userId();
    return {
      user,
      userId,
      email: user && user.emails ? user.emails[0].address : "",
      isLoggedIn: !!userId,
    };
  }, []);
