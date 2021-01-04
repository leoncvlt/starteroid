import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

export const useAccount = (extraFields = {}) =>
  useTracker(() => {
    const fields = { emails: 1, subscription: 1, ...extraFields };
    const handle = Meteor.subscribe("user", fields);
    const user = Meteor.user({ fields });
    const userId = Meteor.userId();
    return {
      user,
      userId,
      email: user?.emails[0]?.address,
      isSubscribed: user?.subscription?.status == "active",
      isLoggedIn: !!userId,
    };
  }, []);
