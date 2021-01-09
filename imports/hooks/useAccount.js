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
      isSubscribed: user
        ? ["active", "trialing", "past_due"].some((s) => user?.subscription?.status == s)
        : undefined,
      isLoggedIn: !!userId,
    };
  }, []);
