import { useTracker } from "meteor/react-meteor-data";

export const useReactiveData = ({ collection, publication, query, options, deps }) =>
  useTracker(() => {
    const handle = Meteor.subscribe(publication, query, options);
    const loading = !handle.ready();
    const data = collection.find().fetch();
    const noResults = data.length == 0;
    return [data, loading, noResults];
  }, deps);
